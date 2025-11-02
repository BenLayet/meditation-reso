import { floor, max, padStart } from "lodash-es";

export const formatSeconds = (seconds: number) => {
  const hours = floor(seconds / 3600);
  const hoursStr = padStart(String(hours), 2, "0");
  const minutesStr = padStart(String(floor((seconds % 3600) / 60)), 2, "0");
  const secondsStr = padStart(String(floor(seconds) % 60), 2, "0");
  return hours > 0
    ? `${hoursStr}:${minutesStr}:${secondsStr}`
    : `${minutesStr}:${secondsStr}`;
};

const INCREMENTS_BEFORE_LARGE_STEP = 3;

export function calculateIncrementedDuration(
  duration: number,
  increment: number,
): number {
  if (duration < increment * INCREMENTS_BEFORE_LARGE_STEP) {
    return duration + 1;
  }
  return floor((duration + increment) / increment) * increment;
}

export function calculateDecrementedDuration(
  duration: number,
  increment: number,
): number {
  const diff = duration - increment;
  if (diff < increment * INCREMENTS_BEFORE_LARGE_STEP) {
    return max([duration - 1, 1]) ?? 1;
  }
  return diff;
}
