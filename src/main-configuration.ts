import { meditationSessionEffectsProvider } from "./components/meditation-session/meditation-session.effects.ts";
import { settingsEffectsProvider } from "./components/new-meditation/settings/settings.effects.ts";
import type { Configuration } from "./adapters/configuration.ts";
import { idbSettingsPersistenceService } from "./adapters/persistence/idb/idb-settings-persistence.service.ts";
import { noSleepWakeLockService } from "./adapters/wake-lock/no-sleep-wake-lock.service.ts";
import { FullscreenService } from "./services/full-screen.service.ts";
import { GongService } from "./services/gong.service.ts";
import { TickingService } from "./services/ticking.service.ts";

const settingsPersistenceService = idbSettingsPersistenceService();
const wakeLockService = noSleepWakeLockService();
const fullscreenService = new FullscreenService();
const tickingService = new TickingService();
const gongService = new GongService();
const settingsEffects = settingsEffectsProvider(settingsPersistenceService);
const meditationSessionEffects = meditationSessionEffectsProvider(
  tickingService,
  gongService,
  fullscreenService,
  wakeLockService,
);
export const mainConfiguration: Configuration = {
  settingsEffects,
  meditationSessionEffects,
};
