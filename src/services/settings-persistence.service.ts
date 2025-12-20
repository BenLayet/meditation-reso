import type { Settings } from "../domain/settings";
import type { CookieService } from "./cookie.service";
import { cookieService } from "./cookie.service";

export class SettingsPersistenceService {
  constructor(private readonly cookieService: CookieService) {}

  saveSettings(settings: Settings) {
    this.cookieService.setCookie("settings", JSON.stringify(settings));
  }

  loadSettings(): Settings | null {
    const savedSettings = this.cookieService.getCookie("settings");
    if (savedSettings) {
      return JSON.parse(savedSettings) as Settings;
    }
    return null;
  }
}

export const settingsPersistenceService = new SettingsPersistenceService(
  cookieService,
);
