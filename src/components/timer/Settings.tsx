import {
  faMinus,
  faPlus,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  calculateDecrementedDuration,
  calculateIncrementedDuration,
  formatSeconds,
} from "../../util/duration.functions";

const DURATION_INCREMENT_MINUTES = 5;
const DEFAULT_DURATION_MINUTES = 20;
const DURATION_COOKIE_NAME = "reso_meditation_duration_minutes";
const GONG_COOKIE_NAME = "reso_meditation_gong_enabled";
const BLACK_SCREEN_COOKIE_NAME = "reso_meditation_black_screen";

// Cookie helper functions
const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const getSavedDuration = (): number => {
  const saved = getCookie(DURATION_COOKIE_NAME);
  if (saved) {
    const parsed = parseInt(saved, 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return DEFAULT_DURATION_MINUTES;
};

const getSavedGongEnabled = (): boolean => {
  const saved = getCookie(GONG_COOKIE_NAME);
  if (saved !== null) {
    return saved === "true";
  }
  return true; // Default to enabled
};

const getSavedBlackScreen = (): boolean => {
  const saved = getCookie(BLACK_SCREEN_COOKIE_NAME);
  if (saved !== null) {
    return saved === "true";
  }
  return false; // Default to disabled
};
interface SettingsProps {
  onDurationChanged: (value: number) => void;
  onGongChanged: (value: boolean) => void;
  onShowBlackScreenChanged: (value: boolean) => void;
}

export const Settings = ({
  onDurationChanged,
  onGongChanged,
  onShowBlackScreenChanged,
}: SettingsProps) => {
  const [durationMinutes, setDurationMinutes] = useState(getSavedDuration());
  const [isGongOn, setIsGongOn] = useState(getSavedGongEnabled());
  const [showBlackScreen, setShowBlackScreen] = useState(getSavedBlackScreen());
  const plusClicked = () => {
    setDurationMinutes(
      calculateIncrementedDuration(durationMinutes, DURATION_INCREMENT_MINUTES),
    );
  };
  const minusClicked = () => {
    setDurationMinutes(
      calculateDecrementedDuration(durationMinutes, DURATION_INCREMENT_MINUTES),
    );
  };
  useEffect(() => {
    // Save gong setting to cookie whenever it changes
    setCookie(GONG_COOKIE_NAME, isGongOn.toString());
    onGongChanged(isGongOn);
  }, [isGongOn]);

  useEffect(() => {
    // Save duration to cookie whenever it changes
    setCookie(DURATION_COOKIE_NAME, durationMinutes.toString());
    onDurationChanged(durationMinutes);
  }, [durationMinutes]);

  useEffect(() => {
    // Save showBlackScreen setting to cookie whenever it changes
    setCookie(BLACK_SCREEN_COOKIE_NAME, showBlackScreen.toString());
    onShowBlackScreenChanged(showBlackScreen);
  }, [showBlackScreen]);

  return (
    <div className="settings">
      {/* Duration adjustment controls */}
      <div className="horizontal settings-row">
        <div style={{ width: "50%" }} className="settings-key">
          Durée&nbsp;
        </div>
        <div style={{ width: "50%" }} className="settings-value">
          <div style={{ fontSize: "1.5em" }}>
            {formatSeconds(durationMinutes * 60)}&nbsp;
          </div>
          <div className="horizontal ">
            <button
              aria-label="Augmenter la durée de la méditation"
              onClick={() => plusClicked()}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              aria-label="Diminuer la durée de la méditation"
              onClick={() => minusClicked()}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
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
                checked={isGongOn}
                onChange={e => setIsGongOn(e.target.checked)}
              />
              &nbsp;
              <FontAwesomeIcon icon={isGongOn ? faVolumeHigh : faVolumeXmark} />
            </label>
          </div>
        </div>
      </div>
      {/* Display options */}
      <div className="horizontal settings-row">
        <div style={{ width: "50%" }} className="settings-key">
          Écran noir&nbsp;
        </div>
        <div style={{ width: "50%" }} className="settings-value">
          <div style={{ alignItems: "flex-start" }}>
            <label>
              <input
                type="checkbox"
                checked={showBlackScreen}
                onChange={e => setShowBlackScreen(e.target.checked)}
              />
              &nbsp;{showBlackScreen ? "Activé" : "Désactivé"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
