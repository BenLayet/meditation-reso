import type { NewMeditationContract } from "../new-meditation";
import type { MeditationSessionContract } from "../meditation-session";

export type Children = {
  newMeditation: NewMeditationContract;
  meditationSession: MeditationSessionContract;
};
