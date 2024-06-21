import { api } from '../electron/preload/index.ts';

declare global {
  interface Window {
    api: typeof api;
  }
}
