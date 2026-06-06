import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { packingListItems, packingLists } from './schema';
import type {
  NewPackingListEntity,
  NewPackingListItemEntity,
  PackingListEntity,
  PackingListItemEntity,
} from './types';

export async function createList(input: NewPackingListEntity): Promise<PackingListEntity> {
  const [created] = await db.insert(packingLists).values(input).returning();
  return created;
}

export async function updateList(
  id: PackingListEntity['id'],
  input: Partial<NewPackingListEntity>,
): Promise<PackingListEntity> {
  const [updated] = await db
    .update(packingLists)
    .set(input)
    .where(eq(packingLists.id, id))
    .returning();
  if (!updated) throw new Error(`PackingList with id ${id} not found`);
  return updated;
}

export async function deleteList(id: PackingListEntity['id']): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.delete(packingListItems).where(eq(packingListItems.packingListId, id));
    await tx.delete(packingLists).where(eq(packingLists.id, id));
  });
}

export async function getListById(id: PackingListEntity['id']): Promise<PackingListEntity | null> {
  const [list] = await db.select().from(packingLists).where(eq(packingLists.id, id));
  return list ?? null;
}

export async function getLists(): Promise<PackingListEntity[]> {
  return db.select().from(packingLists).orderBy(packingLists.name);
}

export async function createListItem(
  input: NewPackingListItemEntity,
): Promise<PackingListItemEntity> {
  const [created] = await db.insert(packingListItems).values(input).returning();
  return created;
}

export async function updateListItem(
  id: PackingListItemEntity['id'],
  input: Partial<NewPackingListItemEntity>,
): Promise<PackingListItemEntity> {
  const [updated] = await db
    .update(packingListItems)
    .set(input)
    .where(eq(packingListItems.id, id))
    .returning();
  if (!updated) throw new Error(`PackingListItem with id ${id} not found`);
  return updated;
}

export async function deleteListItem(id: PackingListItemEntity['id']): Promise<void> {
  await db.delete(packingListItems).where(eq(packingListItems.id, id));
}

export async function getListItemsByListId(
  packingListId: PackingListEntity['id'],
): Promise<PackingListItemEntity[]> {
  return db
    .select()
    .from(packingListItems)
    .where(eq(packingListItems.packingListId, packingListId))
    .orderBy(packingListItems.sortOrder);
}
