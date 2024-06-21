import { IpcChannel } from 'typed-electron-ipc/shared';

export const greetChannel: IpcChannel<[string], string> = {
  name: '/user/greet',
};
