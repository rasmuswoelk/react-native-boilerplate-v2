jest.mock('@powersync/react-native');
jest.mock('@powersync/drizzle-driver');
jest.mock('@/src/database/client');

import { renderHook } from '@testing-library/react-native';
import { useQuery } from '@powersync/react-native';
import { useInventoryItems } from './useInventoryItems';

describe('useInventoryItems', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns data, isLoading, and error', () => {
    const items = [{ id: '1', name: 'Passport', tags: '[]', quantity: 1, createdAt: 0, updatedAt: 0, categoryId: null, description: null, weightGrams: null, notes: null }];
    (useQuery as jest.Mock).mockReturnValue({ data: items, isLoading: false, error: undefined });

    const { result } = renderHook(() => useInventoryItems());

    expect(result.current.data).toEqual(items);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('surfaces isLoading while query is in flight', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: true, error: undefined });
    const { result } = renderHook(() => useInventoryItems());
    expect(result.current.isLoading).toBe(true);
  });
});
