import { isUndefined } from "lodash-es";
import {
  assertIsNotUndefined,
  assertIsUndefined,
} from "../util/assert.functions.ts";
import type { Effects } from "@softer-components/types";
import type { MeditationSessionContract } from "../components/meditation-session/meditation-session.component.ts";
import type { SettingsContract } from "../components/new-meditation/settings/settings.component.ts";
export type Configuration = {
  settingsEffects: Effects<SettingsContract>;
  meditationSessionEffects: Effects<MeditationSessionContract>;
};
let lazySingleton: Configuration | undefined = undefined;
export const configuration = (
  implementedConfiguration?: Configuration,
): Configuration => {
  if (isUndefined(implementedConfiguration)) {
    assertIsNotUndefined(lazySingleton);
    return lazySingleton;
  } else {
    assertIsUndefined(lazySingleton);
    lazySingleton = implementedConfiguration;
    return lazySingleton;
  }
};
