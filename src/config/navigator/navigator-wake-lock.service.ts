export const navigatorWakeLockService = () =>  ({
  requestWakeLock: _requestWakeLock,
  releaseWakeLock: _releaseWakeLock,
});
let wakeLockSentinelPromise: Promise<WakeLockSentinel> | null = null;

async function _requestWakeLock() {
  await _releaseWakeLock();
  wakeLockSentinelPromise = navigator.wakeLock.request("screen");
}

async function _releaseWakeLock() {
  if (wakeLockSentinelPromise) {
    const sentinel = await wakeLockSentinelPromise;
    await sentinel.release();
    wakeLockSentinelPromise = null;
  }
}