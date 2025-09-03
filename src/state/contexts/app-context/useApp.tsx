import { useContext } from "react";
import { AppContext } from "./app-context";

export default function useApp() {
  const { features, setFeatures } = useContext(AppContext);

  return { features, setFeatures };
}
