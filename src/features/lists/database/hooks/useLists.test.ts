jest.mock('@powersync/react-native');
jest.mock('@powersync/drizzle-driver');
jest.mock('@/src/database/client');

import { renderHook } from '@testing-library/react-native';
import { useQuery } from '@powersync/react-native';
import { useLists } from './useLists';

describe('useLists', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns lists data, isLoading, and error', () => {
    const lists = [{ id: '1', name: 'Weekend Trip', tags: '[]', createdAt: 0, updatedAt: 0, description: null }];
    (useQuery as jest.Mock).mockReturnValue({ data: lists, isLoading: false, error: undefined });

    const { result } = renderHook(() => useLists());

    expect(result.current.data).toEqual(lists);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('surfaces isLoading while query is in flight', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: true, error: undefined });
    const { result } = renderHook(() => useLists());
    expect(result.current.isLoading).toBe(true);
  });
});
