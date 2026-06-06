import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { eq } from 'drizzle-orm';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { packingLists } from '../schema';
import type { PackingListEntity } from '../types';

export function useList(id: PackingListEntity['id']): {
  data: PackingListEntity | null;
  isLoading: boolean;
  error: Error | null;
} {
  const query = useMemo(
    () => db.select().from(packingLists).where(eq(packingLists.id, id)).limit(1),
    [id],
  );
  const { data, isLoading, error } = useQuery<PackingListEntity>(toCompilableQuery(query));
  return { data: data[0] ?? null, isLoading, error: error ?? null };
}
