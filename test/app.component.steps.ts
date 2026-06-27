import {
  type SofterTestEvent,
  stringToStatePath,
} from "@softer-components/test-utilities";

export const APP_PATH = "/";
export const NEW_MEDITATION_PATH = "/newMeditation";
export const SETTINGS_PATH = "/newMeditation/settings";
export const MEDITATION_SESSION_PATH = "/meditationSession";
export const DISPLAYED = (): SofterTestEvent[] => [
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
export const START_CLICKED = (): SofterTestEvent[] => [
  {
    payload: undefined,
    name: "startClicked",
    statePath: stringToStatePath(NEW_MEDITATION_PATH),
  },
];
export const BACK_CLICKED = (): SofterTestEvent[] => [
  {
    payload: undefined,
    name: "backClicked",
    statePath: stringToStatePath(MEDITATION_SESSION_PATH),
  },
];
