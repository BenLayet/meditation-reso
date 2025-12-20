import type {
  ChildrenValues,
  ComponentDef,
  ComponentEventsContract,
  EffectsDef,
  ExtractComponentValuesContract,
} from "@softer-components/types";
import { formatSeconds } from "../../util/duration.functions";
import { settingsComponentDef } from "./settings/settings.component";
import type { SettingsContract } from "./settings/settings.component";
import { flow } from "lodash";

type Phase = "SETTINGS" | "PREPARATION" | "MEDITATION" | "COMPLETED";

// Initial state definition
const initialState = {
  phase: "SETTINGS" as Phase,
  remainingTimeInSeconds: 0,
};
type State = typeof initialState;
//children
type Children = {
  settings: SettingsContract;
};

//selectors
const phase = (state: State) => state.phase;
const isSettingsPhase = flow(phase, p => p === "SETTINGS");
const isMeditationPhase = flow(phase, p => p === "MEDITATION");
const isPreparationPhase = flow(phase, p => p === "PREPARATION");
const isCompletedPhase = flow(phase, p => p === "COMPLETED");
const isNotCompletedPhase = flow(isCompletedPhase, b => !b);
const isNotSettingsPhase = flow(isSettingsPhase, b => !b);
const canBeStarted = isSettingsPhase;
const canBeStopped = isNotSettingsPhase;
const remainingTime = (state: State) =>
  formatSeconds(state.remainingTimeInSeconds);
const durationInSeconds = (_: State, children: ChildrenValues<Children>) =>
  children.settings["0"].selectors.durationInSeconds();
const preparationDurationInSeconds = (
  _: State,
  children: ChildrenValues<Children>,
) => children.settings["0"].selectors.preparationDurationInSeconds();
const isPreparationNeccessary = flow(preparationDurationInSeconds, t => t > 0);
const isGongOn = (_: State, children: ChildrenValues<Children>) =>
  children.settings["0"].selectors.isGongOn();
const remainingTimeInSeconds = (state: State) => state.remainingTimeInSeconds;
const isRemainingTimeZero = (state: State) => state.remainingTimeInSeconds <= 0;

const selectors = {
  isSettingsPhase,
  isNotSettingsPhase,
  isMeditationPhase,
  isPreparationPhase,
  remainingTime,
  durationInSeconds,
  isGongOn,
  remainingTimeInSeconds,
  isRemainingTimeZero,
  canBeStarted,
  canBeStopped,
  preparationDurationInSeconds,
  isPreparationNeccessary,
  isNotCompletedPhase,
  isCompletedPhase,
};

type eventNames =
  "startClicked"|
  "stopClicked"|
  "sessionInterrupted"|
  "preparationStarted"|
  "preparationCompleted"|
  "started"|
  "startTickingRequested"|
  "stopTickingRequested"|
  "timerTicked"|
  "completed"|
  "enterFullScreenRequested"|
  "exitFullScreenRequested"|
  "loadAudioRequested"|
  "playBeginningGongRequested"|
  "playEndGongRequested"|
  "stopGongRequested"|
  "requestWakeLockRequested"|
  "releaseWakeLockRequested";

type Events = ComponentEventsContract<eventNames>;

const effects = {
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
} satisfies EffectsDef<eventNames>;

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
    preparationStarted: ({
      state,
      selectors: { preparationDurationInSeconds },
    }) => {
      state.phase = "PREPARATION";
      state.remainingTimeInSeconds = preparationDurationInSeconds();
    },
    started: ({ state, selectors: { durationInSeconds } }) => {
      state.phase = "MEDITATION";
      state.remainingTimeInSeconds = durationInSeconds();
    },
    completed: ({ state }) => {
      state.phase = "COMPLETED";
      state.remainingTimeInSeconds = 0;
    },
    stopClicked: ({ state }) => {
      state.phase = "SETTINGS";
    },
    timerTicked: ({ state }) => {
      state.remainingTimeInSeconds--;
    },
  },
  eventForwarders: [
    {
      from: "startClicked",
      to: "startTickingRequested",
    },
    {
      from: "startClicked",
      to: "preparationStarted",
      onCondition: ({ selectors }) => selectors.isPreparationNeccessary(),
    },
    {
      from: "startClicked",
      to: "started",
      onCondition: ({ selectors }) => !selectors.isPreparationNeccessary(),
    },
    {
      from: "timerTicked",
      to: "preparationCompleted",
      onCondition: ({ selectors }) =>
        selectors.isPreparationPhase() && selectors.isRemainingTimeZero(),
    },
    {
      from: "preparationCompleted",
      to: "started",
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
      from: "timerTicked",
      to: "completed",
      onCondition: ({ selectors }) =>
        selectors.isMeditationPhase() && selectors.isRemainingTimeZero(),
    },
    {
      from: "stopClicked",
      to: "sessionInterrupted",
      onCondition: ({ selectors }) => selectors.isNotCompletedPhase(),
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
      to: "playEndGongRequested",
      onCondition: ({ selectors }) => selectors.isGongOn(),
    },
    {
      from: "sessionInterrupted",
      to: "releaseWakeLockRequested",
    },
    {
      from: "sessionInterrupted",
      to: "stopTickingRequested",
    },
    {
      from: "stopClicked",
      to: "exitFullScreenRequested",
    },
    {
      from: "stopClicked",
      to: "stopGongRequested",
    },
  ],
  childrenComponents: {
    settings: settingsComponentDef,
  },
  effects,
};
