import { useMemo } from 'react';
import { useQuery } from '@powersync/react-native';
import { toCompilableQuery } from '@powersync/drizzle-driver';
import { db } from '@/src/database/client';
import { trips } from '../schema';
import type { TripEntity } from '../types';

export function useTrips(): { data: TripEntity[]; isLoading: boolean; error: Error | null } {
  const query = useMemo(() => db.select().from(trips).orderBy(trips.createdAt), []);
  const { data, isLoading, error } = useQuery<TripEntity>(toCompilableQuery(query));
  return { data, isLoading, error: error ?? null };
}
