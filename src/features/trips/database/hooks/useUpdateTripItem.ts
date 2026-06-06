import { useCallback } from 'react';
import { updateTripItem } from '../queries';
import type { NewTripItemEntity, TripItemEntity } from '../types';

export function useUpdateTripItem(): (
  id: TripItemEntity['id'],
  input: Partial<NewTripItemEntity>,
) => Promise<TripItemEntity> {
  return useCallback(updateTripItem, []);
}
