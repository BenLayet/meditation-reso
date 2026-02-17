//children
import type { NewMeditationContract } from "../new-meditation";
import type { MeditationSessionContract } from "../meditation-session";
import { State } from "./app.component.state.ts";
import { Events } from "./app.component.events.ts";
import { Values } from "./app.component.selectors.ts";

type Children = {
  newMeditation: NewMeditationContract & { isOptional: false };
  meditationSession: MeditationSessionContract & { isOptional: false };
};

export type Contract = {
  state: State;
  events: Events;
  values: Values;
  children: Children;
};
