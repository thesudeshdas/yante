import { WIDGET_LIST } from "@/data/widget-list";
import { IEnabledFeature } from "@/state/contexts/app-context/app-types";
import useApp from "@/state/contexts/app-context/useApp";
import { pixellate } from "@/lib/utils/css";

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
      style={{
        width: pixellate(
          (canvasWidth / 12) * (feature as IEnabledFeature).minXCell * scale
        ),
        height: pixellate(
          (canvasHeight / 12) * (feature as IEnabledFeature).minYCell * scale
        ),
        left: pixellate(
          ((feature as IEnabledFeature)?.position?.x ?? 0) * scale
        ),
        top: pixellate(
          ((feature as IEnabledFeature)?.position?.y ?? 0) * scale
        ),
      }}
    >
      <Widget />
    </div>
  );
}
