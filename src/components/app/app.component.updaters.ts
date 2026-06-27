import { StateUpdaters } from "@softer-components/types";
import { Contract } from "./app.component.contract.ts";
import { State } from "./app.component.state.ts";

export const stateUpdaters: StateUpdaters<Contract, State> = {
  meditationSessionStarted: ({ state }) => {
    state.isStarted = true;
  },
  meditationSessionEnded: ({ state }) => {
    state.isStarted = false;
  },
};
