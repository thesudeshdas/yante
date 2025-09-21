import { getNearestCell } from "@/lib/utils/coordinates";
import { pixellate, setCSS } from "@/lib/utils/css";
import useApp from "@/state/contexts/app-context/useApp";
import { useRef, useState } from "react";
import Draggable from "./draggable";
// Removed fixed constant usage; using app state's cell size

interface IDropzoneProps {
  maxWidth?: number;
}

export default function Dropzone({ maxWidth }: IDropzoneProps) {
  const { appState, appDispatch } = useApp();
  const gridRef = useRef<HTMLDivElement>(null);

  const {
    width: canvasWidth,
    height: canvasHeight,
    columns: canvasCols,
    rows: canvasRows,
    cellSize: appCellSize,
  } = appState.canvas;

  // Calculate scale factor if maxWidth is provided
  const scale = maxWidth && canvasWidth > maxWidth ? maxWidth / canvasWidth : 1;
  const scaledWidth = canvasWidth * scale;
  const scaledHeight = canvasHeight * scale;

  const cellSizeForCols = scaledWidth / canvasCols;
  const cellSizeForRows = scaledHeight / canvasRows;
  const cellSize = Math.min(cellSizeForCols, cellSizeForRows);
  const contentWidth = canvasCols * cellSize;
  const contentHeight = canvasRows * cellSize;
  const convScale = cellSize / appCellSize;

  const [xToBeSet, setXToBeSet] = useState<number | null>(null);
  const [yToBeSet, setYToBeSet] = useState<number | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Determine if the mouse pointer has left dropzone boundaries during drag
    const gridEl = gridRef.current;
    if (!gridEl) return;
    const rect = gridEl.getBoundingClientRect();
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
    const gridEl = gridRef.current;
    if (!gridEl) return;

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
        height: pixellate(cellSize * draggedItem.minYCell),
        width: pixellate(cellSize * draggedItem.minXCell),
      });

      const { x, y } = getNearestCell(
        gridEl,
        e.clientX,
        e.clientY,
        0,
        0,
        canvasCols
      );

      setCSS(newPreviewEl, {
        left: pixellate(x),
        top: pixellate(y),
      });

      gridEl.appendChild(newPreviewEl as HTMLElement);
    }

    // if preview element exists, update the position
    if (previewEl) {
      const { x, y } = getNearestCell(
        gridEl,
        e.clientX,
        e.clientY,
        0,
        0,
        canvasCols
      );

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
    const gridEl = gridRef.current;
    if (!gridEl) return;

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
          x: Math.round(xToBeSet / convScale),
          y: Math.round(yToBeSet / convScale),
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
      className="overflow-hidden flex items-center justify-center"
      style={{ width: pixellate(scaledWidth), height: pixellate(scaledHeight) }}
    >
      <div
        ref={gridRef}
        className="relative w-full border border-red-500"
        style={{
          width: pixellate(contentWidth),
          height: pixellate(contentHeight),
          backgroundImage:
            `repeating-linear-gradient(to right, hsl(0 0% 50% / 0.2) 0 1px, transparent 1px ${pixellate(
              cellSize
            )}), ` +
            `repeating-linear-gradient(to bottom, hsl(0 0% 50% / 0.2) 0 1px, transparent 1px ${pixellate(
              cellSize
            )})`,
        }}
      >
        {enabledFeaturesToRender.map((feature) => (
          <Draggable
            key={feature.id}
            feature={feature}
            onCanvas
            scale={convScale}
            gridBaseWidth={canvasCols * appCellSize}
            gridColumns={canvasCols}
          />
        ))}
      </div>
    </div>
  );
}
