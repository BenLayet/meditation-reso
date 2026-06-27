import type { ComponentDefConfig } from "@softer-components/types";
import { Contract } from "./meditation-session.component.contract.ts";
import {
  Dependencies,
  effects,
} from "./meditation-session.component.effects.ts";

export type { Dependencies };

export const config = (
  dependencies: Dependencies,
): ComponentDefConfig<Contract> => ({
  effects: effects(dependencies),
});
