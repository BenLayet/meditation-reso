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
const settingsValues = (_: State, childrenValues: ChildrenValues<Children>) =>
  childrenValues.settings.values;
const durationInSeconds = flow(settingsValues, values =>
  values.durationInSeconds(),
);
const preparationDurationInSeconds = flow(settingsValues, values =>
  values.preparationDurationInSeconds(),
);
const isPreparationNecessary = flow(preparationDurationInSeconds, t => t > 0);
const isGongOn = flow(settingsValues, values => values.isGongOn());
const shouldDisplayRemainingTime = flow(settingsValues, values =>
  values.shouldDisplayRemainingTime(),
);
const shouldDisplayProgress = flow(settingsValues, values =>
  values.shouldDisplayProgress(),
);
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
  shouldDisplayProgress,
  shouldDisplayRemainingTime,
  remainingTimeInSeconds,
  isRemainingTimeZero,
  canBeStarted,
  canBeStopped,
  preparationDurationInSeconds,
  isPreparationNecessary,
  isNotCompletedPhase,
  isCompletedPhase,
};

type EventNames =
  | "startClicked"
  | "stopClicked"
  | "sessionInterrupted"
  | "preparationStarted"
  | "preparationCompleted"
  | "started"
  | "startTickingRequested"
  | "stopTickingRequested"
  | "timerTicked"
  | "completed"
  | "enterFullScreenRequested"
  | "exitFullScreenRequested"
  | "loadAudioRequested"
  | "playBeginningGongRequested"
  | "playEndGongRequested"
  | "stopGongRequested"
  | "requestWakeLockRequested"
  | "releaseWakeLockRequested";

type Events = ComponentEventsContract<EventNames>;

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
} satisfies EffectsDef<EventNames>;

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
      values: { preparationDurationInSeconds },
    }) => {
      state.phase = "PREPARATION";
      state.remainingTimeInSeconds = preparationDurationInSeconds();
    },
    started: ({ state, values: { durationInSeconds } }) => {
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
      to: "loadAudioRequested",
    },
    {
      from: "startClicked",
      to: "requestWakeLockRequested",
    },
    {
      from: "startClicked",
      to: "enterFullScreenRequested",
    },
    {
      from: "startClicked",
      to: "startTickingRequested",
    },
    {
      from: "startClicked",
      to: "preparationStarted",
      onCondition: ({ values }) => values.isPreparationNecessary(),
    },
    {
      from: "startClicked",
      to: "started",
      onCondition: ({ values }) => !values.isPreparationNecessary(),
    },
    {
      from: "timerTicked",
      to: "preparationCompleted",
      onCondition: ({ values }) =>
        values.isPreparationPhase() && values.isRemainingTimeZero(),
    },
    {
      from: "preparationCompleted",
      to: "started",
    },
    {
      from: "started",
      to: "playBeginningGongRequested",
      onCondition: ({ values }) => values.isGongOn(),
    },
    {
      from: "timerTicked",
      to: "completed",
      onCondition: ({ values }) =>
        values.isMeditationPhase() && values.isRemainingTimeZero(),
    },
    {
      from: "stopClicked",
      to: "sessionInterrupted",
      onCondition: ({ values }) => values.isNotCompletedPhase(),
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
      onCondition: ({ values }) => values.isGongOn(),
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
  childrenComponentDefs: {
    settings: settingsComponentDef,
  },
  effects,
};
