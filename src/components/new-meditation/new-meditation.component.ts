import type {
  ComponentDef,
  ComponentEventsContract,
  ExtractComponentValuesContract,
} from "@softer-components/types";
import type { SettingsContract } from "./settings/settings.component";
import { settingsComponentDef } from "./settings/settings.component";
import { Settings } from "../../domain/settings";

// Initial state definition
const initialState = {};
type State = typeof initialState;
//children
type Children = {
  settings: SettingsContract;
};

const selectors = {};

type EventNames = "startClicked" | "startRequested";

type Events = ComponentEventsContract<EventNames, { startRequested: Settings }>;

export type NewMeditationContract = {
  state: State;
  events: Events;
  values: ExtractComponentValuesContract<typeof selectors>;
  children: Children;
};
// Component definition
export const newMeditationComponentDef: ComponentDef<NewMeditationContract> = {
  initialState,
  selectors,
  uiEvents: ["startClicked"],
  eventForwarders: [
    {
      from: "startClicked",
      to: "startRequested",
      withPayload: ({ childrenValues }) =>
        childrenValues.settings.values.settings(),
    },
  ],
  childrenComponentDefs: {
    settings: settingsComponentDef,
  },
};
