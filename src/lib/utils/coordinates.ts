import { pixellate } from "./css";

export const getNearestCell = (
  dropzone: HTMLDivElement,
  mouseX: number,
  mouseY: number,
  x: number,
  y: number,
  columns: number
): { x: number; y: number } => {
  const dropzoneRect = dropzone.getBoundingClientRect();
  const relX = mouseX - dropzoneRect.left + dropzone.scrollLeft;
  const relY = mouseY - dropzoneRect.top + dropzone.scrollTop;

  const safeColumns = Math.max(1, Math.floor(columns));
  const cellSize = dropzoneRect.width / safeColumns;

  const snappedX = Math.round(relX / cellSize) * cellSize;
  const snappedY = Math.round(relY / cellSize) * cellSize;

  return {
    x: Math.round(snappedX),
    y: Math.round(snappedY),
  };
};

export const getCanvasPosition = (
  canvasWidth: number,
  minXCell: number,
  minYCell: number,
  position: { x: number; y: number },
  scale: number,
  columns: number
): { width: string; height: string; left: string; top: string } => {
  const safeColumns = Math.max(1, Math.floor(columns));
  const cellSize = canvasWidth / safeColumns;

  return {
    width: pixellate(cellSize * minXCell * scale),
    height: pixellate(cellSize * minYCell * scale),
    left: pixellate(position.x * scale),
    top: pixellate(position.y * scale),
  };
};
