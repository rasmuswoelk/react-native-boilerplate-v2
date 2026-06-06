import { tripItems, tripLocations, trips, tripUsageReviews } from './schema';

export type TripEntity = typeof trips.$inferSelect;
export type NewTripEntity = typeof trips.$inferInsert;

export type TripLocationEntity = typeof tripLocations.$inferSelect;
export type NewTripLocationEntity = typeof tripLocations.$inferInsert;

export type TripItemEntity = typeof tripItems.$inferSelect;
export type NewTripItemEntity = typeof tripItems.$inferInsert;

export type TripUsageReviewEntity = typeof tripUsageReviews.$inferSelect;
export type NewTripUsageReviewEntity = typeof tripUsageReviews.$inferInsert;
