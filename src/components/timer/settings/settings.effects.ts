import type { Effects } from "@softer-components/types";
import type { SettingsContract } from "./settings.component";
import { settingsPersistenceService } from "../../../services/settings-persistence.service";

export const settingsEffects: Effects<SettingsContract> = {
  loadSettingsRequested: ({
    loadSettingsFailed,
    loadSettingsSucceeded,
    loadSettingsCompleted,
  }) => {
    try {
      const settings = settingsPersistenceService.loadSettings();
      if (settings) {
        loadSettingsSucceeded(settings);
      }
    } catch (error: unknown) {
      loadSettingsFailed();
      console.error(error);
    }
    loadSettingsCompleted();
  },
  saveSettingsRequested: (
    { saveSettingsFailed, saveSettingsSucceeded },
    { payload: settings },
  ) => {
    try {
      settingsPersistenceService.saveSettings(settings);
      saveSettingsSucceeded();
    } catch (error: unknown) {
      saveSettingsFailed();
      console.error(error);
    }
  },
};
