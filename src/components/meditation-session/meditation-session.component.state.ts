type Phase = "INITIALIZING" | "PREPARATION" | "MEDITATION" | "COMPLETED";

export const initialState = {
  phase: "INITIALIZING" as Phase,
  durationInSeconds: 0,
  remainingTimeInSeconds: 0,
  isGongOn: false,
  shouldDisplayRemainingTime: false,
  shouldDisplayProgress: false,
};

// Initial state definition
export type State = typeof initialState;
