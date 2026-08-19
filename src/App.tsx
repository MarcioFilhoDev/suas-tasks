import { Check, Pencil, Trash } from "lucide-react";
import { useEffect, useState, type SubmitEvent } from "react";

export default function App() {
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

  async function handleNewTask(e: SubmitEvent) {
    e.preventDefault();

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
    <div className="p-4 flex flex-col w-96">
      <h1 className="text-2xl">Suas Tasks</h1>

      <form
        onSubmit={(e) => handleNewTask(e)}
        className="flex flex-1 gap-4 mt-4"
      >
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 bg-gray-200 rounded pl-2 py-1 text-base"
          type="text"
          placeholder="..."
        />
        <button
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 transition-colors px-2.5 rounded text-blue-50"
        >
          <Check size={20} />
        </button>
      </form>

      {tasks.map((task, index) => (
        <ul key={index} className="pt-4 flex flex-row justify-between">
          <li>- {task}</li>

          <div className="flex flex-col">
            <button
              className="bg-rose-400 hover:bg-rose-500 transition-colors px-2.5 py-1 rounded text-rose-50"
              onClick={() => excluirTask(task)}
            >
              <Trash size={20} />
            </button>

            <button className="bg-lime-400 hover:bg-lime-500 transition-colors px-2.5 py-1 rounded text-lime-50">
              <Pencil size={20} />
            </button>
          </div>
        </ul>
      ))}
    </div>
  );
}
