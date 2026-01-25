//import NoSleep from "nosleep.js";

export const nosleepWakeLockService = () => ({
  requestWakeLock: _requestWakeLock,
  releaseWakeLock: _releaseWakeLock,
});
//const noSleep = new NoSleep();
async function _requestWakeLock() {
  // Initialize NoSleep to prevent the device from sleeping during meditation
  // TODO: make it work using wakelock service
  //noSleep.enabled();
}

function _releaseWakeLock() {
  //noSleep.disable();
}
