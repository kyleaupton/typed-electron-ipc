// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron";

// Invoke IPC handler
import { ipcInvoke } from "typed-electron-ipc";

// IPC channel definition
import { greetIpcChannel } from "./shared";

export const api = {
  greet: async (name: string) => {
    return ipcInvoke(greetIpcChannel, name);
  }
};

contextBridge.exposeInMainWorld("api", api);
