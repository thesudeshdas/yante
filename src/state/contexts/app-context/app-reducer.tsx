import { FEATURES_LIST } from "@/data/features-list";
import { IAppAction, IAppState } from "./app-types";

export default function appReducer(
  state: IAppState,
  action: IAppAction
): IAppState {
  switch (action.type) {
    case "ADD_FEATURE":
      const featureToAdd = FEATURES_LIST.find((f) => f.id === action.featureId);
      if (!featureToAdd) return state;

      return { ...state, features: [...state.features, featureToAdd] };
    case "REMOVE_FEATURE":
      const featureToRemove = FEATURES_LIST.find(
        (f) => f.id === action.featureID
      );
      if (!featureToRemove) return state;

      return {
        ...state,
        features: state.features.filter((f) => f !== featureToRemove),
      };
    case "SET_DRAGGED_ITEM":
      return { ...state, draggedItemId: action.itemId };
    default:
      return state;
  }
}
