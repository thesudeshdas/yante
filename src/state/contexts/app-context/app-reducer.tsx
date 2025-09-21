import { FEATURES_LIST } from "@/data/features-list";
import { IAppAction, IAppState } from "./app-types";

export default function appReducer(
  state: IAppState,
  action: IAppAction
): IAppState {
  switch (action.type) {
    case "SET_ENABLED_FEATURES":
      return {
        ...state,
        enabledFeatures: action.enabledFeatures,
      };

    case "ADD_FEATURE":
      const featureToAdd = FEATURES_LIST.find((f) => f.id === action.featureId);
      if (!featureToAdd) return state;

      return {
        ...state,
        enabledFeatures: [
          ...state.enabledFeatures,
          { ...featureToAdd, enabled: true, onCanvas: false },
        ],
      };

    case "REMOVE_FEATURE":
      return {
        ...state,
        enabledFeatures: state.enabledFeatures.filter(
          (f) => f.id !== action.featureID
        ),
      };

    case "SET_DRAGGED_ITEM":
      return { ...state, draggedItemId: action.itemId };

    case "SET_POSITION":
      return {
        ...state,
        enabledFeatures: state.enabledFeatures.map((f) =>
          f.id === action.itemId
            ? { ...f, position: action.position, onCanvas: true }
            : f
        ),
      };

    case "REMOVE_FEATURE_FROM_CANVAS":
      return {
        ...state,
        enabledFeatures: state.enabledFeatures.map((f) =>
          f.id === action.featureID ? { ...f, onCanvas: false } : f
        ),
      };

    case "SET_CANVAS_DIMENSIONS":
      return {
        ...state,
        canvas: {
          ...state.canvas,
          ...action.dimensions,
        },
      };

    default:
      return state;
  }
}
