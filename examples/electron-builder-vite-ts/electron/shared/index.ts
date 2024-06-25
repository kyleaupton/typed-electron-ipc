import { IpcChannel } from 'typed-electron-ipc';

export const greetChannel: IpcChannel<[string], string> = {
  name: '/user/greet',
};
