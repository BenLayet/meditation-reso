import type { ComponentDefConfig } from "@softer-components/types";
import { Dependencies, effects } from "./settings.component.effects.ts";
import { Contract } from "./settings.component.contract.ts";

export type { Dependencies };

export const config = (
  dependencies: Dependencies,
): ComponentDefConfig<Contract> => ({
  effects: effects(dependencies),
});
