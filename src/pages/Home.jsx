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
import { useState } from "react";
import { ScrollRestoration, useLoaderData } from "react-router";
import AddTodo from "../components/AddTodo";
import Draggable from "../components/Draggable";
import Droppable from "../components/Droppable";
import Header from "../components/Header";

const initialColumns = {
  "To-Do": ["item-1", "item-2", "item-3"],
  "In Progress": [],
  Done: [],
};

export default function Home() {
  const todos = useLoaderData();
  const [columns, setColumns] = useState(todos || {});

  // console.log(todos);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeContainer = Object.keys(columns).find((key) => {
      return columns[key].includes(active.id);
    });

    // console.log(activeContainer);
    const overContainer = over.id;

    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      console.log("same container");
      setColumns((prev) => {
        return {
          ...prev,
          [activeContainer]: arrayMove(
            prev[activeContainer],
            prev[activeContainer].indexOf(active.id),
            prev[activeContainer].indexOf(over.id)
          ),
        };
      });
    } else {
      console.log("another container");
      setColumns((prev) => {
        const activeItems = [...prev[activeContainer]];
        const overItems = [...prev[overContainer]];

        activeItems.splice(activeItems.indexOf(active.id), 1);
        overItems.splice(overItems.indexOf(over.id), 0, active.id);

        return {
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: overItems,
        };
      });
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
            {todos &&
              Object.keys(todos).map((columnId) => (
                <Droppable key={columnId} id={columnId}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold mb-2 capitalize">
                      {columnId.replace("-", " ")}
                    </h2>

                    <AddTodo columnId={columnId} />
                  </div>

                  <SortableContext
                    onDragEnd={handleDragEnd}
                    items={columns[columnId]}
                    strategy={verticalListSortingStrategy}>
                    {columns &&
                      columns[columnId].map((item) => (
                        <Draggable key={item._id} id={item._id}>
                          {item.title}
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
