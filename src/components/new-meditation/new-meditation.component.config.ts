import type { ComponentDefConfig } from "@softer-components/types";
import { settingsComponentDef, SettingsDependencies } from "./settings/";
import { Contract } from "./new-meditation.component.contract.ts";

export type Dependencies = SettingsDependencies;

export const config = (
  dependencies: Dependencies,
): ComponentDefConfig<Contract> => ({
  childrenDefs: {
    settings: settingsComponentDef(dependencies),
  },
});
