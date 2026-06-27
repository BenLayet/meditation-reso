import type { EventForwarders } from "@softer-components/types";
import { Contract } from "./meditation-session.component.contract.ts";

export const eventForwarders = {
  internal: [
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
} satisfies EventForwarders<Contract>;
