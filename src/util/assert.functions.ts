export function assertIsNotUndefined<T>(
  value: T | undefined,
): asserts value is T {
  if (value === undefined) {
    throw new Error("Expected value to be defined, but received undefined.");
  }
}
