import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const packingLists = sqliteTable('packing_lists', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  tags: text('tags').notNull().default('[]'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

export const packingListItems = sqliteTable('packing_list_items', {
  id: text('id').primaryKey(),
  packingListId: text('packing_list_id').notNull(),
  inventoryItemId: text('inventory_item_id'),
  name: text('name').notNull(),
  quantity: integer('quantity').notNull().default(1),
  isOptional: integer('is_optional').notNull().default(0),
  notes: text('notes'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});
