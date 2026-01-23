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
      <div className="settings-row">
        <div className="settings-key">{t("duration")}</div>
        <div className="settings-value">
          <div style={{ maxWidth: "5em" }}>
            <div style={{ fontSize: "1.5em" }}>{v.duration}</div>
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
      {/* Preparation adjustment controls */}
      <div className="settings-row">
        <div className="settings-key">{t("preparation")}</div>
        <div className="settings-value">
          <div style={{ maxWidth: "5em" }}>
            <div style={{ fontSize: "1.5em" }}>{v.preparation}</div>
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
      </div>
      {/* Gong sound toggle */}
      <div className="settings-row">
        <div className="settings-key">{t("gong")}</div>
        <div className="settings-value">
          <label>
            <input
              type="checkbox"
              checked={v.isGongOn}
              onChange={e => {
                d.isGongOnChanged(e.target.checked);
              }}
            />
            &nbsp;
            <FontAwesomeIcon icon={v.isGongOn ? faVolumeHigh : faVolumeXmark} />
          </label>
        </div>
      </div>
      <div className="settings-row">
        <div className="settings-key">Afficher</div>
        <div className="settings-value">
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
    </div>
  );
};
