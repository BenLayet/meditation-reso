import packageJson from "../../package.json";
import buildInfoJson from "../../build-info.json";
const localizedBuildInfo = {
  version: packageJson.version,
  ...buildInfoJson,
  builtAt: new Date(buildInfoJson.builtAt).toLocaleString(),
};
export const VERSION = Object.values(localizedBuildInfo).join("-");
