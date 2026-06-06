import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { eq } from 'drizzle-orm';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { trips } from '../schema';
import type { TripEntity } from '../types';

export function useTrip(id: TripEntity['id']): {
  data: TripEntity | null;
  isLoading: boolean;
  error: Error | null;
} {
  const query = useMemo(() => db.select().from(trips).where(eq(trips.id, id)).limit(1), [id]);
  const { data, isLoading, error } = useQuery<TripEntity>(toCompilableQuery(query));
  return { data: data[0] ?? null, isLoading, error: error ?? null };
}
