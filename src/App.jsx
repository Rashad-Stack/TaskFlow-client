import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import routes from "./routes";

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
