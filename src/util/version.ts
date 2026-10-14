import packageJson from "../../package.json";
import buildInfoJson from "../../build-info.json";
import { isAndroidOnWebView } from "./useragent.ts";
const localizedBuildInfo = {
  version: packageJson.version,
  ...buildInfoJson,
  builtAt: new Date(buildInfoJson.builtAt).toLocaleString(),
  mobileOs: isAndroidOnWebView() ? "A" : "I",
};
export const VERSION = Object.values(localizedBuildInfo).join("-");
