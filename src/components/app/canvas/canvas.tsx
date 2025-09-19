import useApp from "@/state/contexts/app-context/useApp";
import WidgetContainer from "../widget/widget-container";
import { useEffect, useRef } from "react";
import { pixellate } from "@/lib/utils/css";

export default function Canvas() {
  const { appState, appDispatch } = useApp();

  const { width, height } = appState.canvas;

  // Calculate scale factor if maxWidth is provided
  const scale = 1;
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  const canvasWidth = pixellate(scaledWidth);
  const canvasHeight = pixellate(scaledHeight);

  const canvasRef = useRef<HTMLDivElement>(null);

  const enabledFeaturesToRender = appState.enabledFeatures.filter(
    (feature) => feature.onCanvas
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        appDispatch({
          type: "SET_CANVAS_DIMENSIONS",
          dimensions: { width, height },
        });
      }
    });

    resizeObserver.observe(canvasRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [appDispatch]);

  return (
    <div
      ref={canvasRef}
      className="w-full h-full border relative"
      style={{
        backgroundImage:
          `repeating-linear-gradient(to right, hsl(0 0% 50% / 0.2) 0 1px, transparent 1px calc((${canvasWidth})/12)), ` +
          `repeating-linear-gradient(to bottom, hsl(0 0% 50% / 0.2) 0 1px, transparent 1px calc((${canvasHeight})/12))`,
      }}
    >
      {enabledFeaturesToRender.map((feature) => (
        <WidgetContainer key={feature.id} feature={feature} />
      ))}
    </div>
  );
}
