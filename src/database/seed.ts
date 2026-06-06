import { categories } from '../features/categories/database/schema';
import { inventoryItems } from '../features/inventory/database/schema';
import { packingListItems, packingLists } from '../features/lists/database/schema';
import { tripItems, tripLocations, trips } from '../features/trips/database/schema';
import { db } from './client';

const now = () => Date.now();

const CATEGORIES = [
  { id: 'seed-cat-clothing', name: 'Clothing', icon: 'shirt' },
  { id: 'seed-cat-electronics', name: 'Electronics', icon: 'zap' },
  { id: 'seed-cat-toiletries', name: 'Toiletries', icon: 'droplets' },
  { id: 'seed-cat-documents', name: 'Documents', icon: 'file-text' },
  { id: 'seed-cat-medications', name: 'Medications', icon: 'pill' },
  { id: 'seed-cat-camping', name: 'Camping', icon: 'tent' },
];

const INVENTORY_ITEMS = [
  // Clothing
  {
    id: 'seed-inv-tshirt',
    categoryId: 'seed-cat-clothing',
    name: 'T-Shirt',
    quantity: 5,
    tags: '[]',
  },
  { id: 'seed-inv-jeans', categoryId: 'seed-cat-clothing', name: 'Jeans', quantity: 2, tags: '[]' },
  {
    id: 'seed-inv-jacket',
    categoryId: 'seed-cat-clothing',
    name: 'Jacket',
    quantity: 1,
    tags: '[]',
  },
  { id: 'seed-inv-socks', categoryId: 'seed-cat-clothing', name: 'Socks', quantity: 7, tags: '[]' },
  {
    id: 'seed-inv-underwear',
    categoryId: 'seed-cat-clothing',
    name: 'Underwear',
    quantity: 7,
    tags: '[]',
  },
  {
    id: 'seed-inv-swimwear',
    categoryId: 'seed-cat-clothing',
    name: 'Swimwear',
    quantity: 1,
    tags: '[]',
  },
  // Electronics
  {
    id: 'seed-inv-phone-charger',
    categoryId: 'seed-cat-electronics',
    name: 'Phone Charger',
    quantity: 1,
    weightGrams: 85,
    tags: '[]',
  },
  {
    id: 'seed-inv-power-bank',
    categoryId: 'seed-cat-electronics',
    name: 'Power Bank',
    quantity: 1,
    weightGrams: 220,
    tags: '[]',
  },
  {
    id: 'seed-inv-earbuds',
    categoryId: 'seed-cat-electronics',
    name: 'Earbuds',
    quantity: 1,
    weightGrams: 55,
    tags: '[]',
  },
  {
    id: 'seed-inv-travel-adapter',
    categoryId: 'seed-cat-electronics',
    name: 'Travel Adapter',
    quantity: 1,
    weightGrams: 95,
    tags: '[]',
  },
  // Toiletries
  {
    id: 'seed-inv-toothbrush',
    categoryId: 'seed-cat-toiletries',
    name: 'Toothbrush',
    quantity: 1,
    weightGrams: 20,
    tags: '[]',
  },
  {
    id: 'seed-inv-toothpaste',
    categoryId: 'seed-cat-toiletries',
    name: 'Toothpaste',
    quantity: 1,
    weightGrams: 100,
    tags: '[]',
  },
  {
    id: 'seed-inv-deodorant',
    categoryId: 'seed-cat-toiletries',
    name: 'Deodorant',
    quantity: 1,
    weightGrams: 75,
    tags: '[]',
  },
  {
    id: 'seed-inv-shampoo',
    categoryId: 'seed-cat-toiletries',
    name: 'Shampoo',
    quantity: 1,
    weightGrams: 150,
    tags: '[]',
  },
  {
    id: 'seed-inv-sunscreen',
    categoryId: 'seed-cat-toiletries',
    name: 'Sunscreen SPF 50',
    quantity: 1,
    weightGrams: 90,
    tags: '[]',
  },
  // Documents
  {
    id: 'seed-inv-passport',
    categoryId: 'seed-cat-documents',
    name: 'Passport',
    quantity: 1,
    weightGrams: 45,
    tags: '[]',
  },
  {
    id: 'seed-inv-travel-insurance',
    categoryId: 'seed-cat-documents',
    name: 'Travel Insurance',
    quantity: 1,
    tags: '[]',
  },
  // Medications
  {
    id: 'seed-inv-pain-relief',
    categoryId: 'seed-cat-medications',
    name: 'Pain Relief',
    quantity: 1,
    weightGrams: 30,
    tags: '[]',
  },
  {
    id: 'seed-inv-antihistamine',
    categoryId: 'seed-cat-medications',
    name: 'Antihistamine',
    quantity: 1,
    weightGrams: 20,
    tags: '[]',
  },
  // Camping
  {
    id: 'seed-inv-sleeping-bag',
    categoryId: 'seed-cat-camping',
    name: 'Sleeping Bag',
    quantity: 1,
    weightGrams: 900,
    tags: '[]',
  },
  {
    id: 'seed-inv-headlamp',
    categoryId: 'seed-cat-camping',
    name: 'Headlamp',
    quantity: 1,
    weightGrams: 85,
    tags: '[]',
  },
] as const;

