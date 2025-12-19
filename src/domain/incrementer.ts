import { assertIsNotUndefined } from "../util/assert.functions";

export class Incrementer {
  private firstSteps: number[];
  private increment: number;

  constructor(increment: number, firstSteps: number[] = []) {
    this.increment = increment;
    this.firstSteps = firstSteps;
  }

  incrementValue(value: number): number {
    const nextStep = this.firstSteps.find(step => step > value);
    if (nextStep !== undefined) {
      return nextStep;
    }
    return value + this.increment;
  }

  decrementValue(value: number): number {
    const min = Math.min(...this.firstSteps);
    const max = Math.max(...this.firstSteps);
    if (value >= max) {
      return value - this.increment >= min ? value - this.increment : min;
    }
    const previousStep = this.firstSteps
      .slice()
      .reverse()
      .find(step => step < value);
    assertIsNotUndefined(previousStep);
    return previousStep;
  }
}
export const durationIncrementer = new Incrementer(
  15,
  [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
);
export const preparationIncrementer = new Incrementer(20, [0, 5, 10, 20]);
