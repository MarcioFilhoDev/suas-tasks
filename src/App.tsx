import { createBrowserRouter } from "react-router";

import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import { Private } from "./routes/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
