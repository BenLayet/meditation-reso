import type { Effects } from "@softer-components/types";
import type { TimerContract } from "./timer.component";
import type { TickingService } from "../../services/ticking.service.ts";
import type { GongService } from "../../services/gong.service.ts";
import type { FullscreenService } from "../../services/full-screen.service.ts";
import type { WakeLockService } from "../../services/wake-lock.service.ts";
const TICK_INTERVAL_MS = 1000;
export const timerEffectsProvider = (
  tickingService: TickingService,
  gongService: GongService,
  fullscreenService: FullscreenService,
  wakeLockService: WakeLockService,
): Effects<TimerContract> => ({
  startTickingRequested: ({ timerTicked }) => {
    tickingService.startTicking(timerTicked, TICK_INTERVAL_MS);
  },
  stopTickingRequested: tickingService.stopTicking,
  loadAudioRequested: gongService.loadAudio,
  playBeginningGongRequested: gongService.playBeginningAudio,
  playEndGongRequested: gongService.playEndAudio,
  stopGongRequested: gongService.stopAllAudio,
  requestWakeLockRequested: wakeLockService.requestWakeLock,
  releaseWakeLockRequested: wakeLockService.releaseWakeLock,
  enterFullScreenRequested: fullscreenService.enterFullscreen,
  exitFullScreenRequested: () => {
    if (navigator.userAgent.toLowerCase().includes("android")) {
      location.reload();
    } else {
      fullscreenService.exitFullscreen();
    }
  },
});
