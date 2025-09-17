export interface IAppState {
  features: IFeature[];
  enabledFeatures: IEnabledFeature[];
  draggedItemId: string | null;
  canvas: {
    width: number;
    height: number;
  };
}

export interface IFeature {
  id: string;
  name: string;
  description: string;
  minXCell: number;
  minYCell: number;
}

export interface IEnabledFeature extends IFeature {
  enabled: boolean;
  onCanvas: boolean;
  position?: {
    x: number;
    y: number;
  };
}

export type IAppAction =
  | { type: "SET_ENABLED_FEATURES"; enabledFeatures: IEnabledFeature[] }
  | { type: "ADD_FEATURE"; featureId: string }
  | { type: "REMOVE_FEATURE"; featureID: string }
  | { type: "SET_DRAGGED_ITEM"; itemId: string }
  | {
      type: "SET_POSITION";
      itemId: string;
      position: { x: number; y: number };
    }
  | { type: "REMOVE_FEATURE_FROM_CANVAS"; featureID: string };
