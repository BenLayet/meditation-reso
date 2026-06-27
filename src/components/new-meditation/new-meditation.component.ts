import type { ComponentDef } from "@softer-components/types";
import { Contract } from "./new-meditation.component.contract.ts";
import { initialState, State } from "./new-meditation.component.state.ts";
import { uiEvents } from "./new-meditation.component.events.ts";
import { eventForwarders } from "./new-meditation.component.forwarders.ts";
import { config, Dependencies } from "./new-meditation.component.config.ts";

export const newMeditationComponentDef = (
  dependencies: Dependencies,
): ComponentDef<Contract, State> => ({
  initialState,
  uiEvents,
  eventForwarders,
  config: config(dependencies),
});

export type NewMeditationContract = Contract;
export type NewMeditationDependencies = Dependencies;
