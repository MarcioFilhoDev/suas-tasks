import { Check, Pencil, Trash } from "lucide-react";
import { useEffect, useState, type SubmitEvent } from "react";

export default function App() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>(() => {
    const response = localStorage.getItem("@tasks");

    if (response) {
      return JSON.parse(response);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("@tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("@tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleSaveTask(e: SubmitEvent) {
    e.preventDefault();

    if (editingIndex !== null) {
      setTasks((prev) =>
        prev.map((item, index) => (index === editingIndex ? task : item)),
      );

      setTask("");
      setEditingIndex(null);
      return;
    }

    if (task !== "") {
      setTasks((prev) => [...prev, task]);
      setTask("");
    }
  }

  function excluirTask(task: string) {
    const novaTask = tasks.filter((item) => item !== task);
    setTasks(novaTask);
  }

  return (
    <div className="p-4 flex items-center justify-center mt-[10%]">
      <div className="w-xl">
        <h1 className="text-2xl text-white font-semibold">Suas Tarefas</h1>

        <form
          onSubmit={(e) => handleSaveTask(e)}
          className="flex flex-1 gap-4 mt-4"
        >
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 bg-gray-200 rounded pl-2 py-1 text-base"
            type="text"
            placeholder="digite alguma coisa..."
          />
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 transition-colors px-2.5 rounded text-blue-50"
          >
            <Check size={20} />
          </button>
        </form>

        {tasks.length > 0 ? (
          <div className="bg-white p-4 mt-4 rounded">
            {tasks.map((task, index) => (
              <ul
                key={index}
                className="bg-gray-200 rounded border border-gray-400 px-4 py-2 flex flex-row justify-between"
              >
                <li>{task}</li>

                <div className="flex  gap-2">
                  <button
                    className="bg-rose-400 hover:bg-rose-500 transition-colors px-2.5 py-1 rounded text-rose-50"
                    onClick={() => excluirTask(task)}
                  >
                    <Trash size={20} />
                  </button>

                  <button
                    onClick={() => {
                      setTask(task);
                      setEditingIndex(index);
                    }}
                    className="bg-lime-400 hover:bg-lime-500 transition-colors px-2.5 py-1 rounded text-lime-50"
                  >
                    <Pencil size={20} />
                  </button>
                </div>
              </ul>
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
