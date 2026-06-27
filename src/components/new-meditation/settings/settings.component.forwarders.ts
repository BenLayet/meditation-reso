import type { EventForwarders } from "@softer-components/types";
import {
  durationIncrementer,
  preparationIncrementer,
} from "../../../domain/incrementer.ts";
import { Contract } from "./settings.component.contract.ts";

export const eventForwarders = {
  internal: [
    {
      from: "displayed",
      to: "loadSettingsRequested",
      onCondition: ({ values }) => values.isLoadingNeeded(),
    },
    {
      from: "incrementDurationClicked",
      to: "setDurationInMinutesRequested",
      withPayload: ({ values }) =>
        durationIncrementer.incrementValue(values.durationInMinutes()),
    },
    {
      from: "decrementDurationClicked",
      to: "setDurationInMinutesRequested",
      withPayload: ({ values }) =>
        durationIncrementer.decrementValue(values.durationInMinutes()),
    },
    {
      from: "incrementPreparationClicked",
      to: "setPreparationInSecondsRequested",
      withPayload: ({ values }) =>
        preparationIncrementer.incrementValue(
          values.preparationDurationInSeconds(),
        ),
    },
    {
      from: "decrementPreparationClicked",
      to: "setPreparationInSecondsRequested",
      withPayload: ({ values }) =>
        preparationIncrementer.decrementValue(
          values.preparationDurationInSeconds(),
        ),
    },
    {
      from: "isGongOnChanged",
      to: "settingsChanged",
      withPayload: ({ values }) => values.settings(),
    },
    {
      from: "shouldDisplayRemainingTimeChanged",
      to: "settingsChanged",
      withPayload: ({ values }) => values.settings(),
    },
    {
      from: "shouldDisplayProgressChanged",
      to: "settingsChanged",
      withPayload: ({ values }) => values.settings(),
    },
    {
      from: "setDurationInMinutesRequested",
      to: "settingsChanged",
      withPayload: ({ values }) => values.settings(),
    },
    {
      from: "setPreparationInSecondsRequested",
      to: "settingsChanged",
      withPayload: ({ values }) => values.settings(),
    },
    { from: "settingsChanged", to: "saveSettingsRequested" },
  ],
} satisfies EventForwarders<Contract>;
