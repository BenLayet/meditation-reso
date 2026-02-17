import { Children } from "./new-meditation.component.children.ts";
import { Events } from "./new-meditation.component.events.ts";
import { State } from "./new-meditation.component.state.ts";

export type Contract = {
  state: State;
  events: Events;
  values: {};
  children: Children;
};
