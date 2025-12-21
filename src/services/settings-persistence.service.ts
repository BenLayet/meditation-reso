import type { Settings } from "../domain/settings.ts";

export type SettingsPersistenceService = {
  saveSettings(settings: Settings): Promise<void>;
  loadSettings(): Promise<Settings | null>;
};
