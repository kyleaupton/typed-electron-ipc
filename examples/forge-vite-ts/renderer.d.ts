import { ipcInvoke } from './src/preload';

declare global {
  interface Window {
    ipcInvoke: typeof ipcInvoke;
  }
}
