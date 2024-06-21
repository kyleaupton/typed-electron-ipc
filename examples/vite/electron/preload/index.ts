import { contextBridge } from 'electron';
import { ipcInvoke } from 'typed-electron-ipc/renderer';
import { greetChannel } from '../shared/index.js';

export const api = {
  greet: (string: string) => {
    return ipcInvoke(greetChannel, string);
  },
};

contextBridge.exposeInMainWorld('api', api);
