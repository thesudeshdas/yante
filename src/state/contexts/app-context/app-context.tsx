import React, { createContext, Dispatch, useReducer } from "react";
import { IAppAction, IAppState } from "./app-types";
import { FEATURES_LIST } from "@/data/features-list";
import appReducer from "./app-reducer";

export const initialFeatures: IAppState = {
  features: FEATURES_LIST,
  draggedItem: null,
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
