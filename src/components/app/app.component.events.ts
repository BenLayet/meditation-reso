import type { EventsContract } from "@softer-components/types";
import type { Settings } from "../../domain/settings.ts";

export const allEvents = [
  "meditationSessionStarted",
  "meditationSessionEnded",
] as const;

export type Events = EventsContract<
  typeof allEvents,
  { meditationSessionStarted: Settings },
  []
>;
