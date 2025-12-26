import type {
  ComponentContract,
  ComponentDef,
  ComponentEventsContract,
  EffectsDef,
  ExtractComponentValuesContract,
} from "@softer-components/types";
import { formatSeconds } from "../../../util/duration.functions";
import type { Settings } from "../../../domain/settings";
import { defaultSettings } from "../../../domain/settings";
import { flow } from "lodash";
import {
  durationIncrementer,
  preparationIncrementer,
} from "../../../domain/incrementer";

type Error = "LOAD_FAILED" | "SAVE_FAILED";

// Initial state definition
const initialState = {
  isLoading: false,
  isSaving: false,
  settings: defaultSettings,
  errors: {} as Partial<Record<Error, true>>,
};
type State = typeof initialState;

//selectors
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
const selectors = {
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

//Events
type EventNames =
  | "incrementDurationClicked"
  | "decrementDurationClicked"
  | "incrementPreparationClicked"
  | "decrementPreparationClicked"
  | "settingsChanged"
  | "setDurationInMinutesRequested"
  | "setPreparationInSecondsRequested"
  | "isGongOnChanged"
  | "shouldDisplayProgressChanged"
  | "shouldDisplayRemainingTimeChanged"
  | "saveSettingsRequested"
  | "saveSettingsFailed"
  | "saveSettingsSucceeded"
  | "loadSettingsRequested"
  | "loadSettingsFailed"
  | "loadSettingsSucceeded"
  | "loadSettingsCompleted"
  | "displayed";

type Events = ComponentEventsContract<
  EventNames,
  {
    settingsChanged: Settings;
    setDurationInMinutesRequested: number;
    setPreparationInSecondsRequested: number;
    isGongOnChanged: boolean;
    shouldDisplayProgressChanged: boolean;
    shouldDisplayRemainingTimeChanged: boolean;
    saveSettingsRequested: Settings;
    loadSettingsSucceeded: Settings;
  }
>;

const effects = {
  loadSettingsRequested: [
    "loadSettingsSucceeded",
    "loadSettingsFailed",
    "loadSettingsCompleted",
  ],
  saveSettingsRequested: ["saveSettingsSucceeded", "saveSettingsFailed"],
} satisfies EffectsDef<EventNames>;

export type SettingsContract = {
  state: typeof initialState;
  events: Events;
  values: ExtractComponentValuesContract<typeof selectors>;
  children: Record<string, ComponentContract>;
  effects: typeof effects;
};
// Component definition
export const settingsComponentDef: ComponentDef<SettingsContract> = {
  initialState,
  selectors,
  uiEvents: [
    "incrementDurationClicked",
    "decrementDurationClicked",
    "incrementPreparationClicked",
    "decrementPreparationClicked",
    "isGongOnChanged",
    "displayed",
    "shouldDisplayRemainingTimeChanged",
    "shouldDisplayProgressChanged",
  ],
  updaters: {
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
    shouldDisplayProgressChanged: ({
      state,
      payload: shouldDisplayProgress,
    }) => {
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
  },
  eventForwarders: [
    {
      from: "displayed",
      to: "loadSettingsRequested",
      onCondition: ({ selectors }) => selectors.isLoadingNeeded(),
    },
    {
      from: "incrementDurationClicked",
      to: "setDurationInMinutesRequested",
      withPayload: ({ selectors }) =>
        durationIncrementer.incrementValue(selectors.durationInMinutes()),
    },
    {
      from: "decrementDurationClicked",
      to: "setDurationInMinutesRequested",
      withPayload: ({ selectors }) =>
        durationIncrementer.decrementValue(selectors.durationInMinutes()),
    },
    {
      from: "incrementPreparationClicked",
      to: "setPreparationInSecondsRequested",
      withPayload: ({ selectors }) =>
        preparationIncrementer.incrementValue(
          selectors.preparationDurationInSeconds(),
        ),
    },
    {
      from: "decrementPreparationClicked",
      to: "setPreparationInSecondsRequested",
      withPayload: ({ selectors }) =>
        preparationIncrementer.decrementValue(
          selectors.preparationDurationInSeconds(),
        ),
    },
    {
      from: "isGongOnChanged",
      to: "settingsChanged",
      withPayload: ({ selectors }) => selectors.settings(),
    },
    {
      from: "shouldDisplayRemainingTimeChanged",
      to: "settingsChanged",
      withPayload: ({ selectors }) => selectors.settings(),
    },
    {
      from: "shouldDisplayProgressChanged",
      to: "settingsChanged",
      withPayload: ({ selectors }) => selectors.settings(),
    },
    {
      from: "setDurationInMinutesRequested",
      to: "settingsChanged",
      withPayload: ({ selectors }) => selectors.settings(),
    },
    {
      from: "setPreparationInSecondsRequested",
      to: "settingsChanged",
      withPayload: ({ selectors }) => selectors.settings(),
    },
    { from: "settingsChanged", to: "saveSettingsRequested" },
  ],
  effects,
};
