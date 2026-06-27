import { State } from "./app.component.state.ts";
import { Events } from "./app.component.events.ts";
import { Values } from "./app.component.selectors.ts";
import { Children } from "./app.component.children.ts";

export type Contract = {
  state: State;
  events: Events;
  values: Values;
  children: Children;
};
