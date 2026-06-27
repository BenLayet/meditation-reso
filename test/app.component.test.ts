import { describe, it } from "vitest";
import {
  type TestStore,
  initTestStore,
} from "@softer-components/test-utilities";

import { appComponentDef, AppContract } from "../src/components/app";
import {
  BACK_CLICKED,
  DISPLAYED,
  MEDITATION_SESSION_PATH,
  SETTINGS_PATH,
  START_CLICKED,
} from "./app.component.steps.ts";
import { MockDependencies, mockDependencies } from "./mock-dependencies.ts";

describe("app.component", () => {
  let testStore: TestStore<AppContract>;
  let configuration: MockDependencies;
  beforeEach(() => {
    configuration = mockDependencies();
    testStore = initTestStore(appComponentDef(configuration));
  });

  it("before starting meditation duration should be 20 minutes", async () => {
    //WHEN
    await testStore.when(DISPLAYED());

    //THEN
    expect(testStore.getValues(SETTINGS_PATH).durationInMinutes()).toBe(20);
  });
  it("when just started remaining time is 1200 seconds", async () => {
    //WHEN
    await testStore.when(DISPLAYED());
    await testStore.when(START_CLICKED());

    //THEN
    expect(
      testStore.getValues(MEDITATION_SESSION_PATH).remainingTimeInSeconds(),
    ).toBe(1200);
  });
  it("when timer ticked once remaining time is 1199 seconds", async () => {
    //GIVEN
    configuration.tickingService.mockTickCount = 1;

    //WHEN
    await testStore.when(DISPLAYED());
    await testStore.when(START_CLICKED());

    //THEN
    expect(
      testStore.getValues(MEDITATION_SESSION_PATH).remainingTimeInSeconds(),
    ).toBe(1199);
  });
  it("when back is clicked then user should see new meditation screen", async () => {
    //WHEN
    await testStore.when(DISPLAYED());
    await testStore.when(START_CLICKED());
    await testStore.and(BACK_CLICKED());

    //THEN
    expect(testStore.getValues(SETTINGS_PATH).durationInMinutes()).toBe(20);
  });
});
