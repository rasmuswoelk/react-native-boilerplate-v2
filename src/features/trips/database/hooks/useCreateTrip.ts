import { useCallback } from 'react';
import { createTrip } from '../queries';
import type { NewTripEntity, TripEntity } from '../types';

export function useCreateTrip(): (input: NewTripEntity) => Promise<TripEntity> {
  return useCallback(createTrip, []);
}
