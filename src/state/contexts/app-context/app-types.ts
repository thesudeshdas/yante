import { Dispatch, SetStateAction } from "react";

export interface IAppContext {
  features: string[];
  setFeatures: Dispatch<SetStateAction<string[]>>;
}
