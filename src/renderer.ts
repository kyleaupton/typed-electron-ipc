/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from 'electron';
import { IpcChannels } from './types';

type ExcludeFirst<T extends any[]> = T extends [any, ...infer Rest] ? Rest : [];

export const createIpcClient = <Router extends IpcChannels>() => {
  return <
    C extends keyof Router & string,
    P extends ExcludeFirst<Parameters<Router[C]>> = never,
  >(
    channel: C,
    ...args: P
  ) => {
    return ipcRenderer.invoke(channel, ...args) as ReturnType<Router[C]>;
  };
};
