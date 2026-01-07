import type { Configuration } from "./config/configuration.ts";
import { FullscreenService } from "./services/full-screen.service.ts";
import { GongService } from "./services/gong.service.ts";
import { TickingService } from "./services/ticking.service.ts";
import { timerEffectsProvider } from "./components/timer/timer.effects.ts";
import { settingsEffectsProvider } from "./components/timer/settings/settings.effects.ts";
import { navigatorWakeLockService } from "./config/wake-lock/navigator-wake-lock.service.ts";
import { cookieSettingsPersistenceService } from "./config/persistence/cookie/cookie-settings-persistence.service.ts";
import { compositeSettingsPersistenceService } from "./config/persistence/composite/composite-settings-persistence.service.ts";
import { idbSettingsPersistenceService } from "./config/persistence/idb/idb-settings-persistence.service.ts";
import { CookieService } from "./config/persistence/cookie/cookie.service.ts";
import { localStorageSettingsPersistenceService } from "./config/persistence/local-storage/local-storage-settings-persistence.service.ts";

const settingsPersistenceService = compositeSettingsPersistenceService([
  cookieSettingsPersistenceService(new CookieService()),
  idbSettingsPersistenceService(),
  localStorageSettingsPersistenceService(),
]);
const wakeLockService = navigatorWakeLockService();
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
