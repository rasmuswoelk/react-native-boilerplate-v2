import { useCallback } from 'react';
import { createTripItem } from '../queries';
import type { NewTripItemEntity, TripItemEntity } from '../types';

export function useCreateTripItem(): (input: NewTripItemEntity) => Promise<TripItemEntity> {
  return useCallback(createTripItem, []);
}
