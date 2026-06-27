import type { ComponentDef } from "@softer-components/types";
import { Contract } from "./meditation-session.component.contract.ts";
import { initialState, State } from "./meditation-session.component.state.ts";
import { selectors } from "./meditation-session.component.selectors.ts";
import { stateUpdaters } from "./meditation-session.component.updaters.ts";
import { eventForwarders } from "./meditation-session.component.forwarders.ts";
import { uiEvents } from "./meditation-session.component.events.ts";
import { config, Dependencies } from "./meditation-session.component.config.ts";

export const meditationSessionComponentDef = (
  dependencies: Dependencies,
): ComponentDef<Contract, State> => ({
  initialState,
  selectors,
  uiEvents,
  stateUpdaters,
  eventForwarders,
  config: config(dependencies),
});

export type MeditationSessionContract = Contract;
export type MeditationSessionDependencies = Dependencies;
