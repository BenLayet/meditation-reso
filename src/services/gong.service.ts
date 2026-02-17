export interface GongService {
  loadAudio: () => Promise<void>;
  playBeginningAudio: () => Promise<void>;
  playEndAudio: () => Promise<void>;
  stopAllAudio: () => void;
}

export class GongServiceImpl implements GongService {
  private beginningAudio: HTMLAudioElement | null = null;
  private endAudio: HTMLAudioElement | null = null;
  private readonly publicUrl = "/gong.mp3";

  private createAudio(src: string) {
    const a = new Audio(src);
    a.preload = "auto";
    return a;
  }

  // Load audio from public folder; no bundler import needed
  loadAudio = async () => {
    if (!this.beginningAudio)
      this.beginningAudio = this.createAudio(this.publicUrl);
    if (!this.endAudio) this.endAudio = this.createAudio(this.publicUrl);

    this.beginningAudio.load();
    this.endAudio.load();
  };

  private async ensureBeginningAudio() {
    if (!this.beginningAudio) {
      this.beginningAudio = this.createAudio(this.publicUrl);
    }
  }

  private async ensureEndAudio() {
    if (!this.endAudio) {
      this.endAudio = this.createAudio(this.publicUrl);
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
