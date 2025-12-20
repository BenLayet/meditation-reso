import type { Effects } from "@softer-components/types";
import type { TimerContract } from "./timer.component";
import { gongService } from "../../services/gong.service";
import { tickingSErvice as tickingService } from "../../services/ticking.service";
import { wakeLockService } from "../../services/wake-lock.service";
import { fullscreenService } from "../../services/full-screen.service";
const TICK_INTERVAL_MS = 1000;
export const timerEffects: Effects<TimerContract> = {
  startTickingRequested: ({ timerTicked }) => {
    tickingService.startTicking(timerTicked, TICK_INTERVAL_MS);
  },
  stopTickingRequested: tickingService.stopTicking,
  loadAudioRequested: gongService.load,
  playBeginningGongRequested: gongService.playBeginningAudio,
  playEndGongRequested: gongService.playEndAudio,
  stopGongRequested: gongService.stopAllAudio,
  requestWakeLockRequested: wakeLockService.requestWakeLock,
  releaseWakeLockRequested: wakeLockService.releaseWakeLock,
  enterFullScreenRequested: fullscreenService.enterFullscreen,
  exitFullScreenRequested: fullscreenService.exitFullscreen,
};
