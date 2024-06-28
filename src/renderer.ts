/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from 'electron';
import { IpcChannel } from './shared.js';

export const ipcInvoke = async <P extends any[], R>(
  channelDefinition: IpcChannel<P, R>,
  ...args: P
) => {
  const result = await ipcRenderer.invoke(channelDefinition.name, ...args);

  if (result && typeof result === 'object' && result.error) {
    throw new Error(result.error.message);
  }

  return result as R;
};
