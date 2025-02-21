import { Link, useSearchParams } from "react-router";
import Button from "./Button";
import Modal from "./Modal";
import TodoForm from "./TodoForm";

export default function AddTodo({ container }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dialog = searchParams.get("dialog");

  function open() {
    searchParams.set("dialog", container);
    setSearchParams(searchParams);
  }

  function close() {
    searchParams.delete("dialog");
    searchParams.delete("category");
    setSearchParams(searchParams);
  }
  return (
    <>
      <Link to={`?dialog=add-todo&category=${container}`}>
        <Button variant="ghost" onClick={open}>
          Add Item
        </Button>
      </Link>
      <Modal
        showModal={dialog === "add-todo" || dialog === "edit-todo"}
        setShowModal={close}
        containerClasses="max-w-lg">
        <div className="flex flex-col w-full items-start gap-y-4">
          <TodoForm />
        </div>
      </Modal>
    </>
  );
}
