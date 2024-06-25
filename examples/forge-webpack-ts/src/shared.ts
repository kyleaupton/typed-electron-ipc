import { IpcChannel } from "typed-electron-ipc";

export const greetIpcChannel: IpcChannel<[string], string> = {
  name: '/user/greet'
}
