import type { Settings } from "../../domain/settings.ts";
import type { CookieService } from "./cookie.service.ts";
import type { SettingsPersistenceService } from "../../services/settings-persistence.service.ts";

export const cookieSettingsPersistenceService = (
  cookieService: CookieService,
): SettingsPersistenceService => ({
  saveSettings: (settings: Settings) => {
    cookieService.setCookie("settings", JSON.stringify(settings));
    return Promise.resolve();
  },
  loadSettings: (): Promise<Settings | null> => {
    const value = cookieService.getCookie("settings");
    if (value) {
      return Promise.resolve(JSON.parse(value) as Settings);
    }
    return Promise.resolve(null);
  },
});
