// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron";

// Invoke IPC handler
import { ipcInvoke } from "typed-electron-ipc";

// IPC channel definition
import { greetIpcChannel } from "./shared";

const api = {
  greet: async (name: string) => {
    return ipcInvoke(greetIpcChannel, name);
  }
};

contextBridge.exposeInMainWorld("api", api);

// Declare `api` in the global window object
declare global {
  interface Window {
    api: typeof api;
  }
}
