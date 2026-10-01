import { createBrowserRouter } from "react-router";

import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { Private } from "./routes/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/tasks",
    element: (
      <Private>
        <Tasks />
      </Private>
    ),
  },
]);

export { router };
