export const defaultSettings = {
  preparationInSeconds: 20,
  durationInMinutes: 20,
  isGongOn: true,
};
export type Settings = typeof defaultSettings;
export const DURATION_INCREMENT_MINUTES = 5;
export const DURATION_FIRST_STEPS = [1, 2, 3, 4, 5, 10];

export const PREPARATION_INCREMENT_SECONDS = 20;
export const PREPARATION_FIRST_STEPS = [0, 5, 10, 20];
