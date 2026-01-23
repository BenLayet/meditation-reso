import { GlobalEvent, stringToComponentPath } from "@softer-components/utils";

export const NEW_MEDITATION_PATH = stringToComponentPath("/newMeditation:0/");
export const SETTINGS_PATH = stringToComponentPath(
  "/newMeditation:0/settings:0/",
);
export const MEDITATION_SESSION_PATH = stringToComponentPath(
  "/meditationSession:0/",
);
export const START_CLICKED = (): GlobalEvent[] => [
  {
    payload: undefined,
    name: "startClicked",
    componentPath: NEW_MEDITATION_PATH,
  },
];
export const TIMER_TICKED = (): GlobalEvent[] => [
  {
    payload: undefined,
    name: "timerTicked",
    componentPath: MEDITATION_SESSION_PATH,
  },
];

export const BACK_CLICKED = (): GlobalEvent[] => [
  {
    payload: undefined,
    name: "backClicked",
    componentPath: MEDITATION_SESSION_PATH,
  },
];