const PACKING_LISTS = [
  {
    id: 'seed-list-weekend',
    name: 'Weekend Bag',
    description: 'Light packing for a 2–3 day trip',
    tags: '[]',
  },
  {
    id: 'seed-list-beach',
    name: 'Beach Trip',
    description: 'Sun, sand, and sea essentials',
    tags: '[]',
  },
  {
    id: 'seed-list-business',
    name: 'Business Travel',
    description: 'Work trip essentials',
    tags: '[]',
  },
];

const PACKING_LIST_ITEMS = [
  // Weekend Bag
  {
    id: 'seed-li-wk-tshirt',
    packingListId: 'seed-list-weekend',
    inventoryItemId: 'seed-inv-tshirt',
    name: 'T-Shirt',
    quantity: 2,
    isOptional: 0,
    sortOrder: 0,
  },
  {
    id: 'seed-li-wk-jeans',
    packingListId: 'seed-list-weekend',
    inventoryItemId: 'seed-inv-jeans',
    name: 'Jeans',
    quantity: 1,
    isOptional: 0,
    sortOrder: 1,
  },
  {
    id: 'seed-li-wk-charger',
    packingListId: 'seed-list-weekend',
    inventoryItemId: 'seed-inv-phone-charger',
    name: 'Phone Charger',
    quantity: 1,
    isOptional: 0,
    sortOrder: 2,
  },
  {
    id: 'seed-li-wk-toothbrush',
    packingListId: 'seed-list-weekend',
    inventoryItemId: 'seed-inv-toothbrush',
    name: 'Toothbrush',
    quantity: 1,
    isOptional: 0,
    sortOrder: 3,
  },
  {
    id: 'seed-li-wk-passport',
    packingListId: 'seed-list-weekend',
    inventoryItemId: 'seed-inv-passport',
    name: 'Passport',
    quantity: 1,
    isOptional: 1,
    sortOrder: 4,
  },
  // Beach Trip
  {
    id: 'seed-li-bch-swimwear',
    packingListId: 'seed-list-beach',
    inventoryItemId: 'seed-inv-swimwear',
    name: 'Swimwear',
    quantity: 2,
    isOptional: 0,
    sortOrder: 0,
  },
  {
    id: 'seed-li-bch-sunscreen',
    packingListId: 'seed-list-beach',
    inventoryItemId: 'seed-inv-sunscreen',
    name: 'Sunscreen SPF 50',
    quantity: 1,
    isOptional: 0,
    sortOrder: 1,
  },
  {
    id: 'seed-li-bch-tshirt',
    packingListId: 'seed-list-beach',
    inventoryItemId: 'seed-inv-tshirt',
    name: 'T-Shirt',
    quantity: 3,
    isOptional: 0,
    sortOrder: 2,
  },
  {
    id: 'seed-li-bch-charger',
    packingListId: 'seed-list-beach',
    inventoryItemId: 'seed-inv-phone-charger',
    name: 'Phone Charger',
    quantity: 1,
    isOptional: 0,
    sortOrder: 3,
  },
  {
    id: 'seed-li-bch-earbuds',
    packingListId: 'seed-list-beach',
    inventoryItemId: 'seed-inv-earbuds',
    name: 'Earbuds',
    quantity: 1,
    isOptional: 1,
    sortOrder: 4,
  },
  // Business Travel
  {
    id: 'seed-li-biz-passport',
    packingListId: 'seed-list-business',
    inventoryItemId: 'seed-inv-passport',
    name: 'Passport',
    quantity: 1,
    isOptional: 0,
    sortOrder: 0,
  },
  {
    id: 'seed-li-biz-charger',
    packingListId: 'seed-list-business',
    inventoryItemId: 'seed-inv-phone-charger',
    name: 'Phone Charger',
    quantity: 1,
    isOptional: 0,
    sortOrder: 1,
  },
  {
    id: 'seed-li-biz-adapter',
    packingListId: 'seed-list-business',
    inventoryItemId: 'seed-inv-travel-adapter',
    name: 'Travel Adapter',
    quantity: 1,
    isOptional: 0,
    sortOrder: 2,
  },
  {
    id: 'seed-li-biz-insurance',
    packingListId: 'seed-list-business',
    inventoryItemId: 'seed-inv-travel-insurance',
    name: 'Travel Insurance',
    quantity: 1,
    isOptional: 0,
    sortOrder: 3,
  },
] as const;

