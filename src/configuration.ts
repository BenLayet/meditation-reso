import { idbSettingsPersistenceService } from "./adapters/persistence/idb/idb-settings-persistence.service.ts";
import { noSleepWakeLockService } from "./adapters/wake-lock/no-sleep-wake-lock.service.ts";
import { FullScreenServiceImpl } from "./services/full-screen.service.ts";
import { GongServiceImpl } from "./services/gong.service.ts";
import { TickingServiceImpl } from "./services/ticking.service.ts";
import { AppDependencies } from "./components/app/app.component.ts";

const settingsPersistenceService = idbSettingsPersistenceService();
const wakeLockService = noSleepWakeLockService();
const fullscreenService = new FullScreenServiceImpl();
const tickingService = new TickingServiceImpl();
const gongService = new GongServiceImpl();
export const configuration: AppDependencies = {
  tickingService,
  gongService,
  fullScreenService: fullscreenService,
  wakeLockService,
  settingsPersistenceService,
};
