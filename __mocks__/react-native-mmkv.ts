const _store = new Map<string, string>();

export const createMMKV = jest.fn(() => ({
  set: jest.fn((key: string, value: string) => {
    _store.set(key, value);
  }),
  getString: jest.fn((key: string) => _store.get(key)),
  remove: jest.fn((key: string) => {
    _store.delete(key);
  }),
}));

export function __clearStore() {
  _store.clear();
}
