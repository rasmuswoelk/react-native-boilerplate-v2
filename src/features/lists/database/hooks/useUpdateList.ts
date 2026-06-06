import { useCallback } from 'react';
import { updateList } from '../queries';
import type { NewPackingListEntity, PackingListEntity } from '../types';

export function useUpdateList(): (
  id: PackingListEntity['id'],
  input: Partial<NewPackingListEntity>,
) => Promise<PackingListEntity> {
  return useCallback(updateList, []);
}
