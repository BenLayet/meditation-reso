import NoSleep from "nosleep.js";

export const nosleepWakeLockService = () => ({
  requestWakeLock: _requestWakeLock,
  releaseWakeLock: _releaseWakeLock,
});
const noSleep = new NoSleep();
let counter = 0;
async function _requestWakeLock() {
  noSleep.disable();
  counter++;
  await noSleep.enable();
  if (
    !noSleep.isEnabled ||
    (counter >= 2 && navigator.userAgent.startsWith("mobile"))
  ) {
    alert(
      "Le verrouillage d'écran n'a pas pu être activé sur cet appareil.\nL'écran peut s'éteindre pendant la méditation. \nVeuillez quitter et réessayer.",
    );
  }
}

function _releaseWakeLock() {
  noSleep.disable();
}
