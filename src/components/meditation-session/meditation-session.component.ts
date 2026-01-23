import type {
  ComponentDef,
  ComponentEventsContract,
  EffectsDef,
  ExtractComponentValuesContract,
} from "@softer-components/types";
import { formatSeconds } from "../../util/duration.functions";
import { flow } from "lodash";
import { Settings } from "../../domain/settings";

type Phase = "INITIALIZING" | "PREPARATION" | "MEDITATION" | "COMPLETED";

const initialState = {
  phase: "INITIALIZING" as Phase,
  durationInSeconds: 0,
  remainingTimeInSeconds: 0,
  isGongOn: false,
  shouldDisplayRemainingTime: false,
  shouldDisplayProgress: false,
};

// Initial state definition
type State = typeof initialState;
//children
type Children = {};
//selectors
const durationInSeconds = (state: State) => state.durationInSeconds;
const phase = (state: State) => state.phase;
const isPreparationPhase = flow(phase, p => p === "PREPARATION");
const isMeditationPhase = flow(phase, p => p === "MEDITATION");
const isCompletedPhase = flow(phase, p => p === "COMPLETED");
const isNotCompletedPhase = flow(isCompletedPhase, b => !b);
const remainingTime = (state: State) =>
  formatSeconds(state.remainingTimeInSeconds);
const isGongOn = (state: State) => state.isGongOn;
const shouldDisplayRemainingTime = (state: State) =>
  state.shouldDisplayRemainingTime;
const shouldDisplayProgress = (state: State) => state.shouldDisplayProgress;
const remainingTimeInSeconds = (state: State) => state.remainingTimeInSeconds;
const isRemainingTimeZero = (state: State) => state.remainingTimeInSeconds <= 0;

const selectors = {
  isMeditationPhase,
  isPreparationPhase,
  remainingTime,
  durationInSeconds,
  isGongOn,
  shouldDisplayProgress,
  shouldDisplayRemainingTime,
  remainingTimeInSeconds,
  isRemainingTimeZero,
  isNotCompletedPhase,
  isCompletedPhase,
};

type EventNames =
  | "initialize"
  | "startTickingRequested"
  | "stopTickingRequested"
  | "timerTicked"
  | "loadAudioRequested"
  | "playBeginningGongRequested"
  | "playEndGongRequested"
  | "stopGongRequested"
  | "requestWakeLockRequested"
  | "releaseWakeLockRequested"
  | "enterFullScreenRequested"
  | "exitFullScreenRequested"
  | "preparationStarted"
  | "preparationInterrupted"
  | "preparationCompleted"
  | "actualMeditationInterrupted"
  | "actualMeditationStarted"
  | "actualMeditationCompleted"
  | "backClicked"
  | "exitRequested"
  | "exitConfirmed";

type Events = ComponentEventsContract<
  EventNames,
  { initialize: Settings; preparationStarted: { preparationInSeconds: number } }
>;

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
  exitRequested: ["exitConfirmed"],
} satisfies EffectsDef<EventNames>;

export type MeditationSessionContract = {
  state: State;
  events: Events;
  values: ExtractComponentValuesContract<typeof selectors>;
  children: Children;
  effects: typeof effects;
};
// Component definition
export const meditationSessionComponentDef: ComponentDef<MeditationSessionContract> =
  {
    initialState,
    selectors,
    uiEvents: ["backClicked"],
    updaters: {
      initialize: ({ payload: settings, state }) => {
        state.isGongOn = settings.isGongOn;
        state.shouldDisplayRemainingTime = settings.shouldDisplayRemainingTime;
        state.shouldDisplayProgress = settings.shouldDisplayProgress;
        state.durationInSeconds = settings.durationInMinutes * 60;
      },
      preparationStarted: ({ state, payload: { preparationInSeconds } }) => {
        state.phase = "PREPARATION";
        state.remainingTimeInSeconds = preparationInSeconds;
      },
      actualMeditationStarted: ({ state, values: { durationInSeconds } }) => {
        state.phase = "MEDITATION";
        state.remainingTimeInSeconds = durationInSeconds();
      },
      actualMeditationCompleted: ({ state }) => {
        state.phase = "COMPLETED";
        state.remainingTimeInSeconds = 0;
      },
      timerTicked: ({ state }) => {
        if (!state) return initialState;
        state.remainingTimeInSeconds--;
      },
    },
    eventForwarders: [
      {
        from: "initialize",
        to: "loadAudioRequested",
      },
      {
        from: "initialize",
        to: "requestWakeLockRequested",
      },
      {
        from: "initialize",
        to: "enterFullScreenRequested",
      },
      {
        from: "initialize",
        to: "preparationStarted",
        onCondition: ({ payload }) => payload.preparationInSeconds > 0,
      },
      {
        from: "backClicked",
        to: "preparationInterrupted",
        onCondition: ({ values }) => values.isPreparationPhase(),
      },
      {
        from: "timerTicked",
        to: "preparationCompleted",
        onCondition: ({ values }) =>
          values.isPreparationPhase() && values.isRemainingTimeZero(),
      },
      {
        from: "preparationCompleted",
        to: "actualMeditationStarted",
      },
      {
        from: "initialize",
        to: "actualMeditationStarted",
        onCondition: ({ payload }) => payload.preparationInSeconds === 0,
      },
      {
        from: "initialize",
        to: "startTickingRequested",
      },
      {
        from: "actualMeditationStarted",
        to: "playBeginningGongRequested",
        onCondition: ({ values }) => values.isGongOn(),
      },
      {
        from: "timerTicked",
        to: "actualMeditationCompleted",
        onCondition: ({ values }) =>
          values.isMeditationPhase() && values.isRemainingTimeZero(),
      },
      {
        from: "backClicked",
        to: "actualMeditationInterrupted",
        onCondition: ({ values }) => values.isMeditationPhase(),
      },
      {
        from: "actualMeditationCompleted",
        to: "stopTickingRequested",
      },
      {
        from: "actualMeditationCompleted",
        to: "playEndGongRequested",
        onCondition: ({ values }) => values.isGongOn(),
      },
      { from: "backClicked", to: "exitRequested" },
      {
        from: "exitRequested",
        to: "releaseWakeLockRequested",
      },
      {
        from: "actualMeditationInterrupted",
        to: "stopTickingRequested",
      },
      {
        from: "preparationInterrupted",
        to: "stopTickingRequested",
      },
      {
        from: "exitRequested",
        to: "exitFullScreenRequested",
      },
      {
        from: "exitRequested",
        to: "stopGongRequested",
      },
    ],
    effects,
  };
