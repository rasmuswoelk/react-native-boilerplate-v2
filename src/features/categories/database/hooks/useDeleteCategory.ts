import { useCallback } from 'react';
import { deleteCategory } from '../queries';
import type { CategoryEntity } from '../types';

export function useDeleteCategory(): (id: CategoryEntity['id']) => Promise<void> {
  return useCallback(deleteCategory, []);
}
