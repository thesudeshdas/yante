import React, { createContext, Dispatch, useReducer } from "react";
import { IAppAction, IAppState } from "./app-types";
import { FEATURES_LIST } from "@/data/features-list";
import appReducer from "./app-reducer";

export const initialFeatures: IAppState = {
  features: FEATURES_LIST,
  enabledFeatures: [],
  draggedItemId: null,
  canvas: {
    width: 600,
    height: 600,
  },
};

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
  const [state, dispatch] = useReducer(appReducer, initialFeatures);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
