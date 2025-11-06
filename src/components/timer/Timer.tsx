import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import gongSound from "../../assets/gong.mp3";
import {
  calculateDecrementedDuration,
  calculateIncrementedDuration,
  formatSeconds,
} from "../../util/duration.functions";
import { ProgressIndicator } from "./ProgressIndicator";
import { Settings } from "./Settings";

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
  const [isBlackScreenSelected, setIsBlackScreenSelected] = useState(false);
  const [isGongOn, setIsGongOn] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReadyToStart, setIsReadyToStart] = useState(true);
  const [isBlackScreenVisible, setIsBlackScreenVisible] = useState(false);
  const canBeStopped = !isReadyToStart;
  formatSeconds(remainingSeconds);
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

  const startClicked = async () => {
    setIsRunning(true);
    setIsReadyToStart(false);
    setIsBlackScreenVisible(false);
    setTimeout(() => setIsBlackScreenVisible(isBlackScreenSelected), 2500);

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
    setIsBlackScreenVisible(false);

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

  const reactivateScreenTemporarily = () => {
    setIsBlackScreenVisible(false);
    setTimeout(() => {
      setIsBlackScreenVisible(true);
    }, 5000);
  };

  useEffect(() => {
    if (stopAudioRef.current) {
      stopAudioRef.current.volume = isGongOn ? 1.0 : 0.0;
    }
    if (startAudioRef.current) {
      startAudioRef.current.volume = isGongOn ? 1.0 : 0.0;
    }
  }, [isGongOn]);

  useEffect(() => {
    setRemainingSeconds(durationMinutes * 60);
  }, [durationMinutes]);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      setIsRunning(false);
      setIsBlackScreenVisible(false); // Deactivate black screen when timer finishes

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
          <div className={`settings fadein ${isReadyToStart ? "" : "hidden"}`}>
            <Settings
              onDurationChanged={setDurationMinutes}
              onGongChanged={setIsGongOn}
              onShowBlackScreenChanged={setIsBlackScreenSelected}
            />
          </div>

          <div
            className={`fadein ${!isReadyToStart ? "" : "hidden"}`}
            style={{ position: "absolute" }}
          >
            {/* Circular progress indicator - shown during meditation */}
            {canBeStopped && (
              <>
                <ProgressIndicator durationMinutes={durationMinutes} />{" "}
                {/* Remaining time display */}
                <div
                  style={{
                    opacity: 0.4,
                    position: "absolute",
                    top: "94px%",
                  }}
                >
                  {formatSeconds(remainingSeconds)}
                </div>
              </>
            )}
          </div>
        </div>
        {/* Timer display and start/stop controls */}
        <div style={{ fontSize: "3em" }}>
          {/* Start button - shown when ready to begin */}
          {isReadyToStart && (
            <button
              style={{ fontSize: "0.7em" }}
              aria-label="Commencer la méditation"
              onClick={() => startClicked()}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          {/* Stop button - shown during meditation */}
          {canBeStopped && (
            <button
              style={{ fontSize: "0.7em" }}
              aria-label="Arrêter la méditation"
              onClick={() => stopClicked()}
            >
              <FontAwesomeIcon icon={faStop} />
            </button>
          )}
        </div>
        {isReadyToStart && (
          <p
            style={{
              fontSize: "0.8em",
              opacity: 0.4,
              position: "absolute",
              bottom: "1em",
              right: "1em",
            }}
          >
            v0.2.0
          </p>
        )}
      </div>
      {/* Black screen overlay during meditation */}
      <div
        className="black-screen-overlay"
        style={{
          opacity: canBeStopped && isBlackScreenVisible ? 1 : 0,
          pointerEvents: canBeStopped && isBlackScreenVisible ? "auto" : "none",
        }}
        onClick={() => reactivateScreenTemporarily()}
      >
        <h1 style={{ opacity: 0.2, textAlign: "center" }}>
          Cliquer pour désactiver l'écran noir quelques secondes
        </h1>
      </div>
    </>
  );
};
