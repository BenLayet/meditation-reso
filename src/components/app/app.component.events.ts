import type { ComponentEventsContract } from "@softer-components/types";
import type { Settings } from "../../domain/settings.ts";

type EventNames = "meditationSessionStarted" | "meditationSessionEnded";

export type Events = ComponentEventsContract<
  EventNames,
  { meditationSessionStarted: Settings }
>;
