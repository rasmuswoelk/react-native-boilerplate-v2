import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { eq } from 'drizzle-orm';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { tripItems } from '../schema';
import type { TripEntity, TripItemEntity } from '../types';

export function useTripItems(tripId: TripEntity['id']): {
  data: TripItemEntity[];
  isLoading: boolean;
  error: Error | null;
} {
  const query = useMemo(
    () =>
      db.select().from(tripItems).where(eq(tripItems.tripId, tripId)).orderBy(tripItems.sortOrder),
    [tripId],
  );
  const { data, isLoading, error } = useQuery<TripItemEntity>(toCompilableQuery(query));
  return { data, isLoading, error: error ?? null };
}
