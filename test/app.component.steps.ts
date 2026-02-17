import { GlobalEvent, stringToStatePath } from "@softer-components/utils";

export const APP_PATH = "/";
export const NEW_MEDITATION_PATH = "/newMeditation";
export const SETTINGS_PATH = "/newMeditation/settings";
export const MEDITATION_SESSION_PATH = "/meditationSession";
export const DISPLAYED = (): GlobalEvent[] => [
  {
    payload: undefined,
    name: "displayed",
    statePath: stringToStatePath(SETTINGS_PATH),
  },
  {
    payload: undefined,
    name: "displayed",
    statePath: stringToStatePath(NEW_MEDITATION_PATH),
  },
];
export const START_CLICKED = (): GlobalEvent[] => [
  {
    payload: undefined,
    name: "startClicked",
    statePath: stringToStatePath(NEW_MEDITATION_PATH),
  },
];
export const BACK_CLICKED = (): GlobalEvent[] => [
  {
    payload: undefined,
    name: "backClicked",
    statePath: stringToStatePath(MEDITATION_SESSION_PATH),
  },
];
