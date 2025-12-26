import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressIndicator } from "./ProgressIndicator";
import { Settings } from "./settings/Settings";
import { useTranslation } from "react-i18next";

import type { TimerContract } from "./timer.component";
import { useSofter, useSofterEffects } from "@softer-components/redux-adapter";
import { configuration } from "../../config/configuration.ts";
import packageJson from "../../../package.json";

const envBuild = (import.meta as any).env?.VITE_BUILD as string | undefined;
const build =
  envBuild && envBuild.length ? envBuild : (packageJson?.version ?? "");
export const Timer = ({ path } = { path: "/" }) => {
  const [v, d, c] = useSofter<TimerContract>(path);
  useSofterEffects<TimerContract>(path, configuration().timerEffects);
  const { t } = useTranslation();
  return (
    <>
      <div style={{ maxWidth: "25em" }}>
        {/* Container for settings and progress visualization */}
        <div
          style={{
            minHeight: "200px",
            fontSize: "1.5em",
            position: "relative",
          }}
        >
          {/* Settings panel - shown before meditation starts */}
          <div className={`fadein ${v.isSettingsPhase ? "" : "hidden"}`}>
            <Settings path={c.settings} />
          </div>

          <div
            className={`fadein ${v.isPreparationPhase ? "" : "hidden"}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            {/* Preparation time */}
            {v.isPreparationPhase && (
              <div>
                <p>{t("preparation")}</p>
                {v.remainingTime}
              </div>
            )}
          </div>
          <div
            className={`fadein ${v.isMeditationPhase ? "" : "hidden"}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            {/* Circular progress indicator - shown during meditation */}
            {v.isMeditationPhase && (
              <>
                {v.shouldDisplayProgress && (
                  <ProgressIndicator durationInSeconds={v.durationInSeconds} />
                )}
                {v.shouldDisplayRemainingTime && (
                  <span
                    style={{
                      position: "absolute",
                      top: "47%",
                      fontSize: "1.5em",
                      background: "#0006",
                    }}
                  >
                    {v.remainingTime}
                  </span>
                )}
              </>
            )}
          </div>
          <div
            className={`fadein ${v.isCompletedPhase ? "" : "hidden"}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            {v.isCompletedPhase && <p>{t("sessionCompleted")}</p>}
          </div>
        </div>
        {/* Timer display and start/stop controls */}
        <div style={{ fontSize: "3em" }}>
          {/* Start button - shown when ready to begin */}
          {v.canBeStarted && (
            <button
              style={{ fontSize: "0.7em" }}
              aria-label={t("startMeditation")}
              onClick={() => {
                d.startClicked();
              }}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          {/* Stop button - shown during meditation */}
          {v.canBeStopped && (
            <button
              style={{
                fontSize: "0.7em",
                opacity: v.isCompletedPhase ? "0.9" : "0.4",
              }}
              aria-label={t("stopMeditation")}
              onClick={() => {
                d.stopClicked();
              }}
            >
              {" "}
              {t("back")}
            </button>
          )}
        </div>
        {v.isSettingsPhase && (
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
        )}
      </div>
    </>
  );
};
