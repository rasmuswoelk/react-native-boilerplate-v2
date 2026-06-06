import { useCallback } from 'react';
import { updateCategory } from '../queries';
import type { CategoryEntity, NewCategoryEntity } from '../types';

export function useUpdateCategory(): (
  id: CategoryEntity['id'],
  input: Partial<NewCategoryEntity>,
) => Promise<CategoryEntity> {
  return useCallback(updateCategory, []);
}
