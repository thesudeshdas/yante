import { getNearestCell } from "@/lib/utils/coordinates";
import { pixellate } from "@/lib/utils/css";
import { useState } from "react";

export default function Dropzone() {
  const [xToBeSet, setXToBeSet] = useState<string | null>(null);
  const [yToBeSet, setYToBeSet] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";

    console.log("drag over", { e });

    const dropzoneEl = e.currentTarget as HTMLDivElement;
    if (!dropzoneEl) return;

    const previewEl = document.getElementById("preview-element");
    if (!previewEl) {
      const newPreviewEl = document.createElement("div");
      newPreviewEl.id = "preview-element";

      newPreviewEl?.classList.add(
        "bg-red-500",
        "h-[100px]",
        "w-[100px]",
        "absolute"
      );

      const { x, y } = getNearestCell(dropzoneEl, e.clientX, e.clientY, 0, 0);

      newPreviewEl.style.left = pixellate(x);
      newPreviewEl.style.top = pixellate(y);

      dropzoneEl.appendChild(newPreviewEl as HTMLElement);
    }

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

    const data = e.dataTransfer.getData("text/plain");
    console.log({ dt: e.dataTransfer, data });

    const draggedElement = document.getElementById(data);
    if (!draggedElement) return;

    // check for preview element and remove it if it exists
    const previewEl = document.getElementById("preview-element");
    if (previewEl) {
      previewEl.remove();
    }

    // find the dropzone element
    const dropzoneEl = e.currentTarget as HTMLDivElement;
    if (!dropzoneEl) return;

    // clone the dragged element & add the class names for styling
    const clonedDraggedElement = draggedElement.cloneNode(true) as HTMLElement;
    clonedDraggedElement.classList.add(
      "w-[calc((600px/12)*2)]",
      "h-[calc((600px/12)*2)]",
      "absolute"
    );
    clonedDraggedElement.style.left = xToBeSet ?? "0px";
    clonedDraggedElement.style.top = yToBeSet ?? "0px";

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
