import { api } from './src/preload';

declare global {
  interface Window {
    api: typeof api;
  }
}
