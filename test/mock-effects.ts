export const mockEffects = {
  "/meditationSession/": {
    startTickingRequested: (dispatchers: any) => dispatchers.timerTicked(),
  },
};
