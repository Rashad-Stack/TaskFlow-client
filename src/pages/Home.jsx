import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

// Components
import { useState } from "react";
import { useLoaderData } from "react-router";
import Container from "../components/Container";
import Header from "../components/Header";
import Item from "../components/Item";

export default function Home() {
  const tasks = useLoaderData();

  const [containers, setContainers] = useState(tasks || []);
  const [activeId, setActiveId] = useState(null);

  // Find the value of the items
  function findValueOfItems(id, type) {
    if (type === "container") {
      return containers.find((container) => container === id);
    }
    if (type === "item") {
      return containers.find((container) =>
        container.tasks.find((item) => item._id === id)
      );
    }
  }

  const findItemTitle = (id) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.tasks.find((item) => item._id === id);
    if (!item) return "";

    return item.title;
  };

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event) => {
    const { active, over } = event;

    // console.log({ active });

    // Handle Items Sorting
    if (active && over && active.id !== over.id) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // console.log({ activeContainer, overContainer });
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex((container) => {
        return container.category === activeContainer.category;
      });
      const overContainerIndex = containers.findIndex(
        (container) => container.category === overContainer.category
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.tasks.findIndex(
        (item) => item._id === active.id
      );
      const overitemIndex = overContainer.tasks.findIndex(
        (item) => item._id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];

        newItems[activeContainerIndex].tasks = arrayMove(
          newItems[activeContainerIndex].tasks,
          activeitemIndex,
          overitemIndex
        );

        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        console.log(newItems[activeContainerIndex]);
        const [removeditem] = newItems[activeContainerIndex].tasks.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].tasks.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
  };

  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  function handleDragEnd(event) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes("container") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
  }

  return (
    <div className="min-h-dvh flex flex-col my-2 lg:max-w-5xl mx-auto">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl py-10">
          <div className="mt-10">
            <div className="grid grid-cols-3 gap-6">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}>
                <SortableContext items={containers.map((i) => i.category)}>
                  {containers &&
                    containers.map((container) => (
                      <Container
                        id={container.category}
                        title={container.category}
                        key={container.category}>
                        <SortableContext
                          items={containers.map((i) => i.category)}>
                          <div className="flex items-start flex-col gap-y-4">
                            {container &&
                              container.tasks.map((i) => (
                                <Item title={i.title} id={i._id} key={i._id} />
                              ))}
                          </div>
                        </SortableContext>
                      </Container>
                    ))}
                </SortableContext>
                <DragOverlay adjustScale={false}>
                  {/* Drag Overlay For item Item */}
                  {activeId && (
                    <Item id={activeId} title={findItemTitle(activeId)} />
                  )}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
