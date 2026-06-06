import { useQuery } from '@powersync/react-native';
import { toCompilableQuery } from '@powersync/drizzle-driver';
import { db } from '@/src/database/client';
import { categories } from '../schema';
import type { CategoryEntity } from '../types';

export function useCategories(): { data: CategoryEntity[]; isLoading: boolean; error: Error | null } {
  const query = db.select().from(categories).orderBy(categories.name);
  return useQuery(toCompilableQuery(query)) as { data: CategoryEntity[]; isLoading: boolean; error: Error | null };
}
