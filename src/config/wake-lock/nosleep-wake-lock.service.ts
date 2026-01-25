// NoSleep is loaded globally via script tag in index.html
// @ts-ignore - NoSleep is a global variable
declare const NoSleep: any;

export const nosleepWakeLockService = () => ({
  requestWakeLock: _requestWakeLock,
  releaseWakeLock: _releaseWakeLock,
});
// @ts-ignore
const noSleep = new NoSleep();

async function _requestWakeLock() {
  await noSleep.enable();
}

function _releaseWakeLock() {
  noSleep.disable();
}
