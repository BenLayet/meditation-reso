import { postRequest } from "./iframe-messaging.service.ts";
import type { WakeLockService } from "../../services/wake-lock.service.ts";
import NoSleep from 'nosleep.js';
const noSleep = new NoSleep();

export const iframeWakeLockService = (): WakeLockService => ({
  requestWakeLock: async () => {
    await noSleep.enable();
    await postRequest({ type: "requestWakeLock" });
  },
  releaseWakeLock: async () => {
    noSleep.disable();
    await postRequest({ type: "releaseWakeLock" });
  },
});
