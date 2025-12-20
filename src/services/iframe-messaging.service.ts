const parentOrigin = "https://www.reso.co/";
export type Message = {  type:"get"|"set", key:string, value?:string };
type MessageData = { id: string; } & Message;
export function postRequest(message: Message):Promise<string> {
  return new Promise((resolve) => {
    const id = Math.random().toString(36).slice(2);
    function onMessage(response:{origin:string, data?:MessageData}) {
      if (response.origin !== parentOrigin) return;
      if (response.data?.id === id) {
        window.removeEventListener('message', onMessage);
        resolve(response.data.value ?? "");
      }
    }
    window.addEventListener('message', onMessage);
    parent.postMessage({ ...message, id }, parentOrigin);
  });
}

