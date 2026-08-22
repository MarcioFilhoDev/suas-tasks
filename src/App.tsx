import { Plus } from "lucide-react";
import { useEffect, useState, type SubmitEvent } from "react";
import type { TaskProps } from "./types/Task";
import Task from "./components/Task";

export default function App() {
  const [editTask, setEditTask] = useState<TaskProps | null>(null);
  const [nextId, setNextId] = useState<number>(1);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<TaskProps[]>(() => {
    const response = localStorage.getItem("@tasks");

    if (response) {
      const tasks: TaskProps[] = JSON.parse(response);

      tasks.map((task) =>
        task.id >= nextId ? setNextId(task.id + 1) : nextId,
      );

      return JSON.parse(response);
    }

    return [];
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
    setNextId(nextId + 1);

    if (input !== "") {
      const data = {
        //  "id" deve ser o próximo number do maior "id" de task registrada
        id: nextId,
        task: input,
      };

      setTasks((prev) => [...prev, data]);
      setInput("");
    }
  }

  function excluirTask(task: TaskProps) {
    //  Filtrando pelos itens em que "task" é diferente do que é passado
    const newListTasks = tasks.filter((item) => item.id !== task.id);

    setTasks(newListTasks);
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
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                excluirTask={excluirTask}
                editTask={() => {
                  setInput(task.task);
                  setEditTask(task);
                }}
              />
            ))}
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
