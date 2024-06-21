# type-safe-ipc

This package provides a type-safe solution for IPC in Electron.js, ensuring that the communication between the main and renderer processes is reliable and consistent.

## Philosophy

In Electron.js development, importing Node.js modules into the renderer process is generally discouraged due to potential security risks. This package employs a "shared" module approach, where you define the type of an IPC channel within a shared module that can be bundled into either the main or renderer process. This approach ensures that the type of the IPC channel and it's handler implementation are not coupled together, meaning you can easily import that IPC definition into either process.

## Example

Here's a abstract example. For complete examples, see [the examples directory.](./examples)

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
