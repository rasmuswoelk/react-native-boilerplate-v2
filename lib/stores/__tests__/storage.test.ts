import { __clearStore } from '../../../__mocks__/react-native-mmkv';
import { zustandStorage } from '../storage';

beforeEach(() => {
  __clearStore();
});

describe('zustandStorage', () => {
  it('stores and retrieves a value', () => {
    zustandStorage.setItem('key', 'value');
    expect(zustandStorage.getItem('key')).toBe('value');
  });

  it('returns null for a missing key', () => {
    expect(zustandStorage.getItem('nonexistent')).toBeNull();
  });

  it('overwrites an existing value', () => {
    zustandStorage.setItem('key', 'first');
    zustandStorage.setItem('key', 'second');
    expect(zustandStorage.getItem('key')).toBe('second');
  });

  it('removes a key', () => {
    zustandStorage.setItem('key', 'value');
    zustandStorage.removeItem('key');
    expect(zustandStorage.getItem('key')).toBeNull();
  });
});
