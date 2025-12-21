import type { Settings } from "../../domain/settings.ts";
import type { SettingsPersistenceService } from "../../services/settings-persistence.service.ts";
import { postRequest } from "./iframe-messaging.service.ts";

export const iframeSettingsPersistenceService =
  (): SettingsPersistenceService => ({
    saveSettings: async (settings: Settings) => {
      const value = JSON.stringify(settings);
      await postRequest({ type: "set", key: "settings", value });
    },
    loadSettings: async (): Promise<Settings | null> => {
      const value = await postRequest<string>({ type: "get", key: "settings" });
      if (value) {
        return JSON.parse(value) as Settings;
      }
      return null;
    },
  });
