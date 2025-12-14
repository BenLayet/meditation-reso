export class WakeLockService {
  // Wake lock ref to keep screen awake
  private wakeLock: WakeLockSentinel | null = null;

  async requestWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        this.wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock activated");
        return;
      }
    } catch (err) {
      console.error("Wake Lock failed:", err);
    }
    return;
  }

  async releaseWakeLock() {
    if (this.wakeLock) {
      try {
        await this.wakeLock.release();
        console.log("Wake Lock released");
      } catch (err) {
        console.error("Wake Lock release failed:", err);
      }
    }
  }
}

export const wakeLockService = new WakeLockService();
