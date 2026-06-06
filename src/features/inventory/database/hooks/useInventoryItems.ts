import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { inventoryItems } from '../schema';
import type { InventoryItemEntity } from '../types';

export function useInventoryItems(): {
  data: InventoryItemEntity[];
  isLoading: boolean;
  error: Error | null;
} {
  const query = useMemo(() => db.select().from(inventoryItems).orderBy(inventoryItems.name), []);
  const { data, isLoading, error } = useQuery<InventoryItemEntity>(toCompilableQuery(query));
  return { data, isLoading, error: error ?? null };
}
