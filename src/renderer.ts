import { ipcRenderer } from 'electron';
import { IpcChannel } from './shared';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ipcInvoke = async <Args extends any[], Return>(
  channelDefinition: IpcChannel<Args, Return>,
  ...args: Args
) => {
  const result = await ipcRenderer.invoke(channelDefinition.channel, ...args);

  if (result && typeof result === 'object' && result.error) {
    throw new Error(result.error.message);
  }

  return result as Return;
};
