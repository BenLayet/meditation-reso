// Component definition
import type { ComponentDef } from "@softer-components/types";
import { Dependencies, effects } from "./settings.component.effects.ts";
import { Contract } from "./settings.component.contract.ts";
import { initialState, State } from "./settings.component.state.ts";
import { selectors } from "./settings.component.selectors.ts";
import { uiEvents } from "./settings.component.events.ts";
import { updaters } from "./settings.component.updaters.ts";
import { eventForwarders } from "./settings.component.forwarders.ts";

export const componentDef = (
  dependencies: Dependencies,
): ComponentDef<Contract, State> => ({
  initialState,
  selectors,
  uiEvents,
  updaters,
  eventForwarders,
  effects: effects(dependencies),
});
