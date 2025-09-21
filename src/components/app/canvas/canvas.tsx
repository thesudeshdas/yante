import useApp from "@/state/contexts/app-context/useApp";
import WidgetContainer from "../widget/widget-container";
import { useEffect, useRef } from "react";
import { pixellate } from "@/lib/utils/css";
import { FIXED_CELL_SIZE } from "@/data/app-constants";

export default function Canvas() {
  const { appState, appDispatch } = useApp();

  const { columns: canvasCols, rows: canvasRows } = appState.canvas;

  const contentWidth = canvasCols * FIXED_CELL_SIZE;
  const contentHeight = canvasRows * FIXED_CELL_SIZE;

  const canvasRef = useRef<HTMLDivElement>(null);

  const enabledFeaturesToRender = appState.enabledFeatures.filter(
    (feature) => feature.onCanvas
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const columns = Math.max(1, Math.floor(width / FIXED_CELL_SIZE));
        const rows = Math.max(1, Math.floor(height / FIXED_CELL_SIZE));
        appDispatch({
          type: "SET_CANVAS_DIMENSIONS",
          dimensions: { width, height, columns, rows },
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
      className="w-full h-full flex items-center justify-center"
    >
      <div
        className="border border-green-400 relative"
        style={{
          width: pixellate(contentWidth),
          height: pixellate(contentHeight),
          backgroundImage:
            `repeating-linear-gradient(to right, hsl(0 0% 50% / 0.2) 0 1px, transparent 1px ${pixellate(
              FIXED_CELL_SIZE
            )}), ` +
            `repeating-linear-gradient(to bottom, hsl(0 0% 50% / 0.2) 0 1px, transparent 1px ${pixellate(
              FIXED_CELL_SIZE
            )})`,
        }}
      >
        {enabledFeaturesToRender.map((feature) => (
          <WidgetContainer key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  );
}
