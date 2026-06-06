import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { eq } from 'drizzle-orm';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { inventoryItems } from '../schema';
import type { InventoryItemEntity } from '../types';

export function useInventoryItem(id: InventoryItemEntity['id']): {
  data: InventoryItemEntity | null;
  isLoading: boolean;
  error: Error | null;
} {
  const query = useMemo(
    () => db.select().from(inventoryItems).where(eq(inventoryItems.id, id)).limit(1),
    [id],
  );
  const { data, isLoading, error } = useQuery<InventoryItemEntity>(toCompilableQuery(query));
  return { data: data[0] ?? null, isLoading, error: error ?? null };
}
