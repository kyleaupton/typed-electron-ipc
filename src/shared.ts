/**
 * Defines what an IPC channel looks like.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export interface IpcChannel<P extends any[] = [], R = void> {
  name: string;
}
