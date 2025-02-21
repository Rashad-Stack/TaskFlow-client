import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { ScrollRestoration, useLoaderData } from "react-router";
import AddTodo from "../components/AddTodo";
import Draggable from "../components/Draggable";
import Droppable from "../components/Droppable";
import Header from "../components/Header";

import DeleteTask from "../components/DeleteTask";
import axiosFetch from "../utils/axiosFetch";
import socket from "../utils/socket";

export default function Home() {
  const todos = useLoaderData();
  const [columns, setColumns] = useState(todos || {});

  useEffect(() => {
    // Listen for real-time updates
    socket.on("task-updated", (updatedColumns) => {
      setColumns(updatedColumns);
    });

    return () => {
      socket.off("task-updated");
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeContainer = Object.keys(columns).find((key) =>
      columns[key].includes(active.id)
    );
    const overContainer = over.id;

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      console.log("Same container");
      const newColumns = {
        ...columns,
        [activeContainer]: arrayMove(
          columns[activeContainer],
          columns[activeContainer].indexOf(active.id),
          columns[activeContainer].indexOf(over.id)
        ),
      };
      setColumns(newColumns);
      await axiosFetch.put(`/tasks/${active.id._id}`, {
        category: activeContainer,
      });
      socket.emit("update-task", newColumns); // Emit real-time update
    } else {
      const activeItems = [...columns[activeContainer]];
      const overItems = [...columns[overContainer]];

      activeItems.splice(activeItems.indexOf(active.id), 1);
      overItems.splice(overItems.indexOf(over.id), 0, active.id);

      const newColumns = {
        ...columns,
        [activeContainer]: activeItems,
        [overContainer]: overItems,
      };
      setColumns(newColumns);

      await axiosFetch.put(`/tasks/${active.id._id}`, {
        category: overContainer,
      });
      socket.emit("update-task", newColumns); // Emit real-time update
    }
  };

  return (
    <div className="min-h-dvh flex flex-col my-2 lg:max-w-5xl mx-auto">
      <Header />
      <main className="flex-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(columns).map((columnId) => (
              <Droppable key={columnId} id={columnId}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold mb-2 capitalize">
                    {columnId.replace("-", " ")}
                  </h2>
                  <AddTodo columnId={columnId} />
                </div>
                <SortableContext
                  items={columns[columnId]}
                  strategy={verticalListSortingStrategy}
                  onDragEnd={handleDragEnd}>
                  {columns[columnId].map((item) => (
                    <Draggable key={item._id} id={item}>
                      <div>
                        {item.title}
                        <DeleteTask id={item._id} />
                      </div>
                    </Draggable>
                  ))}
                </SortableContext>
              </Droppable>
            ))}
          </div>
        </DndContext>
        <ScrollRestoration />
      </main>
    </div>
  );
}
