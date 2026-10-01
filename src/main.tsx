import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./App";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-left"
      autoClose={2500}
      pauseOnFocusLoss={false}
      pauseOnHover
    />
  </>,
);
