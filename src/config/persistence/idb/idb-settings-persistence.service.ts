import type { Settings } from "../../../domain/settings.ts";
import type { SettingsPersistenceService } from "../../../services/settings-persistence.service.ts";
import type { IDBPDatabase } from "idb";
import { openDB } from "idb";
import { assertIsNotUndefined } from "../../../util/assert.functions.ts";
let db: IDBPDatabase | undefined;
const init = async () => {
  db = await openDB("app-db", 1, {
    upgrade(db) {
      db.createObjectStore("settings");
    },
  });
};

export const idbSettingsPersistenceService =
  (): SettingsPersistenceService => ({
    saveSettings: async (settings: Settings) => {
      if (!db) {
        await init();
      }
      assertIsNotUndefined(db);
      await db.put("settings", settings, "meditation-settings");
    },
    loadSettings: async (): Promise<Settings | null> => {
      if (!db) {
        await init();
      }
      assertIsNotUndefined(db);
      const settings = (await db.get("settings", "meditation-settings")) as
        | Settings
        | undefined;
      return settings ?? null;
    },
  });
