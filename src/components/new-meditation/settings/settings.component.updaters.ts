import type { StateUpdaters } from "@softer-components/types";
import { Contract } from "./settings.component.contract.ts";
import { State } from "./settings.component.state.ts";
import { defaultSettings } from "../../../domain/settings.ts";

export const stateUpdaters: StateUpdaters<Contract, State> = {
  setDurationInMinutesRequested: ({ state, payload: durationInMinutes }) => {
    state.settings.durationInMinutes = durationInMinutes;
  },
  setPreparationInSecondsRequested: ({
    state,
    payload: preparationInSeconds,
  }) => {
    state.settings.preparationInSeconds = preparationInSeconds;
  },
  settingsChanged: ({ state, payload: settings }) => {
    state.settings = settings;
  },
  isGongOnChanged: ({ state, payload: isGongOn }) => {
    state.settings.isGongOn = isGongOn;
  },
  shouldDisplayProgressChanged: ({ state, payload: shouldDisplayProgress }) => {
    state.settings.shouldDisplayProgress = shouldDisplayProgress;
  },
  shouldDisplayRemainingTimeChanged: ({
    state,
    payload: shouldDisplayRemainingTime,
  }) => {
    state.settings.shouldDisplayRemainingTime = shouldDisplayRemainingTime;
  },
  saveSettingsRequested: ({ state }) => {
    delete state.errors.SAVE_FAILED;
    state.isSaving = true;
  },
  saveSettingsSucceeded: ({ state }) => {
    state.isSaving = false;
  },
  saveSettingsFailed: ({ state }) => {
    state.errors.SAVE_FAILED = true;
    state.isSaving = false;
  },
  loadSettingsRequested: ({ state }) => {
    delete state.errors.LOAD_FAILED;
    state.isLoading = true;
  },
  loadSettingsSucceeded: ({ state, payload: settings }) => {
    state.settings = { ...defaultSettings, ...settings };
  },
  loadSettingsFailed: ({ state }) => {
    state.errors.LOAD_FAILED = true;
  },
  loadSettingsCompleted: ({ state }) => {
    state.isLoading = false;
  },
};
