jest.mock('@powersync/react-native');
jest.mock('@powersync/drizzle-driver');
jest.mock('@/src/database/client');

import { useQuery } from '@powersync/react-native';
import { renderHook } from '@testing-library/react-native';
import { useTrips } from './useTrips';

describe('useTrips', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns trips data, isLoading, and error', () => {
    const trips = [
      {
        id: '1',
        name: 'Tokyo Trip',
        status: 'upcoming' as const,
        createdAt: 0,
        updatedAt: 0,
        destination: null,
        startDate: null,
        endDate: null,
        tripType: null,
        notes: null,
      },
    ];
    (useQuery as jest.Mock).mockReturnValue({ data: trips, isLoading: false, error: undefined });

    const { result } = renderHook(() => useTrips());

    expect(result.current.data).toEqual(trips);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('surfaces isLoading while query is in flight', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: true, error: undefined });
    const { result } = renderHook(() => useTrips());
    expect(result.current.isLoading).toBe(true);
  });
});
