import { getNearestCell } from "@/lib/utils/coordinates";
import { pixellate, setCSS } from "@/lib/utils/css";
import useApp from "@/state/contexts/app-context/useApp";
import { useState } from "react";
import Draggable from "./draggable";

interface IDropzoneProps {
  maxWidth?: number;
}

export default function Dropzone({ maxWidth }: IDropzoneProps) {
  const { appState, appDispatch } = useApp();

  const { width, height } = appState.canvas;

  // Calculate scale factor if maxWidth is provided
  const scale = maxWidth && width > maxWidth ? maxWidth / width : 1;
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  const canvasWidth = pixellate(scaledWidth);
  const canvasHeight = pixellate(scaledHeight);

  const [xToBeSet, setXToBeSet] = useState<number | null>(null);
  const [yToBeSet, setYToBeSet] = useState<number | null>(null);

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // to hide the globe icon - do not remove this
    e.dataTransfer.dropEffect = "move";

    // check for dropzone element, return if not found
    const dropzoneEl = e.currentTarget as HTMLDivElement;
    if (!dropzoneEl) return;

    // get the dragged item
    const draggedItem = appState.enabledFeatures.find(
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
      setCSS(newPreviewEl, {
        height: `calc((${canvasHeight}/12)*${draggedItem.minYCell})`,
        width: `calc((${canvasWidth}/12)*${draggedItem.minXCell})`,
      });

      console.log({ canvasHeight, canvasWidth, draggedItem });

      const { x, y } = getNearestCell(dropzoneEl, e.clientX, e.clientY, 0, 0);

      setCSS(newPreviewEl, {
        left: pixellate(x),
        top: pixellate(y),
      });

      dropzoneEl.appendChild(newPreviewEl as HTMLElement);
    }

    // if preview element exists, update the position
    if (previewEl) {
      const { x, y } = getNearestCell(dropzoneEl, e.clientX, e.clientY, 0, 0);

      // update the position of the preview element
      setCSS(previewEl, {
        left: pixellate(x),
        top: pixellate(y),
      });

      // set the x and y to be set in the cloned dragged element
      setXToBeSet(x);
      setYToBeSet(y);
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
    const draggedItem = appState.enabledFeatures.find(
      (f) => f.id === appState.draggedItemId
    );
    if (!draggedItem) return;

    // set the position of the dragged element
    if (xToBeSet !== null && yToBeSet !== null) {
      appDispatch({
        type: "SET_POSITION",
        itemId: draggedItem.id,
        position: {
          x: Math.round(xToBeSet / scale),
          y: Math.round(yToBeSet / scale),
        },
      });
    }
  };

  const enabledFeaturesToRender = appState.enabledFeatures.filter(
    (feature) => feature.onCanvas
  );

  return (
    <div
      id="dropzone"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border relative"
      style={{
        width: canvasWidth,
        height: canvasHeight,
        backgroundImage:
          `repeating-linear-gradient(to right, hsl(0 0% 50% / 0.2) 0 1px, transparent 1px calc((${canvasWidth})/12)), ` +
          `repeating-linear-gradient(to bottom, hsl(0 0% 50% / 0.2) 0 1px, transparent 1px calc((${canvasHeight})/12))`,
      }}
    >
      {enabledFeaturesToRender.map((feature) => (
        <Draggable key={feature.id} feature={feature} onCanvas scale={scale} />
      ))}
    </div>
  );
}
