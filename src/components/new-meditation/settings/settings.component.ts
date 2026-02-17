import { componentDef } from "./settings.component.config.ts";
import { Contract } from "./settings.component.contract.ts";
import { Dependencies } from "./settings.component.effects.ts";

// exports
export const settingsComponentDef = componentDef;
export type SettingsContract = Contract;
export type SettingsDependencies = Dependencies;
