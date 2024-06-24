import { IpcChannel } from 'typed-electron-ipc/dist/shared';

export const greetChannel: IpcChannel<[string], string> = {
  name: '/user/greet',
};
