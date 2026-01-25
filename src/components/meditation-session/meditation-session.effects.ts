import type { Effects } from "@softer-components/types";
import type { FullscreenService } from "../../services/full-screen.service.ts";
import type { GongService } from "../../services/gong.service.ts";
import type { TickingService } from "../../services/ticking.service.ts";
import type { WakeLockService } from "../../services/wake-lock.service.ts";
import type { MeditationSessionContract } from "./meditation-session.component.ts";
const TICK_INTERVAL_MS = 1000;
export const meditationSessionEffectsProvider = (
  tickingService: TickingService,
  _gongService: GongService,
  _fullscreenService: FullscreenService,
  _wakeLockService: WakeLockService,
): Effects<MeditationSessionContract> => ({
  startTickingRequested: ({ timerTicked }) => {
    tickingService.startTicking(timerTicked, TICK_INTERVAL_MS);
  },
  stopTickingRequested: tickingService.stopTicking,
  loadAudioRequested: console.log,
  playBeginningGongRequested: console.log,
  playEndGongRequested: console.log,
  stopGongRequested: console.log,
  requestWakeLockRequested: console.log,
  releaseWakeLockRequested: console.log,
  enterFullScreenRequested: console.log,
  exitFullScreenRequested: console.log,
  exitRequested: ({ exitConfirmed }) => {
    setTimeout(exitConfirmed, 0);
  },
});
