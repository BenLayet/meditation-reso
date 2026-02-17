import type {
  ComponentDef,
  ComponentEventsContract,
  ExtractComponentValuesContract,
} from "@softer-components/types";
import {
  SettingsContract,
  SettingsDependencies,
} from "./settings/settings.component";
import { settingsComponentDef } from "./settings/settings.component";
import type { Settings } from "../../domain/settings";

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

type Contract = {
  state: State;
  events: Events;
  values: ExtractComponentValuesContract<typeof selectors>;
  children: Children;
};
type Dependencies = SettingsDependencies;
// Component definition
export const componentDef = (
  dependencies: Dependencies,
): ComponentDef<Contract> => ({
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
    settings: settingsComponentDef(dependencies),
  },
});
// Exports
export type NewMeditationContract = Contract;
export type NewMeditationDependencies = Dependencies;
export const newMeditationComponentDef = componentDef;
