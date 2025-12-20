import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressIndicator } from "./ProgressIndicator";
import { Settings } from "./settings/Settings";

import type { TimerContract } from "./timer.component";
import { useSofter, useSofterEffects } from "@softer-components/redux-adapter";
import { timerEffects } from "./timer.effects";
export const Timer = ({ path } = { path: "/" }) => {
  const [v, d, c] = useSofter<TimerContract>(path);
  useSofterEffects<TimerContract>(path, timerEffects);
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
                <p>Préparation</p>
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
                <ProgressIndicator durationInSeconds={v.durationInSeconds} />{" "}
                {/* Remaining time display */}
                <div
                  style={{
                    position: "absolute",
                    top: "42%",
                  }}
                >
                  {v.remainingTime}
                </div>
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
            {v.isCompletedPhase && <p>Session terminée</p>}
          </div>
        </div>
        {/* Timer display and start/stop controls */}
        <div style={{ fontSize: "3em" }}>
          {/* Start button - shown when ready to begin */}
          {v.canBeStarted && (
            <button
              style={{ fontSize: "0.7em" }}
              aria-label="Commencer la méditation"
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
              style={{ fontSize: "0.7em", opacity: v.isCompletedPhase?"0.9": "0.4" }}
              aria-label="Arrêter la méditation"
              onClick={() => {
                d.stopClicked();
              }}
            > Arrêter
            </button>
          )}
        </div>
        {v.isSettingsPhase &&  <p
          style={{
            fontSize: "0.8em",
            opacity: 0.4,
            position: "absolute",
            bottom: "1em",
            right: "1em",
          }}
        >
          v0.7.0
        </p>
        }
      </div>
    </>
  );
};
