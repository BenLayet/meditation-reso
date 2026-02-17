export interface TickingService {
  startTicking: (callback: () => void, delayInMs: number) => void;
  stopTicking: () => void;
}

export class TickingServiceImpl implements TickingService {
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
