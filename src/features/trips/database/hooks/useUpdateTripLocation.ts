import { useCallback } from 'react';
import { updateTripLocation } from '../queries';
import type { NewTripLocationEntity, TripLocationEntity } from '../types';

export function useUpdateTripLocation(): (
  id: TripLocationEntity['id'],
  input: Partial<NewTripLocationEntity>,
) => Promise<TripLocationEntity> {
  return useCallback(updateTripLocation, []);
}
