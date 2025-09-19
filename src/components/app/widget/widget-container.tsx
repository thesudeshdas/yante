import { WIDGET_LIST } from "@/data/widget-list";
import { IEnabledFeature } from "@/state/contexts/app-context/app-types";
import useApp from "@/state/contexts/app-context/useApp";
import { getCanvasPosition } from "@/lib/utils/coordinates";

interface IWidgetContainerProps {
  feature: IEnabledFeature;
}

export default function WidgetContainer({ feature }: IWidgetContainerProps) {
  const { appState } = useApp();
  const { width: canvasWidth, height: canvasHeight } = appState.canvas;
  const scale = 1; // canvas rendered at actual size; adapt if canvas scaling is introduced

  const Widget = WIDGET_LIST.find(
    (widget) => widget.id === feature.id
  )?.component;

  console.log({ feature });

  if (!Widget) return <div>Not found</div>;

  return (
    <div
      className="absolute bg-red-300 overflow-hidden"
      style={getCanvasPosition(
        canvasWidth,
        canvasHeight,
        feature.minXCell,
        feature.minYCell,
        feature.position ?? { x: 0, y: 0 },
        scale
      )}
    >
      <Widget />
    </div>
  );
}
