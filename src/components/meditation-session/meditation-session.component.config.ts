import type { ComponentDef } from "@softer-components/types";
import { Contract } from "./meditation-session.component.contract.ts";
import {
  Dependencies,
  effects,
} from "./meditation-session.component.effects.ts";
import { initialState } from "./meditation-session.component.state.ts";
import { selectors } from "./meditation-session.component.selectors.ts";
import { eventForwarders } from "./meditation-session.component.forwarders.ts";
import { updaters } from "./meditation-session.component.updaters.ts";
import { uiEvents } from "./meditation-session.component.events.ts";

export const componentDef = (
  dependencies: Dependencies,
): ComponentDef<Contract> => ({
  initialState,
  selectors,
  uiEvents,
  updaters,
  eventForwarders,
  effects: effects(dependencies),
});
