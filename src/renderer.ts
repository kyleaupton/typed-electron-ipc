/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from 'electron';
import { IpcChannels } from './types';

const isTest = process.env.TEST === 'true';
type ExcludeFirst<T extends any[]> = T extends [any, ...infer Rest] ? Rest : [];

export const createIpcClient = <Router extends IpcChannels>() => {
  return <
    C extends keyof Router & string,
    P extends ExcludeFirst<Parameters<Router[C]>>,
  >(
    channel: C,
    ...args: NoInfer<P>
  ) => {
    // If we're in a test environment, we can't use ipcRenderer.
    // In such case, we'll use global.router to call the function directly.
    if (isTest) {
      // @ts-expect-error - global is not defined
      return global.router[channel](null, ...args) as ReturnType<Router[C]>;
    }

    return ipcRenderer.invoke(channel, ...args) as ReturnType<Router[C]>;
  };
};
