import { describe, it, expect } from "vitest";
import {
  Incrementer,
  durationIncrementer,
  preparationIncrementer,
} from "./incrementer";

describe("Incrementer", () => {
  describe("incrementValue", () => {
    it("should increment by specified value when not in first steps", () => {
      const incrementer = new Incrementer(5);
      expect(incrementer.incrementValue(10)).toBe(15);
    });

    it("should jump to next first step when available", () => {
      const incrementer = new Incrementer(5, [1, 5, 10]);
      expect(incrementer.incrementValue(3)).toBe(5);
    });
  });

  describe("decrementValue", () => {
    it("should decrement by specified value when above first steps", () => {
      const incrementer = new Incrementer(5, [1, 5, 10]);
      expect(incrementer.decrementValue(20)).toBe(15);
    });

    it("should jump to previous first step when within range", () => {
      const incrementer = new Incrementer(5, [1, 5, 10]);
      expect(incrementer.decrementValue(7)).toBe(5);
    });

    it("should return first step when below range", () => {
      const incrementer = new Incrementer(5, [1, 5, 10]);
      expect(incrementer.decrementValue(0)).toBe(1);
    });
  });

  describe("exported instances", () => {
    it("durationIncrementer should have correct configuration", () => {
      expect(durationIncrementer.incrementValue(61)).toBe(76);
      expect(durationIncrementer.decrementValue(61)).toBe(60);
      expect(durationIncrementer.decrementValue(60)).toBe(55);
    });

    it("preparationIncrementer should have correct configuration", () => {
      expect(preparationIncrementer.incrementValue(21)).toBe(41);
      expect(preparationIncrementer.decrementValue(21)).toBe(20);
      expect(preparationIncrementer.decrementValue(20)).toBe(10);
    });
  });
});
