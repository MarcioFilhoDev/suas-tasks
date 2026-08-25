import { useEffect, useState, type SubmitEvent } from "react";
import type { TaskProps } from "./types/Task";

import Task from "./components/Task";

import { Plus } from "lucide-react";

import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";

function nextTaskId(tasks: TaskProps[]) {
  return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

function withUniqueIds(tasks: TaskProps[]) {
  const seen = new Set<number>();
  let nextId = nextTaskId(tasks);

  return tasks.map((task) => {
    if (!seen.has(task.id)) {
      seen.add(task.id);
      return task;
    }

    const uniqueTask = { ...task, id: nextId };
    seen.add(nextId);
    nextId += 1;
    return uniqueTask;
  });
}

export default function App() {
  const [editTask, setEditTask] = useState<TaskProps | null>(null);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<TaskProps[]>(() => {
    const response = localStorage.getItem("@tasks");

    if (!response) {
      return [];
    }

    return withUniqueIds(JSON.parse(response));
  });

  useEffect(() => {
    localStorage.setItem("@tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleEditTask(e: SubmitEvent, task: TaskProps) {
    e.preventDefault();

    const data = {
      id: task.id,
      task: input,
    };

    setTasks((prev) => prev.map((task) => (task.id === data.id ? data : task)));
    setEditTask(null);
    setInput("");
  }

  function handleSaveTask(e: SubmitEvent) {
    e.preventDefault();

    if (input === "") {
      return;
    }

    setTasks((prev) => [...prev, { id: nextTaskId(prev), task: input }]);
    setInput("");
  }

  function excluirTask(task: TaskProps) {
    //  Filtrando pelos itens em que "task" é diferente do que é passado
    const newListTasks = tasks.filter((item) => item.id !== task.id);

    setTasks(newListTasks);
  }

  function reorder(tasks: TaskProps[], startIndex: number, endIndex: number) {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1); //  removendo 1 item na posição inicial
    result.splice(endIndex, 0, removed);
    //  não remove nenhum item e, solta o item removido anteriomente para a posição que foi solto

    return result; //  result é a lista reordenada
  }

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    //  A lib pede que verifique se soltou o "objeto"/linha na área correta
    if (!destination) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    setTasks((prev) => reorder(prev, source.index, destination.index));
  }

  return (
    <div className="p-4 flex items-center justify-center mt-[10%]">
      <div className="w-xl">
        <h1 className="text-2xl text-white font-semibold">Suas Tarefas</h1>

        <form
          onSubmit={(e) =>
            editTask ? handleEditTask(e, editTask) : handleSaveTask(e)
          }
          className="flex flex-1 gap-4 mt-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-white rounded pl-2 py-2 text-base"
            type="text"
            placeholder="digite alguma coisa..."
          />
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 transition-colors px-2.5 rounded text-blue-50"
          >
            <Plus size={20} />
          </button>
        </form>

        {tasks.length > 0 ? (
          <div className="bg-white max-h-140 flex flex-col gap-2 p-4 mt-4 rounded overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="tasks" type="list" direction="vertical">
                {(provided) => (
                  <article
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col gap-2"
                  >
                    {tasks.map((task, index) => (
                      <Task
                        index={index}
                        key={task.id}
                        task={task}
                        excluirTask={excluirTask}
                        editTask={() => {
                          setInput(task.task);
                          setEditTask(task);
                        }}
                      />
                    ))}

                    {provided.placeholder}
                  </article>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        ) : (
          <div>
            <h1 className="text-gray-400 text-center text-sm mt-4">
              Sem tasks por enquanto...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
