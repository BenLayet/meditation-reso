import { StateUpdaters } from "@softer-components/types";
import { Contract } from "./meditation-session.component.contract.ts";
import { initialState, State } from "./meditation-session.component.state.ts";

export const stateUpdaters: StateUpdaters<Contract, State> = {
  initialize: ({ payload: settings, state }) => {
    state.isGongOn = settings.isGongOn;
    state.shouldDisplayRemainingTime = settings.shouldDisplayRemainingTime;
    state.shouldDisplayProgress = settings.shouldDisplayProgress;
    state.durationInSeconds = settings.durationInMinutes * 60;
  },
  preparationStarted: ({ state, payload: { preparationInSeconds } }) => {
    state.phase = "PREPARATION";
    state.remainingTimeInSeconds = preparationInSeconds;
  },
  actualMeditationStarted: ({ state, values: { durationInSeconds } }) => {
    state.phase = "MEDITATION";
    state.remainingTimeInSeconds = durationInSeconds();
  },
  actualMeditationCompleted: ({ state }) => {
    state.phase = "COMPLETED";
    state.remainingTimeInSeconds = 0;
  },
  timerTicked: ({ state }) => {
    state.remainingTimeInSeconds--;
  },
  exitConfirmed: () => initialState,
};
