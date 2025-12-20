import type { Effects } from "@softer-components/types";
import type { SettingsContract } from "./settings.component";
import { settingsPersistenceService } from "../../../services/settings-persistence.service";

export const settingsEffects: Effects<SettingsContract> = {
  loadSettingsRequested: async ({
    loadSettingsFailed,
    loadSettingsSucceeded,
    loadSettingsCompleted,
  }) => {
    try {
      const settings = await settingsPersistenceService.loadSettings();
      if (settings) {
        loadSettingsSucceeded(settings);
      }
    } catch (error: unknown) {
      loadSettingsFailed();
      console.error(error);
    }
    loadSettingsCompleted();
  },
  saveSettingsRequested: async (
    { saveSettingsFailed, saveSettingsSucceeded },
    { payload: settings },
  ) => {
    try {
      await settingsPersistenceService.saveSettings(settings);
      saveSettingsSucceeded();
    } catch (error: unknown) {
      saveSettingsFailed();
      console.error(error);
    }
  },
};
