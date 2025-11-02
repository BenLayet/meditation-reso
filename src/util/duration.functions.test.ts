import { describe, it, expect } from "vitest";
import { formatSeconds } from "./duration.functions.js";

describe("formatSeconds", () => {
  it("formats under a minute", () => {
    expect(formatSeconds(0)).toBe("00:00");
    expect(formatSeconds(5)).toBe("00:05");
    expect(formatSeconds(59)).toBe("00:59");
  });

  it("formats minutes correctly", () => {
    expect(formatSeconds(60)).toBe("01:00");
    expect(formatSeconds(61)).toBe("01:01");
    expect(formatSeconds(3599)).toBe("59:59");
  });

  it("formats hours when >= 1 hour", () => {
    expect(formatSeconds(3600)).toBe("01:00:00");
    expect(formatSeconds(3661)).toBe("01:01:01");
    expect(formatSeconds(37230)).toBe("10:20:30"); // 10h 20m 30s
  });

  it("handles large hour values", () => {
    expect(formatSeconds(86399)).toBe("23:59:59");
    expect(formatSeconds(90000)).toBe("25:00:00");
  });

  it("floors fractional seconds", () => {
    expect(formatSeconds(65.9)).toBe("01:05"); // floors to 65 -> 01:05
    expect(formatSeconds(3600.4)).toBe("01:00:00");
  });
});
