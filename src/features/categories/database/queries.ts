import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { categories } from './schema';
import type { CategoryEntity, NewCategoryEntity } from './types';

export async function createCategory(input: NewCategoryEntity): Promise<CategoryEntity> {
  const [created] = await db.insert(categories).values(input).returning();
  return created;
}

export async function updateCategory(
  id: CategoryEntity['id'],
  input: Partial<NewCategoryEntity>,
): Promise<CategoryEntity> {
  const [updated] = await db
    .update(categories)
    .set(input)
    .where(eq(categories.id, id))
    .returning();
  return updated;
}

export async function deleteCategory(id: CategoryEntity['id']): Promise<void> {
  await db.delete(categories).where(eq(categories.id, id));
}

export async function getCategoryById(id: CategoryEntity['id']): Promise<CategoryEntity | null> {
  const [category] = await db.select().from(categories).where(eq(categories.id, id));
  return category ?? null;
}

export async function getCategories(): Promise<CategoryEntity[]> {
  return db.select().from(categories).orderBy(categories.name);
}
