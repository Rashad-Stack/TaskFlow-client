import Protected from "./components/protected";
import Login from "./pages/Login";
import { login } from "./utils/services";

export default [
  {
    path: "/",
    element: <Protected />,
    hydrateFallbackElement: <div>Loading...</div>,
    errorElement: <div>Error...</div>,
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
];
