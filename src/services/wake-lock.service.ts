export type WakeLockService = {
  requestWakeLock: () => Promise<void>;
  releaseWakeLock: () => Promise<void>;
};
