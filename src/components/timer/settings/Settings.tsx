import {
  faMinus,
  faPlus,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSofter, useSofterEffects } from "@softer-components/redux-adapter";
import { SettingsContract } from "./settings.component";
import { settingsEffects } from "./settings.effects";
import { useEffect } from "react";

export const Settings = ({ path = "" }) => {
  const [v, d] = useSofter<SettingsContract>(path);
  useSofterEffects<SettingsContract>(path, settingsEffects);
  useEffect(() => {
    const ret = d.displayed();
    console.log("Settings displayed:", ret);
  }, []);

  return (
    <div className="settings">
      {/* Duration adjustment controls */}
      <div className="horizontal settings-row">
        <div style={{ width: "50%" }} className="settings-key">
          Durée&nbsp;
        </div>
        <div style={{ width: "50%" }} className="settings-value">
          <div style={{ maxWidth: "5em" }}>
            <div style={{ fontSize: "1.5em" }}>{v.duration}</div>
            <div className="horizontal">
              <button
                aria-label="Augmenter la durée de la méditation"
                onClick={() => d.plusClicked()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                aria-label="Diminuer la durée de la méditation"
                onClick={() => d.minusClicked()}
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
          Gong&nbsp;
        </div>
        <div style={{ width: "50%" }} className="settings-value">
          <div style={{ alignItems: "flex-start" }}>
            <label>
              <input
                type="checkbox"
                checked={v.isGongOn}
                onChange={e => d.isGongOnChanged(e.target.checked)}
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
