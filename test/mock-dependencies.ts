import { AppDependencies } from "../src/components/app/app.component.ts";
import { TickingService } from "../src/services/ticking.service.ts";
import { FullScreenService } from "../src/services/full-screen.service.ts";
import { GongService } from "../src/services/gong.service.ts";
import { WakeLockService } from "../src/services/wake-lock.service.ts";
import { SettingsPersistenceService } from "../src/services/settings-persistence.service.ts";
import type { Settings } from "../src/domain/settings.ts";

class MockSettingsPersistenceService implements SettingsPersistenceService {
  mockSettings: Settings = {
    durationInMinutes: 20,
    preparationInSeconds: 0,
    isGongOn: false,
    shouldDisplayProgress: false,
    shouldDisplayRemainingTime: false,
  };
  loadSettings(): Promise<Settings | null> {
    return Promise.resolve(this.mockSettings);
  }

  saveSettings(settings: Settings): Promise<void> {
    this.mockSettings = settings;
    return Promise.resolve();
  }
}

class MockWakeLockService implements WakeLockService {
  requestWakeLock() {
    return Promise.resolve();
  }
  releaseWakeLock() {
    return Promise.resolve();
  }
}
class MockFullScreenService implements FullScreenService {
  enterFullscreen() {}
  exitFullscreen() {}
}
class MockTickingService implements TickingService {
  mockTickCount = 0;
  startTicking(callback: () => void): void {
    for (let i = 0; i < this.mockTickCount; i++) {
      callback();
    }
  }
  stopTicking(): void {}
}
class MockGongService implements GongService {
  loadAudio(): Promise<void> {
    return Promise.resolve();
  }
  playBeginningAudio(): Promise<void> {
    return Promise.resolve();
  }
  playEndAudio(): Promise<void> {
    return Promise.resolve();
  }
  stopAllAudio(): void {}
}
export const mockDependencies = () =>
  ({
    tickingService: new MockTickingService(),
    gongService: new MockGongService(),
    fullScreenService: new MockFullScreenService(),
    wakeLockService: new MockWakeLockService(),
    settingsPersistenceService: new MockSettingsPersistenceService(),
  }) satisfies AppDependencies;

export type MockDependencies = ReturnType<typeof mockDependencies>;
