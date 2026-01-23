export class TickingService {
  private intervalId: NodeJS.Timeout | undefined;

  startTicking = (callback: () => void, delayInMs: number) => {
    console.log("Starting ticking service...");
    this.stopTicking();
    this.intervalId = setInterval(() => {
      console.log(`Tick.. intervalId=${this.intervalId}`);
      try {
        callback();
      } catch (err) {
        console.error("Error in tick callback:", err);
        this.stopTicking();
      }
    }, delayInMs);
  };
  stopTicking = () => {
    console.log(`Stopping ticking service... intervalId=${this.intervalId}`);
    if (this.intervalId) {
      console.log(`before clearInterval.. intervalId=${this.intervalId}`);
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      console.log(`after clearInterval.. intervalId=${this.intervalId}`);
    }
  };
}
