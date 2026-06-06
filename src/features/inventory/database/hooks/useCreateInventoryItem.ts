import { useCallback } from 'react';
import { createInventoryItem } from '../queries';
import type { InventoryItemEntity, NewInventoryItemEntity } from '../types';

export function useCreateInventoryItem(): (
  input: NewInventoryItemEntity,
) => Promise<InventoryItemEntity> {
  return useCallback(createInventoryItem, []);
}
