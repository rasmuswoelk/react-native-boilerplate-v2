import { useCallback } from 'react';
import { updateTrip } from '../queries';
import type { NewTripEntity, TripEntity } from '../types';

export function useUpdateTrip(): (
  id: TripEntity['id'],
  input: Partial<NewTripEntity>,
) => Promise<TripEntity> {
  return useCallback(updateTrip, []);
}
