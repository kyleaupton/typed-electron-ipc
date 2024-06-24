# Vite Example

This is an example Electron.js application that has IPC type safety using `typed-electron-ipc`. Vite is used as the bundler to create the main, preload, and renderer modules. This sample application was created using the `Electron + Vite + Vue` template available [here](https://github.com/electron-vite/electron-vite-vue).

## Overview

In [`electron/shared/index.ts`](electron/shared/index.ts) there is a definition that describes the parameters, return value, and name of a IPC channel that greets a user. In [`electron/main/index.ts`](electron/main/index.ts), when the `app.on('ready')` event is triggered, the IPC channel is registered with a handler. Since `nodeIntegration` is disabled when the `BrowserWindow` is created, we are unable to use any `ipcRenderer` API directly in the renderer context. We must use preload. Inside [`electron/preload/index.ts`](electron/preload/index.ts) we use Electron's `contextBridge` module to expose something within the renderer process. Finally, inside [`src/App.vue`](src/App.vue) we call `window.api.greet()` which will invoke the IPC channel we created.
