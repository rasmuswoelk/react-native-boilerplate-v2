import { packingListItems, packingLists } from './schema';

export type PackingListEntity = typeof packingLists.$inferSelect;
export type NewPackingListEntity = typeof packingLists.$inferInsert;

export type PackingListItemEntity = typeof packingListItems.$inferSelect;
export type NewPackingListItemEntity = typeof packingListItems.$inferInsert;
