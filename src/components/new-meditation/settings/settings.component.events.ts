import type { EventsContract } from "@softer-components/types";
import type { Settings } from "../../../domain/settings.ts";

export const uiEvents = [
  "incrementDurationClicked",
  "decrementDurationClicked",
  "incrementPreparationClicked",
  "decrementPreparationClicked",
  "isGongOnChanged",
  "displayed",
  "shouldDisplayRemainingTimeChanged",
  "shouldDisplayProgressChanged",
] as const;

export const allEvents = [
  ...uiEvents,
  "settingsChanged",
  "setDurationInMinutesRequested",
  "setPreparationInSecondsRequested",
  "saveSettingsRequested",
  "saveSettingsFailed",
  "saveSettingsSucceeded",
  "loadSettingsRequested",
  "loadSettingsFailed",
  "loadSettingsSucceeded",
  "loadSettingsCompleted",
] as const;

export type Events = EventsContract<
  typeof allEvents,
  {
    settingsChanged: Settings;
    setDurationInMinutesRequested: number;
    setPreparationInSecondsRequested: number;
    isGongOnChanged: boolean;
    shouldDisplayProgressChanged: boolean;
    shouldDisplayRemainingTimeChanged: boolean;
    saveSettingsRequested: Settings;
    loadSettingsSucceeded: Settings;
  },
  typeof uiEvents
>;
