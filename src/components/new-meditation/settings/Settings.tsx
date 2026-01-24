import {
  faMinus,
  faPlus,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSofter, useSofterEffects } from "@softer-components/redux-adapter";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { configuration } from "../../../config/configuration.ts";
import type { SettingsContract } from "./settings.component.ts";

export const Settings = ({ path = "" }) => {
  const [v, d] = useSofter<SettingsContract>(path);
  useSofterEffects<SettingsContract>(path, configuration().settingsEffects);
  useEffect(() => {
    d.displayed();
  }, [d]);
  const { t } = useTranslation();

  return (
    <div className="settings">
      {/* Duration adjustment controls */}
      <div className="settings-main">
        <div className="settings-key">{t("duration")}</div>
        <div className="settings-value">
          <div>
            <div>{v.duration}</div>
            <div className="horizontal">
              <button
                className="round-btn"
                aria-label={t("increaseDuration")}
                onClick={() => {
                  d.incrementDurationClicked();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className="round-btn"
                aria-label={t("decreaseDuration")}
                onClick={() => {
                  d.decrementDurationClicked();
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-secondary">
        <div style={{ marginBottom: "1em" }}>
          <div>{t("preparation")}</div>
          <div style={{ fontSize: "1.3em" }}>
            <div>{v.preparation}</div>
            <div className="horizontal">
              <button
                className="round-btn"
                aria-label={t("increasePreparation")}
                onClick={() => {
                  d.incrementPreparationClicked();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className="round-btn"
                aria-label={t("decreasePreparation")}
                onClick={() => {
                  d.decrementPreparationClicked();
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
        </div>
        <label>
          <input
            type="checkbox"
            checked={v.isGongOn}
            onChange={e => {
              d.isGongOnChanged(e.target.checked);
            }}
          />
          &nbsp;{t("gong")}&nbsp;
          <span>
            <FontAwesomeIcon icon={v.isGongOn ? faVolumeHigh : faVolumeXmark} />
          </span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={v.shouldDisplayProgress}
            onChange={e => {
              d.shouldDisplayProgressChanged(e.target.checked);
            }}
          />
          &nbsp;{t("progression")}
        </label>
        <label>
          <input
            type="checkbox"
            checked={v.shouldDisplayRemainingTime}
            onChange={e => {
              d.shouldDisplayRemainingTimeChanged(e.target.checked);
            }}
          />
          &nbsp;{t("remainingTime")}
        </label>
      </div>
    </div>
  );
};
