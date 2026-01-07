import type { Settings } from "../../domain/settings.ts";
import type { SettingsPersistenceService } from "../../services/settings-persistence.service.ts";
import { openDB } from "idb";

const db = await openDB("app-db", 1, {
  upgrade(db) {
    db.createObjectStore("settings");
  },
});

export const idbSettingsPersistenceService =
  (): SettingsPersistenceService => ({
    saveSettings: async (settings: Settings) => {
      await db.put("settings", settings, "meditation-settings");
    },
    loadSettings: (): Promise<Settings | null> =>
      db.get("settings", "meditation-settings"),
  });
