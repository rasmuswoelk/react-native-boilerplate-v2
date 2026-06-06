import { useCallback } from 'react';
import { createTripUsageReview } from '../queries';
import type { NewTripUsageReviewEntity, TripUsageReviewEntity } from '../types';

export function useCreateTripUsageReview(): (
  input: NewTripUsageReviewEntity,
) => Promise<TripUsageReviewEntity> {
  return useCallback(createTripUsageReview, []);
}
