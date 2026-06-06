import { useCallback } from 'react';
import { createTripLocation } from '../queries';
import type { NewTripLocationEntity, TripLocationEntity } from '../types';

export function useCreateTripLocation(): (
  input: NewTripLocationEntity,
) => Promise<TripLocationEntity> {
  return useCallback(createTripLocation, []);
}
