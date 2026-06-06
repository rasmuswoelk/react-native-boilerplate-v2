import { categories } from './schema';

export type CategoryEntity = typeof categories.$inferSelect;
export type NewCategoryEntity = typeof categories.$inferInsert;
