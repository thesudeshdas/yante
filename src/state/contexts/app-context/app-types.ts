export interface IAppState {
  features: IFeature[];
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

export type IAppAction =
  | { type: "ADD_FEATURE"; featureId: string }
  | { type: "REMOVE_FEATURE"; featureID: string }
  | { type: "SET_DRAGGED_ITEM"; itemId: string };
