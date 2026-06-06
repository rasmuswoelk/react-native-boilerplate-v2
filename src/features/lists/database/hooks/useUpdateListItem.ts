import { useCallback } from 'react';
import { updateListItem } from '../queries';
import type { NewPackingListItemEntity, PackingListItemEntity } from '../types';

export function useUpdateListItem(): (
  id: PackingListItemEntity['id'],
  input: Partial<NewPackingListItemEntity>,
) => Promise<PackingListItemEntity> {
  return useCallback(updateListItem, []);
}
