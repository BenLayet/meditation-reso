export type WakeLockService = {
  requestWakeLock: () => Promise<void>;
  releaseWakeLock: () => void;
};
