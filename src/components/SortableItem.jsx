import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="p-4 mb-2 bg-gray-100 border rounded shadow"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      {props.children}
    </div>
  );
}
