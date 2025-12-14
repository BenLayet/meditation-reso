import { Effects } from "@softer-components/types";
import { SettingsContract } from "./settings.component";
import { settingsPersistenceService } from "../../../services/settings-persistence.service";

export const settingsEffects: Effects<SettingsContract> = {
  loadSettingsRequested: async ({
    loadSettingsFailed,
    loadSettingsSucceeded,
    loadSettingsCompleted,
  }) => {
    try {
      const settings = settingsPersistenceService.loadSettings();
      if (settings) {
        loadSettingsSucceeded(settings);
      }
    } catch (error: any) {
      loadSettingsFailed(
        error.message || "Failed to load settings from cookies.",
      );
    }
    loadSettingsCompleted();
  },
  saveSettingsRequested: async (
    { saveSettingsFailed, saveSettingsSucceeded },
    { payload: settings },
  ) => {
    try {
      settingsPersistenceService.saveSettings(settings);
      saveSettingsSucceeded();
    } catch (error: any) {
      saveSettingsFailed(
        error.message || "Failed to save settings to cookies.",
      );
    }
  },
};
