/* eslint-disable @typescript-eslint/no-explicit-any */
import { IpcMainInvokeEvent } from 'electron';

export type IpcChannelHandler = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => Promise<any>;

export type IpcChannels = Record<string, IpcChannelHandler>;

export interface RouterOptions {
  encodeErrors?: boolean;
}
