import {
  meditationSessionComponentDef,
  MeditationSessionDependencies,
} from "../meditation-session";
import {
  newMeditationComponentDef,
  NewMeditationDependencies,
} from "../new-meditation";
import type { ComponentDefConfig } from "@softer-components/types";
import { Contract } from "./app.component.contract.ts";

export type Dependencies = MeditationSessionDependencies &
  NewMeditationDependencies;

export const config = (
  dependencies: Dependencies,
): ComponentDefConfig<Contract> => ({
  childrenDefs: {
    newMeditation: newMeditationComponentDef(dependencies),
    meditationSession: meditationSessionComponentDef(dependencies),
  },
});
