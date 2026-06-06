import { useCallback } from 'react';
import { deleteInventoryItem } from '../queries';
import type { InventoryItemEntity } from '../types';

export function useDeleteInventoryItem(): (id: InventoryItemEntity['id']) => Promise<void> {
  return useCallback(deleteInventoryItem, []);
}
