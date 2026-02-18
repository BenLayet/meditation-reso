import { Events } from "./settings.component.events.ts";
import { State } from "./settings.component.state.ts";
import { Values } from "./settings.component.selectors.ts";

export type Contract = {
  state: State;
  events: Events;
  values: Values;
  children: {};
};
