jest.mock('@powersync/react-native');
jest.mock('@powersync/drizzle-driver');
jest.mock('../schema');
jest.mock('@/src/database/client');

import { renderHook } from '@testing-library/react-native';
import { useCategories } from './useCategories';
import { useQuery } from '@powersync/react-native';

describe('useCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns data, isLoading, and error from useQuery', () => {
    const mockResult = { data: [{ id: '1', name: 'Clothing' }], isLoading: false, error: null };
    (useQuery as jest.Mock).mockReturnValue(mockResult);

    const { result } = renderHook(() => useCategories());

    expect(result.current.data).toEqual(mockResult.data);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('surfaces isLoading while query is in flight', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: true, error: null });
    const { result } = renderHook(() => useCategories());
    expect(result.current.isLoading).toBe(true);
  });
});
