import { contextBridge } from 'electron';
import { ipcInvoke } from 'type-safe-ipc/renderer';
import { greetChannel } from '../shared/index.js';

export const api = {
  greet: (string: string) => {
    return ipcInvoke(greetChannel, string);
  },
};

contextBridge.exposeInMainWorld('api', api);
