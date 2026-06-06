import { useCallback } from 'react';
import { updateInventoryItem } from '../queries';
import type { InventoryItemEntity, NewInventoryItemEntity } from '../types';

export function useUpdateInventoryItem(): (
  id: InventoryItemEntity['id'],
  input: Partial<NewInventoryItemEntity>,
) => Promise<InventoryItemEntity> {
  return useCallback(updateInventoryItem, []);
}
