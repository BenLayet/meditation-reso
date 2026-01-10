import { settingsEffectsProvider } from "./components/timer/settings/settings.effects.ts";
import { timerEffectsProvider } from "./components/timer/timer.effects.ts";
import type { Configuration } from "./config/configuration.ts";
import { idbSettingsPersistenceService } from "./config/persistence/idb/idb-settings-persistence.service.ts";
import { nosleepWakeLockService } from "./config/wake-lock/nosleep-wake-lock.service.ts";
import { FullscreenService } from "./services/full-screen.service.ts";
import { GongService } from "./services/gong.service.ts";
import { TickingService } from "./services/ticking.service.ts";

const settingsPersistenceService = idbSettingsPersistenceService();
const wakeLockService = nosleepWakeLockService();
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
