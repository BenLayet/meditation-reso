import type {
  ComponentDef,
  ComponentEventsContract,
  EffectsDef,
  ExtractComponentValuesContract,
} from "@softer-components/types";
import { formatSeconds } from "../../util/duration.functions";
import { flow } from "lodash";
import type { Settings } from "../../domain/settings";
import NoSleep from "nosleep.js";
import { GongService } from "../../services/gong.service";
const noSleep = new NoSleep();
const gongService = new GongService();
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
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  children: {};
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
        state.remainingTimeInSeconds--;
      },
      exitConfirmed: () => initialState,
      loadAudioRequested: () => {
        gongService.loadAudio();
      },
      playBeginningGongRequested: () => {
        gongService.playBeginningAudio();
      },
      playEndGongRequested: () => {
        gongService.playEndAudio();
      },
      stopGongRequested: () => {
        gongService.stopAllAudio();
      },
      requestWakeLockRequested: () => {
        noSleep.enable();
      },
      releaseWakeLockRequested: () => {
        //noSleep.disable();
      },
      enterFullScreenRequested: () => {
        // TODO Make this work in effects
        // iOS Safari needs a small delay to work reliably on first attempt
        setTimeout(() => {
          document.documentElement.requestFullscreen().catch((err: unknown) => {
            console.error("Fullscreen failed:", err);
          });
        }, 200);
        document.documentElement.requestFullscreen().catch((err: unknown) => {
          console.error("Fullscreen failed:", err);
        });
      },
      exitFullScreenRequested: () => {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch((err: unknown) => {
            console.error("Exit fullscreen failed:", err);
          });
        }
      },
    },
    eventForwarders: [
      {
        from: "initialize",
        to: "requestWakeLockRequested",
      },
      {
        from: "initialize",
        to: "loadAudioRequested",
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
