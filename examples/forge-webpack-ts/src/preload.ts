// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron";
import { createIpcClient } from "typed-electron-ipc";
import { type Router } from "./index";

export const ipcInvoke = createIpcClient<Router>();

contextBridge.exposeInMainWorld("ipcInvoke", ipcInvoke);

// Add `ipcInvoke` to the global window object typings
declare global {
  interface Window {
    ipcInvoke: typeof ipcInvoke;
  }
}
