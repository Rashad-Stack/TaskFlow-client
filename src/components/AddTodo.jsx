import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { Link, useSearchParams } from "react-router";
import TodoForm from "./TodoForm";

export default function AddTodo({ columnId }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dialog = searchParams.get("dialog");

  function open() {
    searchParams.set("dialog", columnId);
    setSearchParams(searchParams);
  }

  function close() {
    searchParams.delete("dialog");
    searchParams.delete("category");
    setSearchParams(searchParams);
  }
  return (
    <>
      <Link to={`?dialog=add-todo&category=${columnId}`}>
        <Button onClick={open}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </Link>
      <Dialog
        open={dialog === "add-todo" || dialog === "edit-todo"}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <TodoForm />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
