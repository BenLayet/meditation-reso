export class Incrementer {
  private readonly firstSteps: number[];
  private readonly increment: number;

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
    const decremented = value - this.increment;
    if (decremented >= max) {
      return decremented;
    }
    const previousStep = this.firstSteps
      .slice()
      .reverse()
      .find(step => step < value);
    if (previousStep) {
      return previousStep;
    }
    return min;
  }
}
export const durationIncrementer = new Incrementer(
  15,
  [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
);
export const preparationIncrementer = new Incrementer(20, [0, 5, 10, 20]);
