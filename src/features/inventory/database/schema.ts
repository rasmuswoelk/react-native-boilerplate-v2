import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const inventoryItems = sqliteTable('inventory_items', {
  id: text('id').primaryKey(),
  categoryId: text('category_id'),
  name: text('name').notNull(),
  description: text('description'),
  weightGrams: integer('weight_grams'),
  quantity: integer('quantity').notNull().default(1),
  notes: text('notes'),
  tags: text('tags').notNull().default('[]'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});
