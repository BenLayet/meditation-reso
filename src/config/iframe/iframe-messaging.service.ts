const parentOrigin = "https://www.reso.co/";
export type Message = {
  type: "get" | "set" | "requestWakeLock" | "releaseWakeLock";
  key?: string;
  value?: string;
};
type MessageData = { id: string } & Message;
export function postRequest<Response>(message: Message): Promise<Response> {
  return new Promise(resolve => {
    const id = Math.random().toString(36).slice(2);
    function onMessage(response: { origin: string; data?: MessageData }) {
      if (response.origin !== parentOrigin) return;
      if (response.data?.id === id) {
        window.removeEventListener("message", onMessage);
        resolve(response.data.value as Response);
      }
    }
    window.addEventListener("message", onMessage);
    parent.postMessage({ ...message, id }, parentOrigin);
  });
}
