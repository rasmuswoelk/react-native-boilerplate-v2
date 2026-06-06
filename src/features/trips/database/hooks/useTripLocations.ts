import { useMemo } from 'react';
import { eq } from 'drizzle-orm';
import { useQuery } from '@powersync/react-native';
import { toCompilableQuery } from '@powersync/drizzle-driver';
import { db } from '@/src/database/client';
import { tripLocations } from '../schema';
import type { TripEntity, TripLocationEntity } from '../types';

export function useTripLocations(
  tripId: TripEntity['id'],
): { data: TripLocationEntity[]; isLoading: boolean; error: Error | null } {
  const query = useMemo(
    () =>
      db
        .select()
        .from(tripLocations)
        .where(eq(tripLocations.tripId, tripId))
        .orderBy(tripLocations.sortOrder),
    [tripId],
  );
  const { data, isLoading, error } = useQuery<TripLocationEntity>(toCompilableQuery(query));
  return { data, isLoading, error: error ?? null };
}
