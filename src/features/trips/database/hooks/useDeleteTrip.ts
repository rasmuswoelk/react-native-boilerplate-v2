import { useCallback } from 'react';
import { deleteTrip } from '../queries';
import type { TripEntity } from '../types';

export function useDeleteTrip(): (id: TripEntity['id']) => Promise<void> {
  return useCallback(deleteTrip, []);
}
