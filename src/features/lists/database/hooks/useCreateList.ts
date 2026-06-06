import { useCallback } from 'react';
import { createList } from '../queries';
import type { NewPackingListEntity, PackingListEntity } from '../types';

export function useCreateList(): (input: NewPackingListEntity) => Promise<PackingListEntity> {
  return useCallback(createList, []);
}
