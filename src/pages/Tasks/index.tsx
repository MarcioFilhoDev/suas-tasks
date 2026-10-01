import { useEffect, useState, type SubmitEvent } from "react";

import type { TaskProps } from "../../types/Task";
import type { UserData } from "../../types/Task";

import { CheckCheck, ClipboardList, LogOut, PenLine, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";

import { auth, db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import TaskCard from "../../components/TaskCard";

async function getTasks(uid: string): Promise<TaskProps[]> {
  if (!uid) {
    return [];
  }

  const snapshot = await getDocs(collection(db, "tasks", uid, "tasks"));

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as TaskProps[];
}

export default function Tasks() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState<UserData>({ email: "", uid: "" });
  const [taskList, setTaskList] = useState<TaskProps[]>([]);
  const [taskEditingId, setTaskEditingId] = useState<string | null>(null);

  useEffect(() => {
    async function getUserId() {
      const response = localStorage.getItem("@userlinks");

      if (!response) {
        return;
      }

      const data: UserData = JSON.parse(response!);

      setUserData({
        email: data?.email,
        uid: data?.uid,
      });
    }

    getUserId();
  }, []);

  useEffect(() => {
    let isCurrent = true;

    getTasks(userData.uid)
      .then((tasks) => {
        if (isCurrent) {
          setTaskList(tasks);
        }
      })
      .catch((error) => {
        toast.error("Não foi possível carregar suas tarefas.");
        console.error(error);
      });

    return () => {
      isCurrent = false;
    };
  }, [userData.uid]);

  async function handleNewTask(e: SubmitEvent) {
    e.preventDefault();
    const description = input.trim();

    if (!description) {
      toast.warn("Preencha o campo de descrição.");
      return;
    }

    if (!userData.uid) {
      toast.error("Não foi possível identificar o usuário.");
      return;
    }

    const tasksRef = collection(db, "tasks", userData.uid, "tasks");

    try {
      await addDoc(tasksRef, {
        description,
        completed: false,
        created: serverTimestamp(),
        updated: serverTimestamp(),
      });
      toast.success("Tarefa adicionada com sucesso!");
      setInput("");
      setTaskList(await getTasks(userData.uid));
    } catch (error) {
      toast.error("Ops, algo deu errado.");
      console.error(error);
    }
  }

  async function handleChangeTask(e: SubmitEvent) {
    e.preventDefault();
    const description = input.trim();

    if (!description) {
      toast.warn("Preencha o campo de descrição.");
      return;
    }

    if (!userData.uid || !taskEditingId) {
      return;
    }

    const taskRef = doc(db, "tasks", userData.uid, "tasks", taskEditingId);

    try {
      await updateDoc(taskRef, {
        description,
        updated: serverTimestamp(),
      });
      toast.success("Tarefa alterada com sucesso.");
      setInput("");
      setTaskEditingId(null);
      setTaskList(await getTasks(userData.uid));
    } catch (error) {
      toast.error("Ops, algo deu errado.");
      console.error(error);
    }
  }

  async function handleToggleTask(task: TaskProps) {
    if (!userData.uid) {
      return;
    }

    try {
      const taskRef = doc(db, "tasks", userData.uid, "tasks", task.id);
      await updateDoc(taskRef, {
        completed: !task.completed,
        updated: serverTimestamp(),
      });
      setTaskList(await getTasks(userData.uid));
    } catch (error) {
      toast.error("Não foi possível atualizar a tarefa.");
      console.error(error);
    }
  }

  async function handleDeleteTask(task: TaskProps) {
    if (!userData.uid) {
      return;
    }

    const confirmed = window.confirm(
      `Deseja excluir a tarefa "${task.description}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, "tasks", userData.uid, "tasks", task.id));
      toast.success("Tarefa excluída com sucesso.");

      if (taskEditingId === task.id) {
        setInput("");
        setTaskEditingId(null);
      }

      setTaskList(await getTasks(userData.uid));
    } catch (error) {
      toast.error("Não foi possível excluir a tarefa.");
      console.error(error);
    }
  }

  const sortedTaskList = [...taskList].sort(
    (firstTask, secondTask) =>
      Number(firstTask.completed) - Number(secondTask.completed),
  );
  const pendingCount = taskList.filter((task) => !task.completed).length;
  const completedCount = taskList.length - pendingCount;

  async function handleSignOut() {
    try {
      await signOut(auth);
      localStorage.removeItem("@userlinks");
      toast.success("Você saiu da sua conta.");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Não foi possível sair da conta.");
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <div className="enter-view mx-auto w-full max-w-3xl">
        <header className="mb-12 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#20443b] text-white shadow-sm">
              <CheckCheck size={21} strokeWidth={2.4} aria-hidden="true" />
            </span>
            <span className="text-sm font-bold tracking-[0.08em] text-[#20443b]">
              SUAS TAREFAS
            </span>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex min-h-10 items-center gap-2 rounded-lg border border-[#dce3dc] bg-white px-3 text-sm font-semibold text-[#51645a] transition-colors hover:border-[#e6b2a7] hover:bg-[#fae7e2] hover:text-[#a34d3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9765d]"
          >
            <LogOut size={17} aria-hidden="true" />
            <span>Sair</span>
          </button>
        </header>

        <section>
          <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[#71847b]">
            ORGANIZAÇÃO PESSOAL
          </p>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl leading-tight font-bold text-[#1c302b] sm:text-4xl">
                Suas tarefas
              </h1>
              <p className="mt-2 text-base text-[#718078]">
                Um passo de cada vez.
              </p>
            </div>
            <div className="flex gap-4 text-sm font-medium text-[#66766e]">
              <span>
                <strong className="text-[#20443b]">{pendingCount}</strong>{" "}
                pendentes
              </span>
              <span className="text-[#c3cbc4]" aria-hidden="true">
                /
              </span>
              <span>
                <strong className="text-[#58806c]">{completedCount}</strong>{" "}
                concluídas
              </span>
            </div>
          </div>

          <form
            onSubmit={(e) =>
              taskEditingId ? handleChangeTask(e) : handleNewTask(e)
            }
            className="mt-8 flex gap-2 rounded-xl border border-[#dce3dc] bg-white p-2 shadow-[0_4px_20px_rgba(30,54,46,0.06)] focus-within:border-[#8da99a] focus-within:ring-4 focus-within:ring-[#8da99a]/15"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-w-0 flex-1 bg-transparent px-3 text-[15px] text-[#1c302b] placeholder:text-[#9aa59d] focus:outline-none"
              type="text"
              placeholder="O que você precisa fazer?"
              aria-label="Descrição da tarefa"
            />

            <button
              title={taskEditingId ? "Alterar tarefa" : "Adicionar tarefa"}
              type="submit"
              className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#e9765d] text-white transition-colors hover:bg-[#d9674f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9765d]"
            >
              {taskEditingId ? (
                <PenLine size={19} aria-hidden="true" />
              ) : (
                <Plus size={21} aria-hidden="true" />
              )}
            </button>
          </form>
        </section>

        <section className="mt-10" aria-label="Lista de tarefas">
          <div className="mb-4 flex items-center justify-between border-b border-[#dce3dc] pb-3">
            <h2 className="text-sm font-bold text-[#344840]">Sua lista</h2>
            {taskList.length > 0 && (
              <span className="text-xs font-medium text-[#89958d]">
                {taskList.length} {taskList.length === 1 ? "tarefa" : "tarefas"}
              </span>
            )}
          </div>

          {taskList.length > 0 ? (
            sortedTaskList.map((task) => (
              <article key={task.id}>
                <TaskCard
                  editarTarefa={() => {
                    setInput(task.description);
                    setTaskEditingId(task.id);
                  }}
                  alternarConclusao={() => handleToggleTask(task)}
                  excluirTarefa={() => handleDeleteTask(task)}
                  item={task}
                />
              </article>
            ))
          ) : (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-[#c8d2c9] bg-white/70 px-6 py-10 text-center">
              <div className="mb-4 rounded-xl bg-[#e6eee7] p-3 text-[#557466]">
                <ClipboardList size={24} aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold text-[#344840]">
                Nenhuma tarefa por enquanto
              </h2>
              <p className="mt-1 text-sm text-[#87938b]">
                Sua lista está pronta para receber uma nova tarefa.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
