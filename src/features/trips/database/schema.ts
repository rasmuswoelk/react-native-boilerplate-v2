import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const trips = sqliteTable('trips', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  destination: text('destination'),
  startDate: integer('start_date'),
  endDate: integer('end_date'),
  tripType: text('trip_type'),
  status: text('status', {
    enum: ['upcoming', 'active', 'completed', 'reviewed'],
  })
    .notNull()
    .default('upcoming'),
  notes: text('notes'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

export const tripLocations = sqliteTable('trip_locations', {
  id: text('id').primaryKey(),
  tripId: text('trip_id').notNull(),
  name: text('name').notNull(),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  arrival: integer('arrival'),
  departure: integer('departure'),
  sortOrder: integer('sort_order').notNull().default(0),
  notes: text('notes'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

export const tripItems = sqliteTable('trip_items', {
  id: text('id').primaryKey(),
  tripId: text('trip_id').notNull(),
  inventoryItemId: text('inventory_item_id'),
  name: text('name').notNull(),
  quantity: integer('quantity').notNull().default(1),
  isPacked: integer('is_packed').notNull().default(0),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

export const tripUsageReviews = sqliteTable('trip_usage_reviews', {
  id: text('id').primaryKey(),
  tripId: text('trip_id').notNull(),
  tripItemId: text('trip_item_id').notNull(),
  status: text('status', { enum: ['used', 'not_used', 'no_response'] }).notNull(),
  reviewedAt: integer('reviewed_at').notNull(),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});
