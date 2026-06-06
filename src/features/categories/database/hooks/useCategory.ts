import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { eq } from 'drizzle-orm';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { categories } from '../schema';
import type { CategoryEntity } from '../types';

export function useCategory(id: CategoryEntity['id']): {
  data: CategoryEntity | null;
  isLoading: boolean;
  error: Error | null;
} {
  const query = useMemo(
    () => db.select().from(categories).where(eq(categories.id, id)).limit(1),
    [id],
  );
  const { data, isLoading, error } = useQuery<CategoryEntity>(toCompilableQuery(query));
  return { data: data[0] ?? null, isLoading, error: error ?? null };
}
