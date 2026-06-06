import { eq } from 'drizzle-orm';
import { useQuery } from '@powersync/react-native';
import { toCompilableQuery } from '@powersync/drizzle-driver';
import { db } from '@/src/database/client';
import { categories } from '../schema';
import type { CategoryEntity } from '../types';

export function useCategory(
  id: CategoryEntity['id'],
): { data: CategoryEntity | null; isLoading: boolean; error: Error | null } {
  const query = db.select().from(categories).where(eq(categories.id, id)).limit(1);
  const result = useQuery(toCompilableQuery(query)) as { data: CategoryEntity[]; isLoading: boolean; error: Error | null };
  return { ...result, data: result.data[0] ?? null };
}
