# Vite Example

This is an example Electron.js application that has IPC type safety using `typed-electron-ipc`. Vite is used as the bundler to create the main, preload, and renderer modules. This sample application was created using the `Electron + Vite + Vue` template available [here](https://github.com/electron-vite/electron-vite-vue).

## Overview

- **IPC Channel Definition**: Located in [`electron/shared/index.ts`](electron/shared/index.ts), this file outlines the IPC channel's parameters, return value, and name.
- **Main Process Setup**: In [`electron/main/index.ts`](electron/main/index.ts), the IPC channel is initialized upon the `app.on('ready')` event.
- **Preload Script**: Given that `nodeIntegration` is disabled for enhanced security, direct `ipcRenderer` API calls in the renderer context are not possible. This challenge is overcome in [`electron/preload/index.ts`](electron/preload/index.ts) by utilizing Electron's `contextBridge` module, which safely exposes necessary functionalities to the renderer process.
- **Renderer Process Invocation**: Within [`src/App.vue`](src/App.vue), we call the IPC created with `window.api.greet()`.
