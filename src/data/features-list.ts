import { IFeature } from "@/state/contexts/app-context/app-types";

export const FEATURES_LIST: IFeature[] = [
  {
    id: "id_clock",
    name: "Clock",
    description: "Show the current time",
    minXCell: 2,
    minYCell: 2,
  },
  // {
  //   id: "id_pomodoro",
  //   name: "Pomodoro Timer",
  //   description: "A timer that helps you stay focused",
  //   minXCell: 2,
  //   minYCell: 2,
  // },
];
