import {
  meditationSessionComponentDef,
  MeditationSessionDependencies,
} from "../meditation-session";
import {
  newMeditationComponentDef,
  NewMeditationDependencies,
} from "../new-meditation";
import type { ComponentDef } from "@softer-components/types";
import { Contract } from "./app.component.contract.ts";
import { initialState } from "./app.component.state.ts";
import { selectors } from "./app.component.selectors.ts";
import { updaters } from "./app.component.updaters.ts";
import { childrenConfig } from "./app.component.children.ts";

export type Dependencies = MeditationSessionDependencies &
  NewMeditationDependencies;

// Component definition
export const componentDef = (
  dependencies: Dependencies,
): ComponentDef<Contract> => ({
  initialState,
  selectors,
  updaters,
  childrenComponentDefs: {
    newMeditation: newMeditationComponentDef(dependencies),
    meditationSession: meditationSessionComponentDef(dependencies),
  },
  childrenConfig,
});
