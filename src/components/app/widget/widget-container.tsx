import { WIDGET_LIST } from "@/data/widget-list";
import { IEnabledFeature } from "@/state/contexts/app-context/app-types";
import useApp from "@/state/contexts/app-context/useApp";
import { getCanvasPosition } from "@/lib/utils/coordinates";
import { FIXED_CELL_SIZE } from "@/data/app-constants";

interface IWidgetContainerProps {
  feature: IEnabledFeature;
}

export default function WidgetContainer({ feature }: IWidgetContainerProps) {
  const { appState } = useApp();
  const { width: canvasWidth } = appState.canvas;
  const scale = 1; // canvas rendered at actual size; adapt if canvas scaling is introduced

  const Widget = WIDGET_LIST.find(
    (widget) => widget.id === feature.id
  )?.component;

  if (!Widget) return <div>Not found</div>;

  const canvasCols = Math.max(1, Math.floor(canvasWidth / FIXED_CELL_SIZE));
  const gridBaseWidth = canvasCols * FIXED_CELL_SIZE;

  return (
    <div
      className="absolute bg-red-300 overflow-hidden"
      style={getCanvasPosition(
        gridBaseWidth,
        feature.minXCell,
        feature.minYCell,
        feature.position ?? { x: 0, y: 0 },
        scale,
        canvasCols
      )}
    >
      <Widget />
    </div>
  );
}
