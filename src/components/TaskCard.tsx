import { Check, Pen, RotateCcw, Trash } from "lucide-react";
import type { TaskProps } from "../types/Task";

interface TaskProp {
  item: TaskProps;
  editarTarefa: () => void;
  alternarConclusao: () => void;
  excluirTarefa: () => void;
}

export default function TaskCard({
  item,
  editarTarefa,
  alternarConclusao,
  excluirTarefa,
}: TaskProp) {
  return (
    <div
      className={`mt-3 flex items-center justify-between gap-3 rounded-lg border border-l-4 px-3 py-3 transition-colors sm:px-4 ${
        item.completed
          ? "border-[#cfe0d2] border-l-[#5e9273] bg-[#e8f1e9]"
          : "border-[#e0e6df] border-l-[#e0e6df] bg-white hover:border-[#c6d3c8] hover:bg-[#fbfcfa]"
      }`}
    >
      <h1
        className={
          item.completed
            ? "min-w-0 flex-1 break-words font-medium text-[#698174] line-through decoration-[#698174] decoration-2"
            : "min-w-0 flex-1 break-words font-medium text-[#344840]"
        }
      >
        {item.description}
      </h1>

      <div className="flex shrink-0 items-center gap-1">
        <button
          title={item.completed ? "Reabrir tarefa" : "Marcar como concluída"}
          aria-label={
            item.completed ? "Reabrir tarefa" : "Marcar como concluída"
          }
          onClick={alternarConclusao}
          className="rounded-md p-2 text-[#517864] transition-colors hover:bg-[#e4eee5] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#517864]"
        >
          {item.completed ? (
            <RotateCcw size={18} color="green" />
          ) : (
            <Check size={18} color="green" />
          )}
        </button>
        <button
          title="Editar tarefa"
          aria-label="Editar tarefa"
          onClick={() => editarTarefa()}
          className="rounded-md p-2 text-[#517864] transition-colors hover:bg-[#e4eee5] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#517864]"
        >
          <Pen size={18} aria-hidden="true" />
        </button>

        <button
          title="Excluir tarefa"
          aria-label="Excluir tarefa"
          onClick={excluirTarefa}
          className="rounded-md p-2 text-[#bd5543] transition-colors hover:bg-[#fae7e2] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#bd5543]"
        >
          <Trash size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
