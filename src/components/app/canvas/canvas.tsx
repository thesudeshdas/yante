import useApp from "@/state/contexts/app-context/useApp";
import WidgetContainer from "../widget/widget-container";
import { useEffect, useRef } from "react";
import { pixellate } from "@/lib/utils/css";

export default function Canvas() {
  const { appState, appDispatch } = useApp();

  const {
    columns: canvasCols,
    rows: canvasRows,
    cellSize: appCellSize,
  } = appState.canvas;

  const contentWidth = canvasCols * appCellSize;
  const contentHeight = canvasRows * appCellSize;

  const canvasRef = useRef<HTMLDivElement>(null);
  const lockedCellSizeRef = useRef<number | null>(null);

  const enabledFeaturesToRender = appState.enabledFeatures.filter(
    (feature) => feature.onCanvas
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Initialize and lock cell size once based on initial columns = 16
        const isFirstInit = lockedCellSizeRef.current === null;
        if (isFirstInit) {
          const initial = Math.max(1, Math.floor(width / 16));
          lockedCellSizeRef.current = initial;
          appDispatch({ type: "SET_CELL_SIZE", cellSize: initial });
        }

        const locked = lockedCellSizeRef.current as number;
        const columns = isFirstInit
          ? 16
          : Math.max(1, Math.floor(width / locked));
        const rows = Math.max(1, Math.floor(height / locked));
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
              appCellSize
            )}), ` +
            `repeating-linear-gradient(to bottom, hsl(0 0% 50% / 0.2) 0 1px, transparent 1px ${pixellate(
              appCellSize
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
