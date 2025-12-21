export function assertIsNotUndefined<T>(
  value: T | undefined,
  message = "Expected value to be defined, but received undefined."
): asserts value is T {
  if (value === undefined) {
    throw new Error(message);
  }
}
export function assertIsUndefined(
  value: unknown,
  message = "Expected value to be undefined, but received :"
): asserts value is undefined {
  if (value !== undefined) {
    throw new Error(message);
  }
}
