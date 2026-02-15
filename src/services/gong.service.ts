export class GongService {
  private beginningAudio: HTMLAudioElement | null = null;
  private endAudio: HTMLAudioElement | null = null;
  // hold the resolved URL of the imported asset once loaded
  private src: string | null = null;

  private createAudio(src: string) {
    const a = new Audio(src);
    a.preload = "auto";
    return a;
  }

  // Dynamically import the asset only when we need to load/play it
  loadAudio = async () => {
    if (!this.src) {
      const mod = await import("../assets/gong.mp3");
      // Vite/webpack will expose the URL as the default export
      this.src = (mod as any).default ?? (mod as any);
    }

    // this.src is guaranteed to be set above, assert for the compiler
    if (!this.beginningAudio)
      this.beginningAudio = this.createAudio(this.src as string);
    if (!this.endAudio) this.endAudio = this.createAudio(this.src as string);

    this.beginningAudio.load();
    this.endAudio.load();
  };

  private async ensureBeginningAudio() {
    if (!this.beginningAudio) {
      if (!this.src) {
        const mod = await import("../assets/gong.mp3");
        this.src = (mod as any).default ?? (mod as any);
      }
      this.beginningAudio = this.createAudio(this.src as string);
    }
  }

  private async ensureEndAudio() {
    if (!this.endAudio) {
      if (!this.src) {
        const mod = await import("../assets/gong.mp3");
        this.src = (mod as any).default ?? (mod as any);
      }
      this.endAudio = this.createAudio(this.src as string);
    }
  }

  playBeginningAudio = async () => {
    await this.ensureBeginningAudio();
    try {
      this.beginningAudio!.currentTime = 0;
      await this.beginningAudio!.play();
    } catch (err: unknown) {
      console.error("Audio play failed:", err);
    }
  };

  playEndAudio = async () => {
    await this.ensureEndAudio();
    try {
      this.endAudio!.currentTime = 0;
      await this.endAudio!.play();
    } catch (err: unknown) {
      console.error("Audio play failed:", err);
    }
  };

  stopAllAudio = () => {
    this.beginningAudio?.pause();
    this.endAudio?.pause();
  };
}
