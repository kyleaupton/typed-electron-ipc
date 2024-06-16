import { IpcChannel } from 'type-safe-ipc/shared';

export const greetChannel: IpcChannel<[string], string> = {
  channel: '/user/greet',
};
