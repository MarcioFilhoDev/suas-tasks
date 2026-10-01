import { useState, type SubmitEvent } from "react";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { ArrowRight, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router";
import Input from "../../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const nav = useNavigate();

  async function handleSignIn(e: SubmitEvent) {
    e.preventDefault();

    if (!email || !pass) {
      toast.warn("Preencha todos os campos.");
      return;
    }

    await signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        toast.success("Usuário autenticado com sucesso.");
        nav("/tasks", { replace: true });
      })
      .catch((error) => {
        toast.error("Erro ao fazer o login.");
        console.log(error);
      });
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-8 sm:py-12">
      <section className="enter-view grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-[0_28px_90px_rgba(24,48,41,0.16)] md:min-h-[570px] md:grid-cols-[0.92fr_1.08fr]">
        <div className="flex min-h-[250px] flex-col justify-between bg-[#20443b] p-7 text-white sm:p-10 md:p-12">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#e9765d] text-white">
              <CheckCheck size={21} strokeWidth={2.4} aria-hidden="true" />
            </span>
            <span className="text-sm font-bold tracking-[0.08em]">
              SUAS TAREFAS
            </span>
          </div>

          <div className="mt-12 max-w-sm md:mt-0">
            <p className="mb-3 text-xs font-bold tracking-[0.16em] text-[#b9d2c7]">
              ORGANIZAÇÃO PESSOAL
            </p>
            <h1 className="text-4xl leading-[1.12] font-bold sm:text-5xl">
              Um passo de cada vez.
            </h1>
            <div className="mt-7 h-1 w-14 rounded-full bg-[#e9765d]" />
          </div>

          <p className="mt-10 text-sm text-[#c1d1ca]">
            Entre e continue de onde parou.
          </p>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-12 md:px-16">
          <div className="w-full max-w-md">
            <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[#668078]">
              BEM-VINDO DE VOLTA
            </p>
            <h2 className="text-3xl font-bold tracking-normal text-[#1c302b]">
              Acesse sua conta
            </h2>
            <p className="mt-2 mb-8 text-sm text-[#75817b]">
              Informe seus dados para entrar.
            </p>

            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => handleSignIn(e)}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                title="Email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                required
              />

              <Input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                title="Senha"
                type="password"
                autoComplete="current-password"
                placeholder="Sua senha"
                required
              />

              <button
                type="submit"
                className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#e9765d] px-4 font-semibold text-white transition-colors hover:bg-[#d9674f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9765d]"
              >
                Acessar
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
