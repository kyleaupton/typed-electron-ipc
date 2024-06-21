# type-safe-ipc

This package provides a type-safe solution for IPC in Electron.js, ensuring that the communication between the main and renderer processes is reliable and consistent. By using shared types, this package helps you avoid runtime errors and mismatches in parameters and return types.

## Philosophy

In Electron.js development, importing Node.js modules into the renderer process is generally discouraged due to potential security risks. This package employs a "shared" module approach, where you define the type of an IPC channel within a shared module that can be bundled into either the main or renderer process. This approach ensures that when defining the IPC channel's handler in the main process and consuming the IPC channel in the renderer process, the parameters and return types are type-safe, providing robust communication.

## Example

Here's a complete example

### Shared IPC channel type definition (`shared/readFile.ts`)

```typescript
import fs from 'fs/promises'
import { IpcChannel } from 'type-safe-ipc/shared'

export readFileChannel: IpcChannel<[string], string> = {
  name: '/file/read'
}
```

### Main process

```typescript
import { registerIpcChannel } from 'type-safe-ipc/main'
// Shared IPC channel type
import { readFileChannel } from 'path/to/shared/readFile.ts'

registerIpcChannel(readFileChannel, (event, path) => {
  return fs.readFile(path, 'utf-8')
})
```

### Renderer process

```typescript
import { ipcInvoke } from 'type-safe-ipc/renderer'
// Shared IPC channel type
import { readFileChannel } from 'path/to/shared/readFile.ts'

const fileContents = await ipcInvoke(readFileChannel, '/etc/hosts')
```

## License

MIT License

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
