import { cn } from "@/lib/utils/tailwind";
import {
  IEnabledFeature,
  IFeature,
} from "@/state/contexts/app-context/app-types";
import useApp from "@/state/contexts/app-context/useApp";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { getCanvasPosition } from "@/lib/utils/coordinates";

type IDraggableProps<T extends boolean = false> = {
  feature: T extends true ? IEnabledFeature : IFeature;
  onCanvas?: T;
  scale?: number;
  gridBaseWidth?: number;
  gridColumns?: number;
};

export default function Draggable<T extends boolean = false>({
  feature,
  onCanvas = false as T,
  scale = 1,
  gridBaseWidth,
  gridColumns,
}: IDraggableProps<T>) {
  const { appState, appDispatch } = useApp();

  const { width: canvasWidth } = appState.canvas;
  const baseWidth = gridBaseWidth ?? canvasWidth;

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

  const handleRemove = () => {
    appDispatch({ type: "REMOVE_FEATURE_FROM_CANVAS", featureID: feature.id });
  };

  return (
    <div
      id={`draggable_${id}`}
      onDragStart={handleDragStart}
      draggable="true"
      className={cn("border p-2 group", onCanvas && `bg-red-500 absolute`)}
      style={
        onCanvas
          ? getCanvasPosition(
              baseWidth,
              minXCell,
              minYCell,
              (feature as IEnabledFeature).position ?? { x: 0, y: 0 },
              scale,
              gridColumns ?? 0
            )
          : {}
      }
    >
      <Button
        variant="default"
        size="icon"
        className="absolute top-0 right-0 hidden group-hover:flex cursor-pointer"
        onClick={handleRemove}
      >
        <XIcon />
      </Button>
      {name} ({minXCell}x{minYCell})
    </div>
  );
}
