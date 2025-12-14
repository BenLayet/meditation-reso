import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressIndicator } from "./ProgressIndicator";
import { Settings } from "./settings/Settings";

import { TimerContract } from "./timer.component";
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
          <div className={`fadein ${v.areSettingsVisible ? "" : "hidden"}`}>
            <Settings path={c.settings} />
          </div>

          <div
            className={`fadein ${v.isProgressVisible ? "" : "hidden"}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            {/* Circular progress indicator - shown during meditation */}
            {v.isProgressVisible && (
              <>
                <ProgressIndicator durationInSeconds={v.durationInSeconds} />{" "}
                {/* Remaining time display */}
                <div
                  style={{
                    opacity: 0.4,
                    position: "absolute",
                    top: "47%",
                  }}
                >
                  {v.remainingTime}
                </div>
              </>
            )}
          </div>
        </div>
        {/* Timer display and start/stop controls */}
        <div style={{ fontSize: "3em" }}>
          {/* Start button - shown when ready to begin */}
          {v.isReadyToStart && (
            <button
              style={{ fontSize: "0.7em" }}
              aria-label="Commencer la méditation"
              onClick={() => d.startClicked()}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          {/* Stop button - shown during meditation */}
          {v.canBeStopped && (
            <button
              style={{ fontSize: "0.7em" }}
              aria-label="Arrêter la méditation"
              onClick={() => d.stopClicked()}
            >
              <FontAwesomeIcon icon={faStop} />
            </button>
          )}
        </div>
        {v.isReadyToStart && (
          <p
            style={{
              fontSize: "0.8em",
              opacity: 0.4,
              position: "absolute",
              bottom: "1em",
              right: "1em",
            }}
          >
            v0.3.0
          </p>
        )}
      </div>
    </>
  );
};
