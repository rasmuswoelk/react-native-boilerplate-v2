import { useCallback } from 'react';
import { deleteList } from '../queries';
import type { PackingListEntity } from '../types';

export function useDeleteList(): (id: PackingListEntity['id']) => Promise<void> {
  return useCallback(deleteList, []);
}
