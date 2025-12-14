export class TickingService {
  private intervalId: NodeJS.Timeout | undefined;

  startTicking = (callback: () => void, delayInMs: number) => {
    this.stopTicking();
    this.intervalId = setInterval(callback, delayInMs);
  };
  stopTicking = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  };
}

export const tickingSErvice = new TickingService();
