// Fullscreen helper functions
export class FullscreenService {
  enterFullscreen = () => {
    document.documentElement.requestFullscreen().catch((err: unknown) => {
      console.error("Fullscreen failed:", err);
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
