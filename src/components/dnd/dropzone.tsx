import { FEATURES_LIST } from "@/data/features-list";
import { getNearestCell } from "@/lib/utils/coordinates";
import { pixellate } from "@/lib/utils/css";
import useApp from "@/state/contexts/app-context/useApp";
import { useState } from "react";

export default function Dropzone() {
  const { appState } = useApp();

  const { width, height } = appState.canvas;

  const canvasWidth = pixellate(width);
  const canvasHeight = pixellate(height);

  const [xToBeSet, setXToBeSet] = useState<string | null>(null);
  const [yToBeSet, setYToBeSet] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // to hide the globe icon - do not remove this
    e.dataTransfer.dropEffect = "move";

    // check for dropzone element, return if not found
    const dropzoneEl = e.currentTarget as HTMLDivElement;
    if (!dropzoneEl) return;

    // get the dragged item
    const draggedItem = FEATURES_LIST.find(
      (f) => f.id === appState.draggedItemId
    );
    if (!draggedItem) return;

    // check for preview element, create one if not found
    const previewEl = document.getElementById("preview-element");
    if (!previewEl) {
      const newPreviewEl = document.createElement("div");
      newPreviewEl.id = "preview-element";

      newPreviewEl.classList.add("bg-red-500", "absolute");

      // Use inline styles instead of dynamic Tailwind classes
      newPreviewEl.style.height = `calc((${canvasHeight}/12)*${draggedItem.minYCell})`;
      newPreviewEl.style.width = `calc((${canvasWidth}/12)*${draggedItem.minXCell})`;

      console.log({ canvasHeight, canvasWidth, draggedItem });

      const { x, y } = getNearestCell(dropzoneEl, e.clientX, e.clientY, 0, 0);

      newPreviewEl.style.left = pixellate(x);
      newPreviewEl.style.top = pixellate(y);

      dropzoneEl.appendChild(newPreviewEl as HTMLElement);
    }

    // if preview element exists, update the position
    if (previewEl) {
      const { x, y } = getNearestCell(dropzoneEl, e.clientX, e.clientY, 0, 0);

      previewEl.style.left = pixellate(x);
      previewEl.style.top = pixellate(y);
      setXToBeSet(pixellate(x));
      setYToBeSet(pixellate(y));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // check for dropzone element, return if not found
    const dropzoneEl = e.currentTarget as HTMLDivElement;
    if (!dropzoneEl) return;

    // check for preview element and remove it if it exists
    const previewEl = document.getElementById("preview-element");
    if (previewEl) {
      previewEl.remove();
    }

    // get the dragged item
    const draggedItem = FEATURES_LIST.find(
      (f) => f.id === appState.draggedItemId
    );
    if (!draggedItem) return;

    // get the dragged element
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    if (!draggedElement) return;

    // clone the dragged element & add the class names for styling
    const clonedDraggedElement = draggedElement.cloneNode(true) as HTMLElement;
    clonedDraggedElement.classList.add("absolute");
    clonedDraggedElement.style.left = xToBeSet ?? "0px";
    clonedDraggedElement.style.top = yToBeSet ?? "0px";
    clonedDraggedElement.style.width = `calc((${canvasWidth}/12)*${draggedItem.minXCell})`;
    clonedDraggedElement.style.height = `calc((${canvasHeight}/12)*${draggedItem.minYCell})`;

    // append the cloned element to the dropzone
    dropzoneEl.appendChild(clonedDraggedElement as HTMLElement);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    console.log("drag enter", { e });
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    console.log("drag leave", { e });

    // Determine if the mouse pointer has left dropzone boundaries during drag
    const dropzoneEl = e.currentTarget as HTMLDivElement;
    const rect = dropzoneEl.getBoundingClientRect();
    const { clientX, clientY } = e;

    const isOutside =
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom;

    if (!isOutside) return;

    const previewEl = document.getElementById("preview-element");
    if (previewEl) {
      previewEl.remove();
    }
  };

  return (
    <div
      id="dropzone"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-[600px] h-[600px] border relative"
    ></div>
  );
}
