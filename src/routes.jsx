import Protected from "./components/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  addTodo,
  deleteTodo,
  getTodos,
  loadUser,
  login,
  logout,
} from "./utils/services";

export default [
  {
    path: "/",
    element: <Protected />,
    hydrateFallbackElement: <div>Loading...</div>,
    errorElement: <div>Error...</div>,
    loader: loadUser,
    children: [
      {
        index: true,
        element: <Home />,
        loader: getTodos,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    hydrateFallbackElement: <div>Loading...</div>,
    errorElement: <div>Error...</div>,
  },
  {
    path: "google-login",
    action: login,
  },
  {
    path: "google-logout",
    action: logout,
  },
  {
    path: "add-todo",
    action: addTodo,
  },
  {
    path: "todo/:id",
    action: deleteTodo,
  },
];
