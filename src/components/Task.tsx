import { Menu, Pencil, Trash } from "lucide-react";
import type { TaskProps } from "../types/Task";

interface TasksProps {
  task: TaskProps;
  excluirTask(task: TaskProps): void;
  editTask: () => void;
}

export default function Task(props: TasksProps) {
  return (
    <button
      key={props.task.id}
      className="bg-gray-200 rounded border border-gray-400 hover:bg-gray-500/50 transition-colors px-2 py-1 flex flex-row items-center justify-between"
    >
      <div className="flex flex-row items-center gap-2">
        <Menu size={20} color="#252525" />

        <span className="line-clamp-2 text-ellipsis">
          {props.task.id} - {props.task.task}
        </span>
      </div>

      <div className="flex  gap-2">
        <button
          className="bg-rose-400 hover:bg-rose-500 transition-colors p-2 rounded text-rose-50"
          onClick={() => props.excluirTask(props.task)}
        >
          <Trash size={20} />
        </button>

        <button
          onClick={() => props.editTask()}
          className="bg-lime-400 hover:bg-lime-500 transition-colors p-2 rounded text-lime-50"
        >
          <Pencil size={20} />
        </button>
      </div>
    </button>
  );
}
