import NoSleep from "nosleep.js";

import { isAndroidOnWebView } from "../../util/useragent.ts";

export const noSleepWakeLockService = () => ({
  requestWakeLock: _requestWakeLock,
  releaseWakeLock: _releaseWakeLock,
});
const noSleep = new NoSleep();
async function _requestWakeLock() {
  if (!isAndroidOnWebView()) {
    // Initialize NoSleep to prevent the device from sleeping during meditation
    noSleep.enable().then();
  }
}

function _releaseWakeLock() {
  if (!isAndroidOnWebView()) {
    noSleep.disable();
  }
}
