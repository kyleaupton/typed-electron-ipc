/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from 'electron';
import { IpcChannel } from './shared.js';

type ArgsTransform = <P extends any[]>(...args: P) => P;

/**
 * A function that can be used to transform the arguments before sending them to the main process.
 */
export let argsTransform: ArgsTransform | undefined;

export const ipcInvoke = async <P extends any[], R>(
  channelDefinition: IpcChannel<P, R>,
  ...args: P
) => {
  if (argsTransform) {
    args = argsTransform(...args);
  }

  const result = await ipcRenderer.invoke(channelDefinition.name, ...args);

  if (result && typeof result === 'object' && result.error) {
    throw new Error(result.error.message);
  }

  return result as R;
};
