import { useContext } from "react";
import { AppContext } from "./app-context";

export default function useApp() {
  const { state, dispatch } = useContext(AppContext);

  return { appState: state, appDispatch: dispatch };
}
