import { useTranslation } from "react-i18next";
import { ProgressIndicator } from "./ProgressIndicator.tsx";

import { useSofter, useSofterEffects } from "@softer-components/redux-adapter";
import { configuration } from "../../config/configuration.ts";
import type { MeditationSessionContract } from "./meditation-session.component.ts";

export const MeditationSession = ({ path } = { path: "/" }) => {
  const [v, d] = useSofter<MeditationSessionContract>(path);
  useSofterEffects<MeditationSessionContract>(
    path,
    configuration().meditationSessionEffects,
  );
  const { t } = useTranslation();
  return (
    <div
      data-theme="dark"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div
        style={{
          maxWidth: "25em",
        }}
      >
        {/* Container for settings and progress visualization */}
        <div
          style={{
            minHeight: "200px",
            fontSize: "1.5em",
            position: "relative",
          }}
        >
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
                      top: "41%",
                      fontSize: "1.5em",
                      background: "#0006",
                      opacity: 0.5,
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
        <div>
          <button
            style={{
              opacity: v.isCompletedPhase ? "0.9" : "0.4",
              fontSize: "2em",
              marginTop: "2em",
            }}
            aria-label={t("stopMeditation")}
            onClick={() => {
              d.backClicked();
            }}
          >
            {" "}
            {t("back")}
          </button>
        </div>
      </div>
    </div>
  );
};
