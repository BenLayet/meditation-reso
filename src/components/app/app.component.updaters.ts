import { Updaters } from "@softer-components/types";
import { Contract } from "./app.component.contract.ts";

export const updaters: Updaters<Contract> = {
  meditationSessionStarted: ({ state }) => {
    state.isStarted = true;
  },
  meditationSessionEnded: ({ state }) => {
    state.isStarted = false;
  },
};
