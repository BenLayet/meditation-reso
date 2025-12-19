import { floor, padStart } from "lodash-es";

export const formatSeconds = (seconds: number) => {
  const hours = floor(seconds / 3600);
  const hoursStr = padStart(String(hours), 2, "0");
  const minutesStr = padStart(String(floor((seconds % 3600) / 60)), 2, "0");
  const secondsStr = padStart(String(floor(seconds) % 60), 2, "0");
  return hours > 0
    ? `${hoursStr}:${minutesStr}:${secondsStr}`
    : `${minutesStr}:${secondsStr}`;
};
