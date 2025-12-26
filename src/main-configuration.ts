import { isInIframe } from "./util/iframe.functions.ts";
import type { Configuration } from "./config/configuration.ts";
import { iframeWakeLockService } from "./config/iframe/iframe-wake-lock.service.ts";
import { cookieSettingsPersistenceService } from "./config/cookie/cookie-settings-persistence.service.ts";
import { CookieService } from "./config/cookie/cookie.service.ts";
import { navigatorWakeLockService } from "./config/navigator/navigator-wake-lock.service.ts";
import { FullscreenService } from "./services/full-screen.service.ts";
import { GongService } from "./services/gong.service.ts";
import { TickingService } from "./services/ticking.service.ts";
import { timerEffectsProvider } from "./components/timer/timer.effects.ts";
import { settingsEffectsProvider } from "./components/timer/settings/settings.effects.ts";
import { iframeSettingsPersistenceService } from "./config/iframe/iframe-settings-persistence.service.ts";

const _isInIframe = isInIframe();

const settingsPersistenceService = _isInIframe
  ? iframeSettingsPersistenceService()
  : cookieSettingsPersistenceService(new CookieService());

const wakeLockService = _isInIframe
  ? iframeWakeLockService()
  : navigatorWakeLockService();
const fullscreenService = new FullscreenService();
const tickingService = new TickingService();
const gongService = new GongService();
const settingsEffects = settingsEffectsProvider(settingsPersistenceService);
const timerEffects = timerEffectsProvider(
  tickingService,
  gongService,
  fullscreenService,
  wakeLockService,
);
export const mainConfiguration: Configuration = {
  settingsEffects,
  timerEffects,
};
