import { State } from "./meditation-session.component.state.ts";
import { Events } from "./meditation-session.component.events.ts";
import { Values } from "./meditation-session.component.selectors.ts";

export type Contract = {
  state: State;
  events: Events;
  values: Values;
};
