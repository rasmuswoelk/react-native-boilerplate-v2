import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { eq } from 'drizzle-orm';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { packingListItems } from '../schema';
import type { PackingListEntity, PackingListItemEntity } from '../types';

export function useListItems(packingListId: PackingListEntity['id']): {
  data: PackingListItemEntity[];
  isLoading: boolean;
  error: Error | null;
} {
  const query = useMemo(
    () =>
      db
        .select()
        .from(packingListItems)
        .where(eq(packingListItems.packingListId, packingListId))
        .orderBy(packingListItems.sortOrder),
    [packingListId],
  );
  const { data, isLoading, error } = useQuery<PackingListItemEntity>(toCompilableQuery(query));
  return { data, isLoading, error: error ?? null };
}
