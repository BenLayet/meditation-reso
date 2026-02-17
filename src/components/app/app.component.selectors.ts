//selectors
import { State } from "./app.component.state.ts";
import type { ExtractComponentValuesContract } from "@softer-components/types";

const isStarted = (state: State) => state.isStarted;

export const selectors = {
  isStarted,
};
export type Values = ExtractComponentValuesContract<typeof selectors>;
