export interface FullScreenService {
  enterFullscreen: () => void;
  exitFullscreen: () => void;
}

// Fullscreen helper functions
export class FullScreenServiceImpl implements FullScreenService {
  enterFullscreen = () => {
    document.documentElement.requestFullscreen().catch((err: unknown) => {
      console.error("Enter fullscreen failed:", err);
    });
  };

  exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err: unknown) => {
        console.error("Exit fullscreen failed:", err);
      });
    }
  };
}
