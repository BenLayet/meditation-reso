import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Settings } from "./settings/Settings.tsx";

import { useSofter } from "@softer-components/redux-adapter";
import packageJson from "../../../package.json";
import type { NewMeditationContract } from "./new-meditation.component.ts";

const envBuild = (import.meta as any).env?.VITE_BUILD as string | undefined;
const build = `${packageJson?.version}-${envBuild ?? "dev"}`;
export const NewMeditation = ({ path } = { path: "/" }) => {
  const [_, d, c] = useSofter<NewMeditationContract>(path);
  const { t } = useTranslation();
  return (
    <div className="card" style={{ maxWidth: "25em" }}>
      {/* Container for settings and progress visualization */}
      <div
        style={{
          minHeight: "200px",
          fontSize: "1.5em",
          position: "relative",
        }}
      >
        <Settings path={c.settings} />
      </div>
      {/* Timer display and start/stop controls */}
      <div style={{ fontSize: "3em" }}>
        {/* Start button - shown when ready to begin */}
        <button
          aria-label={t("startMeditation")}
          onClick={() => {
            d.startClicked();
          }}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
      <p
        style={{
          fontSize: "0.8em",
          opacity: 0.4,
          position: "absolute",
          bottom: "1em",
          right: "1em",
        }}
      >
        v{build}
      </p>
    </div>
  );
};
