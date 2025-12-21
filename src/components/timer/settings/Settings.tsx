import {
  faMinus,
  faPlus,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSofter, useSofterEffects } from "@softer-components/redux-adapter";
import type { SettingsContract } from "./settings.component";
import { useEffect } from "react";
import { configuration } from "../../../config/configuration.ts";

export const Settings = ({ path = "" }) => {
  const [v, d] = useSofter<SettingsContract>(path);
  useSofterEffects<SettingsContract>(path, configuration().settingsEffects);
  useEffect(() => {
    d.displayed();
  }, [d]);

  return (
    <div className="settings">
      {/* Duration adjustment controls */}
      <div className="settings-row">
        <div className="settings-key">Durée</div>
        <div className="settings-value">
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
      <div className="settings-row">
        <div className="settings-key">Préparation</div>
        <div className="settings-value">
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
      <div className="settings-row">
        <div className="settings-key">Gong</div>
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
            &nbsp;progression
          </label>
          <label>
            <input
              type="checkbox"
              checked={v.shouldDisplayRemainingTime}
              onChange={e => {
                d.shouldDisplayRemainingTimeChanged(e.target.checked);
              }}
            />
            &nbsp;temps restant
          </label>
        </div>
      </div>
    </div>
  );
};
