import Clock from "@/components/app/clock/clock";
import Pomodoro from "@/components/app/pomodoro/pomodoro";
import { IWidget } from "@/state/contexts/app-context/app-types";

export const WIDGET_LIST: IWidget[] = [
  {
    id: "id_clock",
    component: Clock,
  },
  {
    id: "id_pomodoro",
    component: Pomodoro,
  },
];
