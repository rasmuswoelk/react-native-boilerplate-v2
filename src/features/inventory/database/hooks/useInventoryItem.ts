import { useMemo } from 'react';
import { eq } from 'drizzle-orm';
import { useQuery } from '@powersync/react-native';
import { toCompilableQuery } from '@powersync/drizzle-driver';
import { db } from '@/src/database/client';
import { inventoryItems } from '../schema';
import type { InventoryItemEntity } from '../types';

export function useInventoryItem(
  id: InventoryItemEntity['id'],
): { data: InventoryItemEntity | null; isLoading: boolean; error: Error | null } {
  const query = useMemo(
    () => db.select().from(inventoryItems).where(eq(inventoryItems.id, id)).limit(1),
    [id],
  );
  const { data, isLoading, error } = useQuery<InventoryItemEntity>(toCompilableQuery(query));
  return { data: data[0] ?? null, isLoading, error: error ?? null };
}
