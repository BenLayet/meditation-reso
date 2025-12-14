import {
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
  isRunning: false,
  remainingTimeInSeconds: 0,
  isBlackScreenVisible: false,
};
type State = typeof initialState;
//children
type Children = {
  settings: SettingsContract;
};

//selectors
const selectors = {
  startedTimeInSeconds: (state: State) => state.startedTimeInSeconds,
  isRunning: (state: State) => state.isRunning,
  areSettingsVisible: (state: State) => !state.isRunning,
  isProgressVisible: (state: State) => state.isRunning,
  remainingTime: (state: State) => formatSeconds(state.remainingTimeInSeconds),
  durationInSeconds: (_: State, children) =>
    children.settings["0"].selectors.durationInMinutes() * 60,
  isGongOn: (_: State, children) => children.settings["0"].selectors.isGongOn(),
  remainingTimeInSeconds: (state: State) => state.remainingTimeInSeconds,
  isRemainingTimeZero: (state: State) => state.remainingTimeInSeconds <= 0,
  canBeStopped: (state: State) => state.isRunning,
  isReadyToStart: (state: State) => !state.isRunning,
  isBlackScreenVisible: (state: State) => state.isBlackScreenVisible,
} satisfies Selectors<State, Children>;

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
      state.isRunning = true;
      state.startedTimeInSeconds = currentTimeInSeconds;
      state.remainingTimeInSeconds =
        children.settings["0"].selectors.durationInMinutes() * 60;
    },
    completed: ({ state }) => {
      state.isRunning = false;
      state.startedTimeInSeconds = 0;
      state.remainingTimeInSeconds = 0;
    },
    setBlackScreenRequested: ({ state, payload: { shouldBeVisible } }) => {
      state.isBlackScreenVisible = shouldBeVisible;
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
    timeUp: ({ state }) => {
      state.isRunning = false;
      state.startedTimeInSeconds = 0;
      state.remainingTimeInSeconds = 0;
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
      from: "completed",
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
