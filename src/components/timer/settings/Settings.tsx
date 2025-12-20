import {
  faMinus,
  faPlus,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSofter, useSofterEffects } from "@softer-components/redux-adapter";
import type { SettingsContract } from "./settings.component";
import { settingsEffects } from "./settings.effects";
import { useEffect } from "react";

export const Settings = ({ path = "" }) => {
  const [v, d] = useSofter<SettingsContract>(path);
  useSofterEffects<SettingsContract>(path, settingsEffects);
  useEffect(() => {
    d.displayed();
  }, [d]);

  return (
    <div className="settings">
      {/* Duration adjustment controls */}
      <div className="horizontal settings-row">
        <div style={{ width: "50%" }} className="settings-key">
          Durée
        </div>
        <div style={{ width: "50%" }} className="settings-value">
          <div style={{ maxWidth: "5em" }}>
            <div style={{ fontSize: "1.5em" }}>{v.duration}</div>
            <div className="horizontal">
              <button
                aria-label="Augmenter la durée de la méditation"
                onClick={() => {
                  d.incrementDurationClicked();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                aria-label="Diminuer la durée de la méditation"
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
      <div className="horizontal settings-row">
        <div style={{ width: "50%" }} className="settings-key">
          Préparation
        </div>
        <div style={{ width: "50%" }} className="settings-value">
          <div style={{ maxWidth: "5em" }}>
            <div style={{ fontSize: "1.5em" }}>{v.preparation}</div>
            <div className="horizontal">
              <button
                aria-label="Augmenter la durée de la préparation"
                onClick={() => {
                  d.incrementPreparationClicked();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                aria-label="Diminuer la durée de la préparation"
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
      <div className="horizontal settings-row">
        <div style={{ width: "50%" }} className="settings-key">
          Gong
        </div>
        <div style={{ width: "50%" }} className="settings-value">
          <div style={{ alignItems: "flex-start" }}>
            <label>
              <input
                type="checkbox"
                checked={v.isGongOn}
                onChange={e => {
                  d.isGongOnChanged(e.target.checked);
                }}
              />
              &nbsp;
              <FontAwesomeIcon
                icon={v.isGongOn ? faVolumeHigh : faVolumeXmark}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
