# Forge + Webpack + TS

This is a full example of using `typed-electron-ipc` with Forge's Webpack + TypeScript template.

## Overview

- **IPC Channel Definition**: Located in [`src/shared.ts`](src/shared.ts), this file outlines the IPC channel's parameters, return value, and name.
- **Main Process Setup**: In [`src/index.ts`](src/index.ts), the IPC channel is initialized upon the `app.on('ready')` event.
- **Preload Script**: Given that `nodeIntegration` is disabled for enhanced security, direct `ipcRenderer` API calls in the renderer context are not possible. This challenge is overcome in [`src/preload.ts`](src/preload.ts) by utilizing Electron's `contextBridge` module, which safely exposes necessary functionalities to the renderer process.
- **Renderer Process Invocation**: Within [`src/renderer.ts`](src/renderer.ts), we call the IPC created with `window.api.greet()`.
