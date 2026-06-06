import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { tripItems, tripLocations, trips, tripUsageReviews } from './schema';
import type {
  NewTripEntity,
  NewTripItemEntity,
  NewTripLocationEntity,
  NewTripUsageReviewEntity,
  TripEntity,
  TripItemEntity,
  TripLocationEntity,
  TripUsageReviewEntity,
} from './types';

export async function createTrip(input: NewTripEntity): Promise<TripEntity> {
  const [created] = await db.insert(trips).values(input).returning();
  return created;
}

export async function updateTrip(
  id: TripEntity['id'],
  input: Partial<NewTripEntity>,
): Promise<TripEntity> {
  const [updated] = await db.update(trips).set(input).where(eq(trips.id, id)).returning();
  return updated;
}

export async function deleteTrip(id: TripEntity['id']): Promise<void> {
  await db.delete(trips).where(eq(trips.id, id));
}

export async function getTripById(id: TripEntity['id']): Promise<TripEntity | null> {
  const [trip] = await db.select().from(trips).where(eq(trips.id, id));
  return trip ?? null;
}

export async function getTrips(): Promise<TripEntity[]> {
  return db.select().from(trips).orderBy(trips.createdAt);
}

export async function createTripLocation(
  input: NewTripLocationEntity,
): Promise<TripLocationEntity> {
  const [created] = await db.insert(tripLocations).values(input).returning();
  return created;
}

export async function updateTripLocation(
  id: TripLocationEntity['id'],
  input: Partial<NewTripLocationEntity>,
): Promise<TripLocationEntity> {
  const [updated] = await db
    .update(tripLocations)
    .set(input)
    .where(eq(tripLocations.id, id))
    .returning();
  return updated;
}

export async function deleteTripLocation(id: TripLocationEntity['id']): Promise<void> {
  await db.delete(tripLocations).where(eq(tripLocations.id, id));
}

export async function getTripLocationsByTripId(
  tripId: TripEntity['id'],
): Promise<TripLocationEntity[]> {
  return db
    .select()
    .from(tripLocations)
    .where(eq(tripLocations.tripId, tripId))
    .orderBy(tripLocations.sortOrder);
}

export async function createTripItem(input: NewTripItemEntity): Promise<TripItemEntity> {
  const [created] = await db.insert(tripItems).values(input).returning();
  return created;
}

export async function updateTripItem(
  id: TripItemEntity['id'],
  input: Partial<NewTripItemEntity>,
): Promise<TripItemEntity> {
  const [updated] = await db.update(tripItems).set(input).where(eq(tripItems.id, id)).returning();
  return updated;
}

export async function deleteTripItem(id: TripItemEntity['id']): Promise<void> {
  await db.delete(tripItems).where(eq(tripItems.id, id));
}

export async function createTripUsageReview(
  input: NewTripUsageReviewEntity,
): Promise<TripUsageReviewEntity> {
  const [created] = await db.insert(tripUsageReviews).values(input).returning();
  return created;
}

export async function updateTripUsageReview(
  id: TripUsageReviewEntity['id'],
  input: Partial<NewTripUsageReviewEntity>,
): Promise<TripUsageReviewEntity> {
  const [updated] = await db
    .update(tripUsageReviews)
    .set(input)
    .where(eq(tripUsageReviews.id, id))
    .returning();
  return updated;
}
