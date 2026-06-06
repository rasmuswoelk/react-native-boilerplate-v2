import { useCallback } from 'react';
import { createCategory } from '../queries';
import type { CategoryEntity, NewCategoryEntity } from '../types';

export function useCreateCategory(): (input: NewCategoryEntity) => Promise<CategoryEntity> {
  return useCallback(createCategory, []);
}
