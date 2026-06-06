import { useCallback } from 'react';
import { updateTripUsageReview } from '../queries';
import type { NewTripUsageReviewEntity, TripUsageReviewEntity } from '../types';

export function useUpdateTripUsageReview(): (
  id: TripUsageReviewEntity['id'],
  input: Partial<NewTripUsageReviewEntity>,
) => Promise<TripUsageReviewEntity> {
  return useCallback(updateTripUsageReview, []);
}
