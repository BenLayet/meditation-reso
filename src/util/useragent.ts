export function isAndroidOnWebView() {
  return /mobileApplication/i.test(navigator.userAgent);
}
