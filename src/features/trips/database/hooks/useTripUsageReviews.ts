import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { eq } from 'drizzle-orm';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { tripUsageReviews } from '../schema';
import type { TripEntity, TripUsageReviewEntity } from '../types';

export function useTripUsageReviews(tripId: TripEntity['id']): {
  data: TripUsageReviewEntity[];
  isLoading: boolean;
  error: Error | null;
} {
  const query = useMemo(
    () => db.select().from(tripUsageReviews).where(eq(tripUsageReviews.tripId, tripId)),
    [tripId],
  );
  const { data, isLoading, error } = useQuery<TripUsageReviewEntity>(toCompilableQuery(query));
  return { data, isLoading, error: error ?? null };
}
