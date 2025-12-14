import { Effects } from "@softer-components/types";
import { TimerContract } from "./timer.component";
import { gongService } from "../../services/gong.service";
import { tickingSErvice as tickingService } from "../../services/ticking.service";
const TICK_INTERVAL_MS = 1000;
export const timerEffects: Effects<TimerContract> = {
  startTickingRequested: ({ timerTicked }) =>
    tickingService.startTicking(
      () => timerTicked({ currentTimeInSeconds: currentTimeInSeconds() }),
      TICK_INTERVAL_MS,
    ),
  stopTickingRequested: tickingService.stopTicking,
  startClicked: ({ startRequested }) =>
    startRequested({ currentTimeInSeconds: currentTimeInSeconds() }),
  loadAudioRequested: gongService.load,
  playBeginningGongRequested: gongService.playBeginningAudio,
  playEndGongRequested: gongService.playEndAudio,
  stopGongRequested: gongService.stopAllAudio,
};

function currentTimeInSeconds() {
  return Math.floor(Date.now() / 1000);
}
