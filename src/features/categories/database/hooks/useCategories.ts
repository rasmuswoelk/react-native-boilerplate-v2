import { toCompilableQuery } from '@powersync/drizzle-driver';
import { useQuery } from '@powersync/react-native';
import { useMemo } from 'react';
import { db } from '@/src/database/client';
import { categories } from '../schema';
import type { CategoryEntity } from '../types';

export function useCategories(): {
  data: CategoryEntity[];
  isLoading: boolean;
  error: Error | null;
} {
  const query = useMemo(() => db.select().from(categories).orderBy(categories.name), []);
  const { data, isLoading, error } = useQuery<CategoryEntity>(toCompilableQuery(query));
  return { data, isLoading, error: error ?? null };
}
