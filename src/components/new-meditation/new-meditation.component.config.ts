import type { ComponentDef } from "@softer-components/types";
import { settingsComponentDef } from "./settings/";

import { SettingsDependencies } from "./settings";
import { Contract } from "./new-meditation.component.contract.ts";
import { initialState } from "./new-meditation.component.state.ts";
import { uiEvents } from "./new-meditation.component.events.ts";
import { eventForwarders } from "./new-meditation.component.forwarders.ts";
export type Dependencies = SettingsDependencies;
// Component definition
export const componentDef = (
  dependencies: Dependencies,
): ComponentDef<Contract> => ({
  initialState,
  uiEvents,
  eventForwarders,
  childrenComponentDefs: {
    settings: settingsComponentDef(dependencies),
  },
});
