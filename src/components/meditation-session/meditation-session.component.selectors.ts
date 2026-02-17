//selectors
import { flow } from "lodash";
import { formatSeconds } from "../../util/duration.functions.ts";
import { State } from "./meditation-session.component.state.ts";
import type { ExtractComponentValuesContract } from "@softer-components/types";

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

export const selectors = {
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
export type Values = ExtractComponentValuesContract<typeof selectors>;
