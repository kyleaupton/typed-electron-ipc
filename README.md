# typed-electron-ipc

[![NPM version](https://img.shields.io/npm/v/typed-electron-ipc)](https://www.npmjs.com/package/typed-electron-ipc)

This package provides a type-safe solution for IPC in Electron.js, ensuring that the communication between the main and renderer processes is reliable and consistent.

## Philosophy

In Electron.js development, importing Node.js modules into the renderer process is generally discouraged due to potential security risks. This package employs a "shared" module approach, where you define the type of an IPC channel within a shared module that can be bundled into either the main or renderer process. This approach ensures that the type of the IPC channel and it's handler implementation are not coupled together, meaning you can easily import that IPC definition into either process.

## Important notes

> [!NOTE]
> TypeScript version `>= 5.4.0` is **required**. The `NoInfer` utility type is used.

> [!NOTE]
> Strict mode must be turned on in `tsconfig.json`. Otherwise type infrence will not work as expected.

## Installation

If you're using Vite, depending on how it's configured, you may need to install this package as a dev dependency. For more information, see [Installing in `dependencies` vs. `devDependencies`](#installing-in-dependencies-vs-devdependencies).

If you're using Webpack install this package of a normal dependency.

```bash
npm i typed-electron-ipc

# or

npm i --save-dev typed-electron-ipc
```

## Example

Here's an abstract example. For complete examples, see [the examples directory.](./examples)

### Shared IPC channel type definition (`shared/readFile.ts`)

```typescript
import { IpcChannel } from 'typed-electron-ipc'

export const readFileChannel: IpcChannel<[string], string> = {
  name: '/file/read'
}
```

### Main process

```typescript
import fs from 'fs/promises';
import { ipcHandle } from 'typed-electron-ipc';

// Shared IPC channel definition
import { readFileChannel } from '../path/to/shared/readFile.ts';

ipcHandle(readFileChannel, (event, path) => {
  return fs.readFile(path, 'utf-8');
});
```

### Renderer process

```typescript
import { ipcInvoke } from 'typed-electron-ipc';

// Shared IPC channel definition
import { readFileChannel } from '../path/to/shared/readFile.ts';

const fileContents = await ipcInvoke(readFileChannel, '/etc/hosts');
```

## Error handling

Electron's IPC mechanism does not properly serialize JavaScript exceptions. To address this limitation, this package provides a slightly opinionated solution to encode and decode JavaScript exceptions during IPC communication.

### Error handling example

We'll continue with the above example of reading a file with `fs`.

#### Main process

```typescript
import fs from 'fs/promises'
import { ipcHandle, throwIpcError } from 'typed-electron-ipc';

// Shared IPC channel definition
import { readFileChannel } from '../path/to/shared/readFile.ts'

ipcHandle(readFileChannel, (event, path) => {
  // Ensure file exists
  try {
    await fs.stat(path);
  } catch (e) {
    return throwIpcError('File does not exist!');
  }

  return fs.readFile(path, 'utf-8');
});
```

#### Renderer process

```typescript
import { ipcInvoke } from 'typed-electron-ipc';

// Shared IPC channel definition
import { readFileChannel } from '../path/to/shared/readFile.ts';

try {
  const fileContents = await ipcInvoke(readFileChannel, '/etc/hosts');
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message) // File does not exist!
  }
}
```

## Installing in `dependencies` vs. `devDependencies`

If you're using Vite, some templates/examples configure Vite so that any installed dependencies are not bundled into the build. This configuration may look something like the following:

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
 * [Forge `Vite` template](https://www.electronforge.io/templates/vite)
 * [Forge `Vite + Typescript` template](https://www.electronforge.io/templates/vite-+-typescript)

## License

MIT License

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
