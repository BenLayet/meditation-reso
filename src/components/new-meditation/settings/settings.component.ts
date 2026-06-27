import type { ComponentDef } from "@softer-components/types";
import { Contract } from "./settings.component.contract.ts";
import { initialState, State } from "./settings.component.state.ts";
import { selectors } from "./settings.component.selectors.ts";
import { uiEvents } from "./settings.component.events.ts";
import { stateUpdaters } from "./settings.component.updaters.ts";
import { eventForwarders } from "./settings.component.forwarders.ts";
import { config, Dependencies } from "./settings.component.config.ts";

export const settingsComponentDef = (
  dependencies: Dependencies,
): ComponentDef<Contract, State> => ({
  initialState,
  selectors,
  uiEvents,
  stateUpdaters,
  eventForwarders,
  config: config(dependencies),
});

export type SettingsContract = Contract;
export type SettingsDependencies = Dependencies;
