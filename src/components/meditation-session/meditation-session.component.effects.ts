import type { Effects } from "@softer-components/types";
import type { TickingService } from "../../services/ticking.service.ts";
import type { GongService } from "../../services/gong.service.ts";
import type { FullScreenService } from "../../services/full-screen.service.ts";
import type { WakeLockService } from "../../services/wake-lock.service.ts";
import { Contract } from "./meditation-session.component.contract.ts";

const TICK_INTERVAL_MS = 1000;
export type Dependencies = {
  tickingService: TickingService;
  gongService: GongService;
  fullScreenService: FullScreenService;
  wakeLockService: WakeLockService;
};
export const effects = ({
  tickingService,
  gongService,
  fullScreenService,
  wakeLockService,
}: Dependencies): Effects<Contract> => ({
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
  enterFullScreenRequested: fullScreenService.enterFullscreen,
  exitFullScreenRequested: fullScreenService.exitFullscreen,
  exitRequested: ({ exitConfirmed }) => {
    setTimeout(exitConfirmed, 0);
  },
});
