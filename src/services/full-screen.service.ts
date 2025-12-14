// Fullscreen helper functions
export class FullscreenService {
  enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem
        .requestFullscreen()
        .catch(err => console.error("Fullscreen failed:", err));
    }
  }

  exitFullscreen() {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .catch(err => console.error("Exit fullscreen failed:", err));
    }
  }
}

export const fullscreenService = new FullscreenService();
