/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, ipcMain } from 'electron';
import { IpcChannels, RouterOptions } from './types.js';

export const ipcRouter = <T extends IpcChannels>(
  channels: T,
  options?: RouterOptions,
) => {
  app.on('ready', () => {
    Object.entries(channels).forEach(([channel, handler]) => {
      ipcMain.handle(channel, (event, ...args) => {
        return new Promise((resolve, reject) => {
          handler(event, ...args)
            .then(resolve)
            .catch((error) => {
              if (options?.encodeErrors && error instanceof Error) {
                resolve({
                  error: {
                    name: error.name,
                    message: error.message,
                    extra: { ...error },
                  },
                });
              } else {
                reject(error);
              }
            });
        });
      });
    });
  });

  return channels;
};

export const createIpcHandlers = <T extends IpcChannels>(channels: T) => {
  return channels;
};
