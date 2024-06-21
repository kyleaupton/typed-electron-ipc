import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { IpcChannel } from './shared.js';

/**
 * Throws an IPC error
 *
 * Since it is not possible bubble up a normal JavaScript exception to the renderer
 * process, we must encode it and return it as a response to the IPC request. The
 * renderer's IPC invoke function will then decode the error and throw it.
 */
export const throwIpcError = (message: string) => {
  return { error: { message } };
};

export type IpcError = ReturnType<typeof throwIpcError>;

/**
 * Registers an IPC channel with a handler
 * @param channelDefinition Channel definition with name, arg types, and return type
 * @param handler Handler function for the channel
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerIpcChannel = <P extends any[] = [], R = void>(
  channelDefinition: IpcChannel<P, R>,
  handler: (event: IpcMainInvokeEvent, ...args: P) => NoInfer<PromiseLike<R | IpcError> | R | IpcError>, // eslint-disable-line
): void => {
  ipcMain.handle(channelDefinition.channel, (event, ...args) =>
    handler(event, ...(args as P)),
  );
};
