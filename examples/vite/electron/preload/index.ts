import { contextBridge } from 'electron';
import { ipcInvoke } from 'typed-electron-ipc/dist/renderer';
import { greetChannel } from '../shared/index.js';

export const api = {
  greet: (name: string) => {
    return ipcInvoke(greetChannel, name);
  },
};

contextBridge.exposeInMainWorld('api', api);
