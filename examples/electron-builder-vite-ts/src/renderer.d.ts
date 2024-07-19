import { ipcInvoke } from '../electron/preload/index.ts';

declare global {
  interface Window {
    ipcInvoke: typeof ipcInvoke;
  }
}
