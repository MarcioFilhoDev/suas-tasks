interface TaskProps {
  task: string;
  excluirTask: (task: string) => void;
}

export default function Task({ task, excluirTask }: TaskProps) {
  return (
    <ul className="pt-4 pl-4 flex flex-row justify-between">
      <li className="list-disc">{task}</li>

      <button
        className="bg-rose-400 px-2 rounded text-rose-50"
        onClick={() => excluirTask(task)}
      >
        excluir
      </button>
    </ul>
  );
}
