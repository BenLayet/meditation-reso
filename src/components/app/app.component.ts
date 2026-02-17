import type {
  ComponentDef,
  ComponentEventsContract,
  ExtractComponentValuesContract,
} from "@softer-components/types";
import type { Settings } from "../../domain/settings";
import type {
  NewMeditationContract,
  NewMeditationDependencies,
} from "../new-meditation/new-meditation.component";
import { newMeditationComponentDef } from "../new-meditation/new-meditation.component";
import type {
  MeditationSessionContract,
  MeditationSessionDependencies,
} from "../meditation-session/meditation-session.component";
import { meditationSessionComponentDef } from "../meditation-session/meditation-session.component";

// Initial state definition
const initialState = {
  isStarted: false,
};
type State = typeof initialState;
//children
type Children = {
  newMeditation: NewMeditationContract & { isOptional: false };
  meditationSession: MeditationSessionContract & { isOptional: false };
};

//selectors
const isStarted = (state: State) => state.isStarted;

const selectors = {
  isStarted,
};

type EventNames = "meditationSessionStarted" | "meditationSessionEnded";

type Events = ComponentEventsContract<
  EventNames,
  { meditationSessionStarted: Settings }
>;

type Contract = {
  state: State;
  events: Events;
  values: ExtractComponentValuesContract<typeof selectors>;
  children: Children;
};

type Dependencies = MeditationSessionDependencies & NewMeditationDependencies;

// Component definition
const componentDef = (dependencies: Dependencies): ComponentDef<Contract> => ({
  initialState,
  selectors,
  updaters: {
    meditationSessionStarted: ({ state }) => {
      state.isStarted = true;
    },
    meditationSessionEnded: ({ state }) => {
      state.isStarted = false;
    },
  },
  childrenComponentDefs: {
    newMeditation: newMeditationComponentDef(dependencies),
    meditationSession: meditationSessionComponentDef(dependencies),
  },
  childrenConfig: {
    newMeditation: {
      listeners: [
        {
          from: "startRequested",
          to: "meditationSessionStarted",
        },
      ],
    },
    meditationSession: {
      commands: [
        {
          from: "meditationSessionStarted",
          to: "initialize",
        },
      ],
      listeners: [
        {
          from: "exitConfirmed",
          to: "meditationSessionEnded",
        },
      ],
    },
  },
});
// Exporting the component definition
export const appComponentDef = componentDef;
export type AppContract = Contract;
export type AppDependencies = Dependencies;
