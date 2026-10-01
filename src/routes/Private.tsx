import { useEffect, useState, type ReactNode } from "react";

import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

import { Navigate } from "react-router";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    //  listener
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };

        localStorage.setItem("@userlinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    //  cleanup function - increase performance
    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 h-screen items-center justify-center ">
        <h1 className="bg-amber-200 w-full max-w-xl text-center py-1 rounded">
          buscando dados...
        </h1>
      </div>
    );
  }

  if (!signed) {
    return <Navigate to={"/"} />;
  }

  return children;
}
