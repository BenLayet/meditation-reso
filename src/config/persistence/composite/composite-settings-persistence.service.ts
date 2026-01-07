import type { Settings } from "../../../domain/settings.ts";
import type { SettingsPersistenceService } from "../../../services/settings-persistence.service.ts";

export const compositeSettingsPersistenceService = (
  settingsPersistenceServices: SettingsPersistenceService[],
): SettingsPersistenceService => ({
  saveSettings: (settings: Settings) => {
    settingsPersistenceServices.forEach(s => {
      s.saveSettings(settings);
    });
    return Promise.resolve();
  },

  async loadSettings(): Promise<Settings | null> {
    for (const service of settingsPersistenceServices) {
      const settings = await service.loadSettings();
      if (settings !== null) {
        return settings;
      }
    }
    return null;
  },
});
