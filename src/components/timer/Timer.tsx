import {
  faMinus,
  faPlay,
  faPlus,
  faStop,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import gongSound from "../../assets/gong.mp3";
import {
  calculateDecrementedDuration,
  calculateIncrementedDuration,
  formatSeconds,
} from "../../util/duration.functions";

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

// Fullscreen helper functions
const enterFullscreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem
      .requestFullscreen()
      .catch(err => console.error("Fullscreen failed:", err));
  }
};

const exitFullscreen = () => {
  if (document.fullscreenElement) {
    document
      .exitFullscreen()
      .catch(err => console.error("Exit fullscreen failed:", err));
  }
};

// Wake lock helper functions to prevent sleep
const requestWakeLock = async (): Promise<WakeLockSentinel | null> => {
  try {
    if ("wakeLock" in navigator) {
      const wakeLock = await navigator.wakeLock.request("screen");
      console.log("Wake Lock activated");
      return wakeLock;
    }
  } catch (err) {
    console.error("Wake Lock failed:", err);
  }
  return null;
};

const releaseWakeLock = async (wakeLock: WakeLockSentinel | null) => {
  if (wakeLock) {
    try {
      await wakeLock.release();
      console.log("Wake Lock released");
    } catch (err) {
      console.error("Wake Lock release failed:", err);
    }
  }
};

export const Timer = () => {
  const [durationMinutes, setDurationMinutes] = useState(getSavedDuration());
  const [remainingSeconds, setRemainingSeconds] = useState(
    durationMinutes * 60,
  );
  const [isGongOn, setIsGongOn] = useState(getSavedGongEnabled());
  const [isRunning, setIsRunning] = useState(false);
  const [isReadyToStart, setIsReadyToStart] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const canBeStopped = !isReadyToStart;
  const timeString = formatSeconds(remainingSeconds);
  const completion =
    (durationMinutes * 60 - remainingSeconds) / (durationMinutes * 60);

  // Audio ref for the gong sound
  const startAudioRef = useRef<HTMLAudioElement | null>(null);
  const stopAudioRef = useRef<HTMLAudioElement | null>(null);

  // Wake lock ref to keep screen awake
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    startAudioRef.current = new Audio(gongSound);
    startAudioRef.current.preload = "auto";
    stopAudioRef.current = new Audio(gongSound);
    stopAudioRef.current.preload = "auto";

    // Cleanup: release wake lock on unmount
    return () => {
      if (wakeLockRef.current) {
        releaseWakeLock(wakeLockRef.current);
      }
    };
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
  const startClicked = async () => {
    setIsRunning(true);
    setIsReadyToStart(false);

    // Enter fullscreen
    enterFullscreen();

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

    // Request wake lock to prevent sleep
    wakeLockRef.current = await requestWakeLock();
  };
  const stopClicked = async () => {
    setIsRunning(false);
    setIsReadyToStart(true);
    setRemainingSeconds(durationMinutes * 60);

    // Exit fullscreen
    exitFullscreen();

    // Release wake lock
    await releaseWakeLock(wakeLockRef.current);
    wakeLockRef.current = null;

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

      // Exit fullscreen when timer finishes
      exitFullscreen();

      // Release wake lock when timer finishes
      releaseWakeLock(wakeLockRef.current);
      wakeLockRef.current = null;

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
      {/* Container for settings and progress visualization */}
      <div
        style={{ minHeight: "200px", fontSize: "2em", position: "relative" }}
      >
        {/* Settings panel - shown before meditation starts */}
        <div className={`fadein ${isReadyToStart ? "" : "hidden"}`}>
          {/* Duration adjustment controls */}
          <div className="horizontal">
            <div style={{ width: "50%" }} className="settings-key">
              Durée&nbsp;
            </div>
            <div style={{ width: "50%" }} className="horizontal settings-value">
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
          {/* Gong sound toggle */}
          <div className="horizontal">
            <div style={{ width: "50%" }} className="settings-key">
              Gong&nbsp;
            </div>
            <div style={{ width: "50%" }} className="settings-value">
              <button onClick={() => gongToggleClicked()}>
                {isGongOn ? "on " : "off"}&nbsp;
                <FontAwesomeIcon
                  icon={isGongOn ? faVolumeHigh : faVolumeXmark}
                />
              </button>
            </div>
          </div>
          {/* Display options */}
          <div className="horizontal">
            <div style={{ width: "50%" }} className="settings-key">
              Affichage&nbsp;
            </div>
            <div style={{ width: "50%" }} className="settings-value">
              <div style={{ alignItems: "flex-start" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={showProgress}
                    onChange={e => setShowProgress(e.target.checked)}
                  />
                  &nbsp;Progression
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showTime}
                    onChange={e => setShowTime(e.target.checked)}
                  />
                  &nbsp;Temps restant
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Circular progress indicator - shown during meditation */}
        {showProgress && (
          <div
            style={{
              minHeight: "200px",
              position: "absolute",
              top: 0,
              pointerEvents: "none",
            }}
            className={`fadein ${!isReadyToStart ? "" : "hidden"}`}
          >
            <svg width="200" height="200" viewBox="0 0 200 200">
              {/* Progress - background */}
              <circle cx="100" cy="100" r="95" fill="#111111" />
              {/* white portion - progress of meditation */}
              <path
                d={`M 100 100 L 100 10 A 90 90 0 ${completion > 0.5 ? 1 : 0} 1 ${
                  100 + 90 * Math.sin(completion * 2 * Math.PI)
                } ${100 - 90 * Math.cos(completion * 2 * Math.PI)} Z`}
                fill="white"
              />
            </svg>
          </div>
        )}
      </div>
      {/* Timer display and start/stop controls */}
      <div style={{ fontSize: "6em" }}>
        {/* Remaining time display */}
        {(showTime || !isRunning) && (
          <div style={{ fontSize: "0.7em" }}>{timeString}</div>
        )}
        {/* Start button - shown when ready to begin */}
        {isReadyToStart && (
          <button
            aria-label="Commencer la méditation"
            onClick={() => startClicked()}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        {/* Stop button - shown during meditation */}
        {canBeStopped && (
          <button
            aria-label="Arrêter la méditation"
            onClick={() => stopClicked()}
            style={{ opacity: 0.5 }}
          >
            <FontAwesomeIcon icon={faStop} />
          </button>
        )}
      </div>
      {!isRunning && <p style={{ fontSize: "0.8em", opacity: 0.4 }}>v0.2.0</p>}
    </div>
  );
};
