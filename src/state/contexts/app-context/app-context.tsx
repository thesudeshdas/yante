import React, { createContext, useState } from "react";
import { IAppContext } from "./app-types";

export const initialFeatures: IAppContext = {
  features: ["id_clock"],
  setFeatures: () => {},
};

export const AppContext = createContext({} as IAppContext);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [features, setFeatures] = useState<string[]>(initialFeatures.features);

  return (
    <AppContext.Provider value={{ features, setFeatures }}>
      {children}
    </AppContext.Provider>
  );
}
