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

  const nearestXCell = Math.round(relX / (600 / 12)) * 50;
  const nearestYCell = Math.round(relY / (600 / 12)) * 50;

  return {
    x: Math.round(nearestXCell / (600 / 12)) * 50,
    y: Math.round(nearestYCell / (600 / 12)) * 50,
  };
};
