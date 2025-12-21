export function isInIframe() {
  try {
    return window.self !== window.top;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    // Accessing window.top threw (cross-origin) -> definitely inside an iframe
    return true;
  }
}
