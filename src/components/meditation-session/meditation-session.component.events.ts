import type { EventsContract } from "@softer-components/types";
import type { Settings } from "../../domain/settings.ts";

export const uiEvents = ["backClicked"] as const;

export const allEvents = [
  ...uiEvents,
  "initialize",
  "startTickingRequested",
  "stopTickingRequested",
  "timerTicked",
  "loadAudioRequested",
  "playBeginningGongRequested",
  "playEndGongRequested",
  "stopGongRequested",
  "requestWakeLockRequested",
  "releaseWakeLockRequested",
  "enterFullScreenRequested",
  "exitFullScreenRequested",
  "preparationStarted",
  "preparationInterrupted",
  "preparationCompleted",
  "actualMeditationInterrupted",
  "actualMeditationStarted",
  "actualMeditationCompleted",
  "exitRequested",
  "exitConfirmed",
] as const;

export type Events = EventsContract<
  typeof allEvents,
  { initialize: Settings; preparationStarted: { preparationInSeconds: number } },
  typeof uiEvents
>;
