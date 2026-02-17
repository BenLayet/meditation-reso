//exports
import { Contract } from "./meditation-session.component.contract.ts";
import { Dependencies } from "./meditation-session.component.effects.ts";
import { componentDef } from "./meditation-session.component.config.ts";

export type MeditationSessionContract = Contract;
export type MeditationSessionDependencies = Dependencies;
export const meditationSessionComponentDef = componentDef;
