import { useDroppable } from "@dnd-kit/core";
import React from "react";

function Droppable({ id, children }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="p-4 mb-2 bg-gray-100 border rounded shadow">
      {children}
    </div>
  );
}

export default Droppable;
