import { WIDGET_LIST } from "@/data/widget-list";
import { IEnabledFeature } from "@/state/contexts/app-context/app-types";
import useApp from "@/state/contexts/app-context/useApp";
import { getCanvasPosition } from "@/lib/utils/coordinates";
// Removed fixed constant usage; using app state's cell size

interface IWidgetContainerProps {
  feature: IEnabledFeature;
}

export default function WidgetContainer({ feature }: IWidgetContainerProps) {
  const { appState } = useApp();
  const { width: canvasWidth, cellSize: appCellSize } = appState.canvas;
  const scale = 1; // canvas rendered at actual size; adapt if canvas scaling is introduced

  const Widget = WIDGET_LIST.find(
    (widget) => widget.id === feature.id
  )?.component;

  if (!Widget) return <div>Not found</div>;

  const canvasCols = Math.max(1, Math.floor(canvasWidth / appCellSize));
  const gridBaseWidth = canvasCols * appCellSize;

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
