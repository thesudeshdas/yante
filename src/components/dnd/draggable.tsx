import { IFeature } from "@/state/contexts/app-context/app-types";
import useApp from "@/state/contexts/app-context/useApp";

interface IDraggableProps {
  feature: IFeature;
}

export default function Draggable({ feature }: IDraggableProps) {
  const { appDispatch } = useApp();

  const { id, name, minXCell, minYCell } = feature;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", `draggable_${feature.id}`);
    e.dataTransfer.dropEffect = "move";

    // set the dragged item in the app state
    appDispatch({ type: "SET_DRAGGED_ITEM", itemId: feature.id });

    const img = new Image();
    img.src =
      "data:image/svg+xml;base64," +
      btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>'
      );

    // Use this as drag image → effectively hides ghost
    e.dataTransfer?.setDragImage(img, 0, 0);
  };

  return (
    <div
      id={`draggable_${id}`}
      onDragStart={handleDragStart}
      draggable="true"
      className="border p-2"
    >
      {name} ({minXCell}x{minYCell})
    </div>
  );
}
