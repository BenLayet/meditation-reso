import type { Settings } from "../../domain/settings.ts";
import type { SettingsPersistenceService } from "../../services/settings-persistence.service.ts";

export const localstorageSettingsPersistenceService =
  (): SettingsPersistenceService => ({
    saveSettings: (settings: Settings) => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem("settings", JSON.stringify(settings));
        }
      } catch (err) {
        // ignore storage errors (private mode, quota, etc.)
        console.debug("localstorage.saveSettings failed", err);
      }
      return Promise.resolve();
    },

    loadSettings: (): Promise<Settings | null> => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const v = window.localStorage.getItem("settings");
          if (v) {
            try {
              return Promise.resolve(JSON.parse(v) as Settings);
            } catch (err) {
              console.debug("localstorage.loadSettings JSON parse failed", err);
              return Promise.resolve(null);
            }
          }
        }
      } catch (err) {
        console.debug("localstorage.loadSettings failed", err);
      }
      return Promise.resolve(null);
    },
  });
