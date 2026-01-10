import NoSleep from "nosleep.js";

export const nosleepWakeLockService = () => ({
  requestWakeLock: _requestWakeLock,
  releaseWakeLock: _releaseWakeLock,
});
const noSleep = new NoSleep();

async function _requestWakeLock() {
  noSleep.enable();
}

async function _releaseWakeLock() {
  noSleep.disable();
}
