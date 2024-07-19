# typed-electron-ipc

[![NPM version](https://img.shields.io/npm/v/typed-electron-ipc)](https://www.npmjs.com/package/typed-electron-ipc)

This package provides a type-safe solution for IPC in Electron.js, ensuring that the communication between the main and renderer processes is reliable and consistent.

## Installation

If you're using Vite, depending on how it's configured, you may need to install this package as a dev dependency. For more information, see [Installing in `dependencies` vs. `devDependencies`](#installing-in-dependencies-vs-devdependencies).

If you're using Webpack then install this package of a normal dependency.

```bash
npm i typed-electron-ipc

# or

npm i --save-dev typed-electron-ipc
```

## Example

### Main process

This is where you define the main process IPC handlers. You do that by calling `ipcRouter` and passing it an object where the keys are the name of the IPC channel, and the values are the handler functions. These handlers will automatically be registered when the app's `ready` event is fired.

```ts
// ipc.ts

import { app } from 'electron';
import { ipcRouter } from 'typed-electron-ipc';

const router = ipcRouter({
  greet: async (event, name: string) => {
    return `Hello, ${name}`;
  },

  add: async (event, n1: number, n2: number) => {
    return n1 + n2;
  },

  '/app/path/temp': async () => {
    return app.getPath('temp');
  },
});

export type Router = typeof router;
```

If you're defining the IPC handlers in a module file, like in the example above, you can include them by importing that module for it's side-effects within your main process' entry point.

```ts
// main.ts
...

import './path/to/ipc.ts'

...
```

### Preload script

Electron recommends using a preload script to consume Electron modules as well as creating renderer processes with context isolation enabled for security reasons. So this is where we'll create the IPC client, which wraps `ipcRenderer.invoke`. We do that by calling `createIpcClient` and passing in the `Router` type as a generic. Then we use Electron's `contextBridge` to expose the IPC client within the renderer process. In this example we call the client `ipcInvoke`, but feel free to name it whatever you'd like.

```ts
// preload.ts

import { contextBridge } from 'electron';
import { createIpcClient } from 'typed-electron-ipc';
import { type Router } from '../path/to/ipc.ts';

export const ipcInvoke = createIpcClient<Router>();

contextBridge.exposeInMainWorld('ipcInvoke', ipcInvoke);
```

### Type decloration file

You'll want to extend the window object's typings to include the newly created IPC client. You can do that with a declaration file. If this step is skipped it kinda defeats the whole purpose of this package.

```ts
import { ipcInvoke } from '../path/to/preload.ts';

declare global {
  interface Window {
    ipcInvoke: typeof ipcInvoke;
  }
}
```

### Renderer process

Finally we can invoke IPC handlers with full type saftey.

```ts
const greeting = await window.ipcInvoke('greet', 'Bob');

const result = await window.ipcInvoke('add', 2, 3);

const tempPath = await window.ipcInvoke('/app/path/temp');
```

For more examples, see [the examples directory.](./examples)

Also see [Bucket Browser](https://github.com/kyleaupton/bucket-browser) for a larger example.

## Installing in `dependencies` vs. `devDependencies`

If you're using Vite, some Electron templates/examples configure Vite so that any installed dependencies are not bundled into the build. This configuration may look something like the following:

```javascript
// vite.config.ts
import pkg from './package.json';

...

build: {
  rollupOptions: {
    external: Object.keys('dependencies' in pkg ? pkg.dependencies : {})
  }
}

...
```

If you have the above configuration, this package needs to be installed as a dev dependency. If this package is not bundled by Vite, an error will be thrown when the preload script is attempted to be loaded.

Known Electron + Vite templates that ship with the above configuration:
 * [Electron⚡️Vite](https://github.com/electron-vite)
 * [Forge `Vite + Typescript` template](https://www.electronforge.io/templates/vite-+-typescript)

## License

MIT License

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
