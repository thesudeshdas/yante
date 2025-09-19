import { pixellate } from "./css";

export const getNearestCell = (
  dropzone: HTMLDivElement,
  mouseX: number,
  mouseY: number,
  x: number,
  y: number
): { x: number; y: number } => {
  const dropzoneRect = dropzone.getBoundingClientRect();
  const relX = mouseX - dropzoneRect.left;
  const relY = mouseY - dropzoneRect.top;

  const cellWidth = dropzoneRect.width / 12;
  const cellHeight = dropzoneRect.height / 12;

  const snappedX = Math.round(relX / cellWidth) * cellWidth;
  const snappedY = Math.round(relY / cellHeight) * cellHeight;

  return {
    x: Math.round(snappedX),
    y: Math.round(snappedY),
  };
};

export const getCanvasPosition = (
  canvasWidth: number,
  canvasHeight: number,
  minXCell: number,
  minYCell: number,
  position: { x: number; y: number },
  scale: number
): { width: string; height: string; left: string; top: string } => {
  return {
    width: pixellate((canvasWidth / 12) * minXCell * scale),
    height: pixellate((canvasHeight / 12) * minYCell * scale),
    left: pixellate(position.x * scale),
    top: pixellate(position.y * scale),
  };
};
