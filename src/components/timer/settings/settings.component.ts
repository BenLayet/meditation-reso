import {
  ComponentDef,
  ExtractComponentValuesContract,
} from "@softer-components/types";
import {
  calculateDecrementedDuration,
  calculateIncrementedDuration,
  formatSeconds,
} from "../../../util/duration.functions";
import { Settings } from "../../../domain/settings";

type Error = "LOAD_FAILED" | "SAVE_FAILED";
type ErrorMessage = string;
const DURATION_INCREMENT_MINUTES = 5;
const DEFAULT_DURATION_MINUTES = 20;

// Initial state definition
const initialState = {
  isLoading: false,
  isSaving: false,
  settings: {
    durationInMinutes: DEFAULT_DURATION_MINUTES,
    isGongOn: true,
  } as Settings,
  errors: {} as { [errorName in Error]: ErrorMessage },
};
type State = typeof initialState;

//selectors
const selectors = {
  isLoadingNeeded: (state: State) => !state.isLoading,
  settings: (state: State) => state.settings,
  durationInMinutes: (state: State) => state.settings.durationInMinutes,
  duration: (state: State) =>
    formatSeconds(state.settings.durationInMinutes * 60),
  isGongOn: (state: State) => state.settings.isGongOn,
  isBlackScreenOn: (state: State) => state.settings.isBlackScreenOn,
  hasLoadError: (state: State) => !!state.errors["LOAD_FAILED"],
  hasSaveError: (state: State) => !!state.errors["SAVE_FAILED"],
};

// Events type declaration
type Events = {
  plusClicked: { payload: undefined };
  minusClicked: { payload: undefined };
  settingsChanged: {
    payload: Settings;
  };
  setDurationInMinutesRequested: { payload: number };
  isGongOnChanged: { payload: boolean };
  saveSettingsRequested: {
    payload: Settings;
    canTrigger: ["saveSettingsSucceeded", "saveSettingsFailed"];
  };
  saveSettingsFailed: { payload: ErrorMessage };
  saveSettingsSucceeded: { payload: undefined };
  loadSettingsRequested: {
    payload: undefined;
    canTrigger: [
      "loadSettingsSucceeded",
      "loadSettingsFailed",
      "loadSettingsCompleted",
    ];
  };
  loadSettingsFailed: { payload: ErrorMessage };
  loadSettingsSucceeded: { payload: Settings };
  loadSettingsCompleted: { payload: undefined };
  displayed: { payload: undefined };
};

export type SettingsContract = {
  state: typeof initialState;
  events: Events;
  values: ExtractComponentValuesContract<typeof selectors>;
  children: {};
};
// Component definition
export const settingsComponentDef: ComponentDef<SettingsContract> = {
  initialState,
  selectors,
  uiEvents: ["minusClicked", "plusClicked", "isGongOnChanged", "displayed"],
  updaters: {
    setDurationInMinutesRequested: ({ state, payload: durationInMinutes }) => {
      state.settings.durationInMinutes = durationInMinutes;
    },
    isGongOnChanged: ({ state, payload: isGongOn }) => {
      state.settings.isGongOn = isGongOn;
    },
    saveSettingsRequested: ({ state }) => {
      state.isSaving = true;
    },
    saveSettingsSucceeded: ({ state }) => {
      state.errors["SAVE_FAILED"] = "";
      state.isSaving = false;
    },
    saveSettingsFailed: ({ state, payload: errorMessage }) => {
      state.errors["SAVE_FAILED"] = errorMessage;
      state.isSaving = false;
    },
    loadSettingsRequested: ({ state }) => {
      state.isLoading = true;
    },
    loadSettingsSucceeded: ({ state, payload: settings }) => {
      state.settings = settings;
      state.errors["LOAD_FAILED"] = "";
    },
    loadSettingsFailed: ({ state, payload: errorMessage }) => {
      state.errors["LOAD_FAILED"] = errorMessage;
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
      from: "plusClicked",
      to: "setDurationInMinutesRequested",
      withPayload: ({ selectors }) =>
        calculateIncrementedDuration(
          selectors.durationInMinutes(),
          DURATION_INCREMENT_MINUTES,
        ),
    },
    {
      from: "minusClicked",
      to: "setDurationInMinutesRequested",
      withPayload: ({ selectors }) =>
        calculateDecrementedDuration(
          selectors.durationInMinutes(),
          DURATION_INCREMENT_MINUTES,
        ),
    },
    {
      from: "isGongOnChanged",
      to: "settingsChanged",
      withPayload: ({ selectors }: { selectors: any }) => selectors.settings(), // TODO
    },
    {
      from: "setDurationInMinutesRequested",
      to: "settingsChanged",
      withPayload: ({ selectors }) => selectors.settings(),
    },
    { from: "settingsChanged", to: "saveSettingsRequested" },
  ],
  effects: {
    loadSettingsRequested: [
      "loadSettingsSucceeded",
      "loadSettingsFailed",
      "loadSettingsCompleted",
    ],
    saveSettingsRequested: ["saveSettingsSucceeded", "saveSettingsFailed"],
  },
};
