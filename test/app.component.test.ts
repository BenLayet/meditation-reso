import { givenRootComponent } from "@softer-components/utils/test-utilities";
import { describe, it } from "vitest";

import { appComponentDef } from "../src/components/app/app.component";
import {
  BACK_CLICKED,
  MEDITATION_SESSION_PATH,
  SETTINGS_PATH,
  START_CLICKED,
  TIMER_TICKED,
} from "./app.component.steps.ts";

describe("app.component", () => {
  it("before starting meditation duration should be 20 minutes", () => {
    givenRootComponent(appComponentDef)
      .thenExpect(SETTINGS_PATH)
      .durationInMinutes.toBe(20);
  });
  it("when just started remaining time is 1200 seconds", () => {
    givenRootComponent(appComponentDef)
      .when(START_CLICKED())
      .thenExpect(MEDITATION_SESSION_PATH)
      .remainingTimeInSeconds.toBe(1200);
  });
  it("when timer ticked once remaining time is 1199 seconds", () => {
    givenRootComponent(appComponentDef)
      .when(START_CLICKED())
      .and(TIMER_TICKED())
      .thenExpect(MEDITATION_SESSION_PATH)
      .remainingTimeInSeconds.toBe(1199);
  });
  it("when back is clicked then user should see new meditation screen", () => {
    givenRootComponent(appComponentDef)
      .when(START_CLICKED())
      .and(TIMER_TICKED())
      .and(BACK_CLICKED())
      .thenExpect(SETTINGS_PATH)
      .durationInMinutes.toBe(20);
  });
});
