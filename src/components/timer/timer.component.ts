import {
  ChildrenValues,
  ComponentDef,
  ComponentEventsContract,
  EffectsDef,
  ExtractComponentValuesContract,
  Selectors,
} from "@softer-components/types";
import { formatSeconds } from "../../util/duration.functions";
import {
  settingsComponentDef,
  SettingsContract,
} from "./settings/settings.component";

// Initial state definition
const initialState = {
  startedTimeInSeconds: 0,
  isReadyToStart: true,
  remainingTimeInSeconds: 0,
};
type State = typeof initialState;
//children
type Children = {
  settings: SettingsContract;
};

//selectors
const startedTimeInSeconds = (state: State) => state.startedTimeInSeconds;
const isReadyToStart = (state: State) => state.isReadyToStart;
const isRunning = (state: State) =>
  !state.isReadyToStart && state.remainingTimeInSeconds > 0;
const areSettingsVisible = isReadyToStart;
const isProgressVisible = (state: State) => !state.isReadyToStart;
const remainingTime = (state: State) =>
  formatSeconds(state.remainingTimeInSeconds);
const durationInSeconds = (_: State, children: ChildrenValues<Children>) =>
  children.settings["0"].selectors.durationInMinutes() * 60;
const isGongOn = (_: State, children: ChildrenValues<Children>) =>
  children.settings["0"].selectors.isGongOn();
const remainingTimeInSeconds = (state: State) => state.remainingTimeInSeconds;
const isRemainingTimeZero = (state: State) => state.remainingTimeInSeconds <= 0;
const canBeStopped = (state: State) => !state.isReadyToStart;

const selectors = {
  startedTimeInSeconds,
  isRunning,
  areSettingsVisible,
  isProgressVisible,
  remainingTime,
  durationInSeconds,
  isGongOn,
  remainingTimeInSeconds,
  isRemainingTimeZero,
  canBeStopped,
  isReadyToStart,
};

const eventNames = [
  "startClicked",
  "stopClicked",
  "started",
  "completed",
  "startTickingRequested",
  "stopTickingRequested",
  "timerTicked",
  "timeUp",
  "setBlackScreenRequested",
  "enterFullScreenRequested",
  "exitFullScreenRequested",
  "loadAudioRequested",
  "playBeginningGongRequested",
  "playEndGongRequested",
  "stopGongRequested",
  "requestWakeLockRequested",
  "releaseWakeLockRequested",
] as const;

type Events = ComponentEventsContract<
  typeof eventNames,
  {
    started: { currentTimeInSeconds: number };
    timerTicked: { currentTimeInSeconds: number };
    setBlackScreenRequested: { shouldBeVisible: boolean };
  }
>;

const effects = {
  startClicked: ["started"],
  startTickingRequested: ["timerTicked"],
  stopTickingRequested: [],
  loadAudioRequested: [],
  playBeginningGongRequested: [],
  playEndGongRequested: [],
  stopGongRequested: [],
  releaseWakeLockRequested: [],
  requestWakeLockRequested: [],
  enterFullScreenRequested: [],
  exitFullScreenRequested: [],
} satisfies EffectsDef<typeof eventNames>;

export type TimerContract = {
  state: State;
  events: Events;
  values: ExtractComponentValuesContract<typeof selectors>;
  children: Children;
  effects: typeof effects;
};
// Component definition
export const timerComponentDef: ComponentDef<TimerContract> = {
  initialState,
  selectors,
  uiEvents: ["startClicked", "stopClicked"],
  updaters: {
    started: ({ state, payload: { currentTimeInSeconds }, children }) => {
      state.isReadyToStart = false;
      state.startedTimeInSeconds = currentTimeInSeconds;
      state.remainingTimeInSeconds =
        children.settings["0"].selectors.durationInMinutes() * 60;
    },
    completed: ({ state }) => {
      state.startedTimeInSeconds = 0;
      state.remainingTimeInSeconds = 0;
    },
    stopClicked: ({ state }) => {
      state.isReadyToStart = true;
    },
    timerTicked: ({
      state,
      payload: { currentTimeInSeconds },
      selectors: { durationInSeconds },
    }) => {
      const elapsedTimeInSeconds =
        currentTimeInSeconds - state.startedTimeInSeconds;
      state.remainingTimeInSeconds = durationInSeconds() - elapsedTimeInSeconds;
    },
  },
  eventForwarders: [
    {
      from: "stopClicked",
      to: "completed",
    },
    {
      from: "timeUp",
      to: "completed",
    },
    {
      from: "started",
      to: "loadAudioRequested",
    },
    {
      from: "started",
      to: "startTickingRequested",
    },
    {
      from: "started",
      to: "requestWakeLockRequested",
    },
    {
      from: "started",
      to: "enterFullScreenRequested",
    },
    {
      from: "started",
      to: "playBeginningGongRequested",
      onCondition: ({ selectors }) => selectors.isGongOn(),
    },
    {
      from: "completed",
      to: "stopTickingRequested",
    },
    {
      from: "completed",
      to: "releaseWakeLockRequested",
    },
    {
      from: "stopClicked",
      to: "exitFullScreenRequested",
    },
    {
      from: "timeUp",
      to: "playEndGongRequested",
      onCondition: ({ selectors }) => selectors.isGongOn(),
    },
    {
      from: "stopClicked",
      to: "stopGongRequested",
    },
    {
      from: "timerTicked",
      to: "timeUp",
      onCondition: ({ selectors }) => selectors.isRemainingTimeZero(),
    },
  ],
  childrenComponents: {
    settings: settingsComponentDef,
  },
  effects,
};
