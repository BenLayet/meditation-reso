import type { ComponentEventsContract } from "@softer-components/types";
import type { Settings } from "../../domain/settings.ts";

export type EventNames =
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

export type Events = ComponentEventsContract<
  EventNames,
  { initialize: Settings; preparationStarted: { preparationInSeconds: number } }
>;
export const uiEvents = ["backClicked"] satisfies EventNames[];
