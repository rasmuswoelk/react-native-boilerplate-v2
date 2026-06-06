import { inventoryItems } from './schema';

export type InventoryItemEntity = typeof inventoryItems.$inferSelect;
export type NewInventoryItemEntity = typeof inventoryItems.$inferInsert;
