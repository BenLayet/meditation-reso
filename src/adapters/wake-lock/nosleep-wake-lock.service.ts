//import NoSleep from "nosleep.js";

export const nosleepWakeLockService = () => ({
  requestWakeLock: _requestWakeLock,
  releaseWakeLock: _releaseWakeLock,
});
//const noSleep = new NoSleep();
async function _requestWakeLock() {
  //noSleep.enabled();
}

function _releaseWakeLock() {
  //noSleep.disable();
}
