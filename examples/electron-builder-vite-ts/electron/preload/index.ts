import { contextBridge } from 'electron';
import { ipcInvoke } from 'typed-electron-ipc';
import { greetChannel } from '../shared/index.js';

export const api = {
  greet: (name: string) => {
    return ipcInvoke(greetChannel, name);
  },
};

contextBridge.exposeInMainWorld('api', api);
