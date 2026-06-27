import type { EventForwarders } from "@softer-components/types";
import { Contract } from "./app.component.contract.ts";

export const eventForwarders = {
  children: {
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
} satisfies EventForwarders<Contract>;
