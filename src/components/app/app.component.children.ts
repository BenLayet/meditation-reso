import { ChildrenConfig } from "@softer-components/types";
import { Contract } from "./app.component.contract.ts";
export const childrenConfig: ChildrenConfig<Contract> = {
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
};
