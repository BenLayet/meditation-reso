import { State } from "./meditation-session.component.state.ts";
import { Events } from "./meditation-session.component.events.ts";
import { Values } from "./meditation-session.component.selectors.ts";

type Effects = {
  startTickingRequested: ["timerTicked"];
  stopTickingRequested: [];
  loadAudioRequested: [];
  playBeginningGongRequested: [];
  playEndGongRequested: [];
  stopGongRequested: [];
  releaseWakeLockRequested: [];
  requestWakeLockRequested: [];
  enterFullScreenRequested: [];
  exitFullScreenRequested: [];
  exitRequested: ["exitConfirmed"];
};

export type Contract = {
  state: State;
  events: Events;
  values: Values;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  children: {};
  effects: Effects;
};
