import React, { createContext, useState } from "react";
import { IAppContext, IFeature } from "./app-types";
import { FEATURES_LIST } from "@/data/features-list";

export const initialFeatures: IAppContext = {
  features: FEATURES_LIST,
  setFeatures: () => {},
};

export const AppContext = createContext({} as IAppContext);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [features, setFeatures] = useState<IFeature[]>(
    initialFeatures.features
  );

  return (
    <AppContext.Provider value={{ features, setFeatures }}>
      {children}
    </AppContext.Provider>
  );
}
