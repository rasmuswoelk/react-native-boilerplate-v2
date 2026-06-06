import { useCallback } from 'react';
import { createListItem } from '../queries';
import type { NewPackingListItemEntity, PackingListItemEntity } from '../types';

export function useCreateListItem(): (
  input: NewPackingListItemEntity,
) => Promise<PackingListItemEntity> {
  return useCallback(createListItem, []);
}
