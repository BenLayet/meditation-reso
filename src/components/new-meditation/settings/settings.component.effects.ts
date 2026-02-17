// Effects
import { Effects } from "@softer-components/types";
import { Contract } from "./settings.component.contract.ts";
import { SettingsPersistenceService } from "../../../services/settings-persistence.service.ts";

export type Dependencies = {
  settingsPersistenceService: SettingsPersistenceService;
};

export const effects = ({
  settingsPersistenceService,
}: Dependencies): Effects<Contract> => ({
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
});
