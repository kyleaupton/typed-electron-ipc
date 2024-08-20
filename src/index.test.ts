import { describe, test, expect } from 'vitest';
import { ipcRouter } from './main';
import { createIpcClient } from './renderer';

const router = ipcRouter({
  greet: async (event, name: string) => {
    return `Hello, ${name}!`;
  },

  add: async (event, num1: number, num2: number) => {
    return num1 + num2;
  },

  objectParameter: async (
    event,
    s: string,
    obj: {
      key1: string;
      key2: number;
      key3: boolean;
    },
  ) => {
    return { s, obj };
  },
});

// @ts-expect-error - global is not defined
global.router = router;

type Router = typeof router;

const client = createIpcClient<Router>();

describe('basic functionality', () => {
  test('greet', async () => {
    const response = await client('greet', 'world');
    expect(response).toBe('Hello, world!');
  });

  test('add', async () => {
    const response = await client('add', 1, 2);
    expect(response).toBe(3);
  });

  test('test3', async () => {
    const response = await client('objectParameter', 'test', {
      key1: 'test',
      key2: 1,
      key3: true,
    });

    expect(response).toEqual({
      s: 'test',
      obj: {
        key1: 'test',
        key2: 1,
        key3: true,
      },
    });
  });
});

// These tests are for type checking only
// They will be caught by the TypeScript compiler
describe('types', () => {
  test("calling an ipc channel that doesn't exist should create TS compile error", () => {
    // @ts-expect-error - channel does not exist
    client('nonExistentChannel');
  });

  test('passing in an extra object key should create TS compile error (NoInfer<> test)', async () => {
    await client('objectParameter', 'test', {
      key1: 'test',
      key2: 1,
      key3: true,
      // @ts-expect-error - extraKey is not allowed
      extraKey: 'extra',
    });
  });

  test('missing an extra object key should create TS compile error (NoInfer<> test)', async () => {
    // @ts-expect-error - key3 is missing
    await client('objectParameter', 'test', {
      key1: 'test',
      key2: 1,
    });
  });
});
