import { Dispatch, SetStateAction } from "react";

export interface IAppContext {
  features: IFeature[];
  setFeatures: Dispatch<SetStateAction<IFeature[]>>;
}

export interface IFeature {
  id: string;
  name: string;
  description: string;
  minXCell: number;
  minYCell: number;
}
