import { ipcRenderer } from 'electron';
import { IpcChannel } from './shared.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ipcInvoke = async <P extends any[], R>(
  channelDefinition: IpcChannel<P, R>,
  ...args: P
) => {
  const result = await ipcRenderer.invoke(channelDefinition.channel, ...args);

  if (result && typeof result === 'object' && result.error) {
    throw new Error(result.error.message);
  }

  return result as R;
};
