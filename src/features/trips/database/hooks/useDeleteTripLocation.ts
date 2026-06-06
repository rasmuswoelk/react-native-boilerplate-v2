import { useCallback } from 'react';
import { deleteTripLocation } from '../queries';
import type { TripLocationEntity } from '../types';

export function useDeleteTripLocation(): (id: TripLocationEntity['id']) => Promise<void> {
  return useCallback(deleteTripLocation, []);
}
