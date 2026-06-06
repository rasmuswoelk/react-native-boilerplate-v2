import { useCallback } from 'react';
import { deleteListItem } from '../queries';
import type { PackingListItemEntity } from '../types';

export function useDeleteListItem(): (id: PackingListItemEntity['id']) => Promise<void> {
  return useCallback(deleteListItem, []);
}
