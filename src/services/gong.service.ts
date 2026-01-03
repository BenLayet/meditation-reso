import gongSound from "../assets/gong.mp3";

export class GongService {
  private beginningAudio = new Audio(gongSound);
  private endAudio = new Audio(gongSound);

  loadAudio = () => {
    this.beginningAudio.load();
    this.endAudio.load();
  };

  playBeginningAudio = () => {
    this.beginningAudio.currentTime = 0;
    this.beginningAudio.play().catch((err: unknown) => {
      console.error("Audio play failed:", err);
    });
  };

  playEndAudio = () => {
    this.endAudio.currentTime = 0;
    this.endAudio.play().catch((err: unknown) => {
      console.error("Audio play failed:", err);
    });
  };

  stopAllAudio = () => {
    this.beginningAudio.pause();
    this.endAudio.pause();
  };
}
