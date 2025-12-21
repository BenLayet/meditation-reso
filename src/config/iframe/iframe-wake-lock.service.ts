import { postRequest } from "./iframe-messaging.service.ts";
import type { WakeLockService } from "../../services/wake-lock.service.ts";

export const iframeWakeLockService = (): WakeLockService => ({
  requestWakeLock: () => postRequest({ type: "requestWakeLock" }),
  releaseWakeLock: () => postRequest({ type: "releaseWakeLock" }),
});
