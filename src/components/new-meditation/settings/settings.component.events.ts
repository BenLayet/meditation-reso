//Events
import { EventsContract } from "@softer-components/types";
import { Settings } from "../../../domain/settings.ts";

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

export const uiEvents = [
  "incrementDurationClicked",
  "decrementDurationClicked",
  "incrementPreparationClicked",
  "decrementPreparationClicked",
  "isGongOnChanged",
  "displayed",
  "shouldDisplayRemainingTimeChanged",
  "shouldDisplayProgressChanged",
] satisfies EventNames[];

export type Events = EventsContract<
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
