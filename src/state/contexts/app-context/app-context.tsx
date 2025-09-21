import React, {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from "react";
import { IAppAction, IAppState } from "./app-types";
import { FEATURES_LIST } from "@/data/features-list";
import appReducer from "./app-reducer";
import { getFromStorage, saveToStorage } from "@/lib/utils/storage";

const getInitialState = (): IAppState => ({
  features: FEATURES_LIST,
  enabledFeatures: [],
  draggedItemId: null,
  canvas: {
    width: 600,
    height: 600,
    columns: 6,
    rows: 6,
    cellSize: 75,
  },
});

export const AppContext = createContext(
  {} as {
    state: IAppState;
    dispatch: Dispatch<IAppAction>;
  }
);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(appReducer, getInitialState());
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize state from storage before rendering
  useEffect(() => {
    const initializeFromStorage = async () => {
      try {
        const enabledFeatures = await getFromStorage("enabledFeatures");
        const storedCellSize = await getFromStorage("cellSize");
        console.log({ enabledFeatures });

        if (enabledFeatures) {
          dispatch({ type: "SET_ENABLED_FEATURES", enabledFeatures });
        }
        if (storedCellSize && typeof storedCellSize === "number") {
          dispatch({ type: "SET_CELL_SIZE", cellSize: storedCellSize });
        }
      } catch (error) {
        console.error("Failed to load from storage:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeFromStorage();
  }, []);

  // Save state changes to storage
  useEffect(() => {
    if (isInitialized) {
      saveToStorage("enabledFeatures", state.enabledFeatures);
      saveToStorage("cellSize", state.canvas.cellSize);
    }
  }, [state.enabledFeatures, isInitialized]);

  // Don't render children until state is initialized from storage
  if (!isInitialized) {
    return null;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
