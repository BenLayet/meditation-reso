import type { EventsContract } from "@softer-components/types";
import type { Settings } from "../../domain/settings.ts";

export const uiEvents = ["startClicked"] as const;

export const allEvents = [...uiEvents, "startRequested"] as const;

export type Events = EventsContract<
  typeof allEvents,
  { startRequested: Settings },
  typeof uiEvents
>;
