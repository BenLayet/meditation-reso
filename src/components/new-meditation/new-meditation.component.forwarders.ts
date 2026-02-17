import type { InternalEventForwarders } from "@softer-components/types";
import { Contract } from "./new-meditation.component.contract.ts";

export const eventForwarders: InternalEventForwarders<Contract> = [
  {
    from: "startClicked",
    to: "startRequested",
    withPayload: ({ childrenValues }) =>
      childrenValues.settings.values.settings(),
  },
];
