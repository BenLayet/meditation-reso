//selectors
import { State } from "./settings.component.state.ts";
import { flow } from "lodash";
import { formatSeconds } from "../../../util/duration.functions.ts";
import type { ExtractComponentValuesContract } from "@softer-components/types";

const isLoadingNeeded = (state: State) => !state.isLoading;
const settings = (state: State) => state.settings;
const durationInMinutes = (state: State) => state.settings.durationInMinutes;
const durationInSeconds = flow(durationInMinutes, minutes => minutes * 60);
const preparationDurationInSeconds = (state: State) =>
  state.settings.preparationInSeconds;
const duration = flow(durationInSeconds, formatSeconds);
const preparation = flow(preparationDurationInSeconds, formatSeconds);
const isGongOn = (state: State) => state.settings.isGongOn;
const shouldDisplayProgress = (state: State) =>
  state.settings.shouldDisplayProgress;
const shouldDisplayRemainingTime = (state: State) =>
  state.settings.shouldDisplayRemainingTime;
const hasLoadError = (state: State) => state.errors.LOAD_FAILED;
const hasSaveError = (state: State) => state.errors.SAVE_FAILED;
export const selectors = {
  isLoadingNeeded,
  settings,
  durationInMinutes,
  durationInSeconds,
  preparationDurationInSeconds,
  duration,
  preparation,
  isGongOn,
  shouldDisplayProgress,
  shouldDisplayRemainingTime,
  hasLoadError,
  hasSaveError,
};
export type Values = ExtractComponentValuesContract<typeof selectors>;
