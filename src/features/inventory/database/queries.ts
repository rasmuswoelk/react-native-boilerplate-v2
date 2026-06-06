import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { inventoryItems } from './schema';
import type { InventoryItemEntity, NewInventoryItemEntity } from './types';

export async function createInventoryItem(
  input: NewInventoryItemEntity,
): Promise<InventoryItemEntity> {
  const [created] = await db.insert(inventoryItems).values(input).returning();
  return created;
}

export async function updateInventoryItem(
  id: InventoryItemEntity['id'],
  input: Partial<NewInventoryItemEntity>,
): Promise<InventoryItemEntity> {
  const [updated] = await db
    .update(inventoryItems)
    .set(input)
    .where(eq(inventoryItems.id, id))
    .returning();
  return updated;
}

export async function deleteInventoryItem(id: InventoryItemEntity['id']): Promise<void> {
  await db.delete(inventoryItems).where(eq(inventoryItems.id, id));
}

export async function getInventoryItemById(
  id: InventoryItemEntity['id'],
): Promise<InventoryItemEntity | null> {
  const [item] = await db.select().from(inventoryItems).where(eq(inventoryItems.id, id));
  return item ?? null;
}

export async function getInventoryItems(): Promise<InventoryItemEntity[]> {
  return db.select().from(inventoryItems).orderBy(inventoryItems.name);
}

export async function getInventoryItemsByCategory(
  categoryId: NonNullable<InventoryItemEntity['categoryId']>,
): Promise<InventoryItemEntity[]> {
  return db
    .select()
    .from(inventoryItems)
    .where(eq(inventoryItems.categoryId, categoryId))
    .orderBy(inventoryItems.name);
}
