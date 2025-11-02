import {
  faMinus,
  faPlay,
  faPlus,
  faStop,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import {
  calculateDecrementedDuration,
  calculateIncrementedDuration,
  formatSeconds,
} from "../../util/duration.functions";
import gongSound from "../../assets/gong.mp3";

const DURATION_INCREMENT_MINUTES = 5;
const DEFAULT_DURATION_MINUTES = 20;
const DURATION_COOKIE_NAME = "reso_meditation_duration_minutes";
const GONG_COOKIE_NAME = "reso_meditation_gong_enabled";

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

export const Timer = () => {
  const [durationMinutes, setDurationMinutes] = useState(getSavedDuration());
  const [remainingSeconds, setRemainingSeconds] = useState(
    durationMinutes * 60,
  );
  const [isGongOn, setIsGongOn] = useState(getSavedGongEnabled());
  const [isRunning, setIsRunning] = useState(false);
  const [isReadyToStart, setIsReadyToStart] = useState(true);
  const canBeStopped = !isReadyToStart;
  const timeString = formatSeconds(remainingSeconds);

  // Audio ref for the gong sound
  const startAudioRef = useRef<HTMLAudioElement | null>(null);
  const stopAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    startAudioRef.current = new Audio(gongSound);
    startAudioRef.current.preload = "auto";
    stopAudioRef.current = new Audio(gongSound);
    stopAudioRef.current.preload = "auto";
  }, []);

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
  const startClicked = () => {
    setIsRunning(true);
    setIsReadyToStart(false);

    // Play gong sound at start
    if (startAudioRef.current) {
      startAudioRef.current.currentTime = 0;
      startAudioRef.current
        .play()
        .catch(err => console.error("Audio play failed:", err));
    }
    // Load stop gong on user action so it works on iOS
    if (stopAudioRef.current) {
      stopAudioRef.current.currentTime = 0;
      stopAudioRef.current.load();
    }
  };
  const stopClicked = () => {
    setIsRunning(false);
    setIsReadyToStart(true);
    setRemainingSeconds(durationMinutes * 60);
    if (stopAudioRef.current) {
      stopAudioRef.current.pause();
    }
    if (startAudioRef.current) {
      startAudioRef.current.pause();
    }
  };
  const gongToggleClicked = () => {
    setIsGongOn(prev => !prev);
  };

  useEffect(() => {
    if (stopAudioRef.current) {
      stopAudioRef.current.volume = isGongOn ? 1.0 : 0.0;
    }
    if (startAudioRef.current) {
      startAudioRef.current.volume = isGongOn ? 1.0 : 0.0;
    }
    // Save gong setting to cookie whenever it changes
    setCookie(GONG_COOKIE_NAME, isGongOn.toString());
  }, [isGongOn]);

  useEffect(() => {
    setRemainingSeconds(durationMinutes * 60);
    // Save duration to cookie whenever it changes
    setCookie(DURATION_COOKIE_NAME, durationMinutes.toString());
  }, [durationMinutes]);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      setIsRunning(false);
      // Play gong sound when timer finishes
      if (stopAudioRef.current) {
        stopAudioRef.current.currentTime = 0;
        stopAudioRef.current
          .play()
          .catch(err => console.error("Audio play failed:", err));
      }
    }
  }, [remainingSeconds]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [isRunning]);

  return (
    <div style={{ maxWidth: "40em" }}>
      <div
        style={{ minHeight: "5em", fontSize: "2em" }}
        className={`fadein ${isReadyToStart ? "" : "hidden"}`}
      >
        <div className="horizontal">
          <span>Durée&nbsp;</span>
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
        <div className="horizontal">
          <span>Gong&nbsp;</span>
          <button onClick={() => gongToggleClicked()}>
            {isGongOn ? "on " : "off"}&nbsp;
            <FontAwesomeIcon icon={isGongOn ? faVolumeHigh : faVolumeXmark} />
          </button>
        </div>
      </div>
      <div style={{ fontSize: "5em" }}>
        <div>{timeString}</div>
        {isReadyToStart && (
          <button
            aria-label="Commencer la méditation"
            onClick={() => startClicked()}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        {canBeStopped && (
          <button
            aria-label="Arrêter la méditation"
            onClick={() => stopClicked()}
          >
            <FontAwesomeIcon icon={faStop} />
          </button>
        )}
      </div>
    </div>
  );
};
