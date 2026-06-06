import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { packingLists } from '../schema';
import type { PackingListEntity } from '../types';

export function useLists(): { data: PackingListEntity[]; isLoading: boolean; error: Error | null } {
  const query = useMemo(() => db.select().from(packingLists).orderBy(packingLists.name), []);
  const { data, isLoading, error } = useQuery<PackingListEntity>(toCompilableQuery(query));
  return { data, isLoading, error: error ?? null };
}
