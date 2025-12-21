import { isUndefined } from "lodash-es";
import {
  assertIsNotUndefined,
  assertIsUndefined,
} from "../util/assert.functions.ts";
import type { Effects } from "@softer-components/types";
import type { SettingsContract } from "../components/timer/settings/settings.component.ts";
import type { TimerContract } from "../components/timer/timer.component.ts";

export type Configuration = {
  settingsEffects: Effects<SettingsContract>;
  timerEffects: Effects<TimerContract>;
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
