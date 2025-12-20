import type { Settings } from "../domain/settings";
import type { CookieService } from "./cookie.service";
import { cookieService } from "./cookie.service";
import { postRequest } from "./iframe-messaging.service.ts";

export class SettingsPersistenceService {
  constructor(private readonly cookieService: CookieService) {}

 async saveSettings(settings: Settings) {
    const value = JSON.stringify(settings);
    this.cookieService.setCookie("settings", value);
    await postRequest({type:"set", key:"settings", value});
  }

  async loadSettings(): Promise<Settings | null> {
    let value = this.cookieService.getCookie("settings");
    if (value) {
      return JSON.parse(value) as Settings;
    }
    value = await postRequest({type:"get",  key:"settings"});
    if (value) {
      return JSON.parse(value) as Settings;
    }
    return null;
  }
}

export const settingsPersistenceService = new SettingsPersistenceService(
  cookieService,
);

