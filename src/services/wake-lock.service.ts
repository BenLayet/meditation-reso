import NoSleep from 'nosleep.js';

export class WakeLockService {
  private readonly noSleep = new NoSleep();
  requestWakeLock = async () => {
    await this.noSleep.enable();
  };
  releaseWakeLock = () => {
    this.noSleep.disable();
  };
}

export const wakeLockService = new WakeLockService();
