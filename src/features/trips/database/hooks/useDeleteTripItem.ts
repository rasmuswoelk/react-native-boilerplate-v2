import { useCallback } from 'react';
import { deleteTripItem } from '../queries';
import type { TripItemEntity } from '../types';

export function useDeleteTripItem(): (id: TripItemEntity['id']) => Promise<void> {
  return useCallback(deleteTripItem, []);
}
