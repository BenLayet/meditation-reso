import type { ComponentDef } from "@softer-components/types";
import { Contract } from "./app.component.contract.ts";
import { initialState, State } from "./app.component.state.ts";
import { selectors } from "./app.component.selectors.ts";
import { stateUpdaters } from "./app.component.updaters.ts";
import { eventForwarders } from "./app.component.forwarders.ts";
import { config, Dependencies } from "./app.component.config.ts";

export const appComponentDef = (
  dependencies: Dependencies,
): ComponentDef<Contract, State> => ({
  initialState,
  selectors,
  stateUpdaters,
  eventForwarders,
  config: config(dependencies),
});

export type AppContract = Contract;
export type AppDependencies = Dependencies;
