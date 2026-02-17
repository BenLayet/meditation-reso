import type { ComponentEventsContract } from "@softer-components/types";
import type { Settings } from "../../domain/settings.ts";

export type EventNames = "startClicked" | "startRequested";
export const uiEvents: EventNames[] = ["startClicked"];

export type Events = ComponentEventsContract<
  EventNames,
  { startRequested: Settings }
>;