const nextMonth = Date.now() + 30 * 24 * 60 * 60 * 1000;

const TRIPS = [
  {
    id: 'seed-trip-paris',
    name: 'Paris',
    destination: 'Paris, France',
    startDate: nextMonth,
    endDate: nextMonth + 7 * 24 * 60 * 60 * 1000,
    tripType: 'leisure',
    status: 'upcoming' as const,
    notes: 'First visit — see the Eiffel Tower, Louvre, and Montmartre.',
  },
];

const TRIP_LOCATIONS = [
  {
    id: 'seed-tloc-cdg',
    tripId: 'seed-trip-paris',
    name: 'CDG Airport',
    latitude: 49.0097,
    longitude: 2.5479,
    sortOrder: 0,
  },
  {
    id: 'seed-tloc-paris',
    tripId: 'seed-trip-paris',
    name: 'Paris City Centre',
    latitude: 48.8566,
    longitude: 2.3522,
    sortOrder: 1,
  },
];

const TRIP_ITEMS = [
  {
    id: 'seed-ti-passport',
    tripId: 'seed-trip-paris',
    inventoryItemId: 'seed-inv-passport',
    name: 'Passport',
    quantity: 1,
    isPacked: 0,
    sortOrder: 0,
  },
  {
    id: 'seed-ti-charger',
    tripId: 'seed-trip-paris',
    inventoryItemId: 'seed-inv-phone-charger',
    name: 'Phone Charger',
    quantity: 1,
    isPacked: 0,
    sortOrder: 1,
  },
  {
    id: 'seed-ti-adapter',
    tripId: 'seed-trip-paris',
    inventoryItemId: 'seed-inv-travel-adapter',
    name: 'Travel Adapter',
    quantity: 1,
    isPacked: 0,
    sortOrder: 2,
  },
  {
    id: 'seed-ti-jacket',
    tripId: 'seed-trip-paris',
    inventoryItemId: 'seed-inv-jacket',
    name: 'Jacket',
    quantity: 1,
    isPacked: 0,
    sortOrder: 3,
  },
  {
    id: 'seed-ti-tshirts',
    tripId: 'seed-trip-paris',
    inventoryItemId: 'seed-inv-tshirt',
    name: 'T-Shirts',
    quantity: 4,
    isPacked: 0,
    sortOrder: 4,
  },
  {
    id: 'seed-ti-jeans',
    tripId: 'seed-trip-paris',
    inventoryItemId: 'seed-inv-jeans',
    name: 'Jeans',
    quantity: 2,
    isPacked: 0,
    sortOrder: 5,
  },
  {
    id: 'seed-ti-toothbrush',
    tripId: 'seed-trip-paris',
    inventoryItemId: 'seed-inv-toothbrush',
    name: 'Toothbrush',
    quantity: 1,
    isPacked: 0,
    sortOrder: 6,
  },
  {
    id: 'seed-ti-insurance',
    tripId: 'seed-trip-paris',
    inventoryItemId: 'seed-inv-travel-insurance',
    name: 'Travel Insurance',
    quantity: 1,
    isPacked: 0,
    sortOrder: 7,
  },
];

export async function seedDatabase(): Promise<void> {
  const existing = await db.select().from(categories).limit(1);
  if (existing.length > 0) return;

  const ts = now();

  await db.transaction(async (tx) => {
    await tx
      .insert(categories)
      .values(CATEGORIES.map((c) => ({ ...c, createdAt: ts, updatedAt: ts })));

    await tx
      .insert(inventoryItems)
      .values(INVENTORY_ITEMS.map((i) => ({ ...i, createdAt: ts, updatedAt: ts })));

    await tx
      .insert(packingLists)
      .values(PACKING_LISTS.map((l) => ({ ...l, createdAt: ts, updatedAt: ts })));

    await tx
      .insert(packingListItems)
      .values(PACKING_LIST_ITEMS.map((i) => ({ ...i, createdAt: ts, updatedAt: ts })));

    await tx.insert(trips).values(TRIPS.map((t) => ({ ...t, createdAt: ts, updatedAt: ts })));

    await tx
      .insert(tripLocations)
      .values(TRIP_LOCATIONS.map((l) => ({ ...l, createdAt: ts, updatedAt: ts })));

    await tx
      .insert(tripItems)
      .values(TRIP_ITEMS.map((i) => ({ ...i, createdAt: ts, updatedAt: ts })));
  });
}
