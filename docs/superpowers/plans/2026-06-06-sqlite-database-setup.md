# SQLite Database Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up a local-first SQLite database layer using OPS SQLite + PowerSync (local-only mode) + Drizzle ORM with feature-scoped schemas, typed Entity hooks, and a `database-feature` skill for future additions.

**Architecture:** PowerSync manages the local SQLite database using OPS SQLite as the native engine. `DrizzleAppSchema` auto-generates the PowerSync schema from Drizzle table definitions — no separate PowerSync schema file needed. `wrapPowerSyncWithDrizzle` wraps the PowerSync instance to produce a Drizzle `db` client used for all queries and mutations.

**Tech Stack:** `@op-engineering/op-sqlite`, `@powersync/react-native`, `@powersync/op-sqlite`, `@powersync/drizzle-driver`, `drizzle-orm`, `drizzle-kit` (dev)

---

## File Map

**Create:**
- `drizzle.config.ts` — drizzle-kit configuration
- `src/database/schema.ts` — aggregates all feature Drizzle schemas
- `src/database/powersync.ts` — `AppSchema` via `DrizzleAppSchema`
- `src/database/client.ts` — `powerSyncDb` + `db` singletons
- `src/database/providers/DatabaseContext.ts` — typed Drizzle db context
- `src/database/providers/PowerSyncContext.ts` — re-exports PowerSync context/hooks
- `src/database/providers/DatabaseProvider.tsx` — initializes DB, provides contexts
- `src/features/categories/database/schema.ts`
- `src/features/categories/database/types.ts`
- `src/features/categories/database/queries.ts`
- `src/features/categories/database/queries.test.ts`
- `src/features/categories/database/hooks/useCategories.ts`
- `src/features/categories/database/hooks/useCategories.test.ts`
- `src/features/categories/database/hooks/useCategory.ts`
- `src/features/categories/database/hooks/useCreateCategory.ts`
- `src/features/categories/database/hooks/useUpdateCategory.ts`
- `src/features/categories/database/hooks/useDeleteCategory.ts`
- `src/features/inventory/database/schema.ts`
- `src/features/inventory/database/types.ts`
- `src/features/inventory/database/queries.ts`
- `src/features/inventory/database/queries.test.ts`
- `src/features/inventory/database/hooks/useInventoryItems.ts`
- `src/features/inventory/database/hooks/useInventoryItems.test.ts`
- `src/features/inventory/database/hooks/useInventoryItem.ts`
- `src/features/inventory/database/hooks/useCreateInventoryItem.ts`
- `src/features/inventory/database/hooks/useUpdateInventoryItem.ts`
- `src/features/inventory/database/hooks/useDeleteInventoryItem.ts`
- `src/features/trips/database/schema.ts`
- `src/features/trips/database/types.ts`
- `src/features/trips/database/queries.ts`
- `src/features/trips/database/queries.test.ts`
- `src/features/trips/database/hooks/useTrips.ts`
- `src/features/trips/database/hooks/useTrips.test.ts`
- `src/features/trips/database/hooks/useTrip.ts`
- `src/features/trips/database/hooks/useCreateTrip.ts`
- `src/features/trips/database/hooks/useUpdateTrip.ts`
- `src/features/trips/database/hooks/useDeleteTrip.ts`
- `src/features/trips/database/hooks/useTripLocations.ts`
- `src/features/trips/database/hooks/useCreateTripLocation.ts`
- `src/features/trips/database/hooks/useUpdateTripLocation.ts`
- `src/features/trips/database/hooks/useDeleteTripLocation.ts`
- `src/features/lists/database/schema.ts`
- `src/features/lists/database/types.ts`
- `src/features/lists/database/queries.ts`
- `src/features/lists/database/queries.test.ts`
- `src/features/lists/database/hooks/useLists.ts`
- `src/features/lists/database/hooks/useLists.test.ts`
- `src/features/lists/database/hooks/useList.ts`
- `src/features/lists/database/hooks/useCreateList.ts`
- `src/features/lists/database/hooks/useUpdateList.ts`
- `src/features/lists/database/hooks/useDeleteList.ts`

**Modify:**
- `package.json` — remove `expo-sqlite`, add new packages, add `db:generate` script
- `app.json` — remove `"expo-sqlite"` from plugins array
- `jest.config.js` — add new native packages to `transformIgnorePatterns`
- `src/layouts/AppLayout/AppLayout.tsx` — wrap children with `DatabaseProvider`

> **API verification notes before starting:**
> - `powerSyncDb.init()` — verify the correct initialization method on `PowerSyncDatabase` from `@powersync/react-native`. It may be `init()`, `connect()` without a connector, or implicit (auto-initializes on first use). Check the installed version's TypeScript types.
> - `db.useQuery(query)` — verify that `wrapPowerSyncWithDrizzle` from `@powersync/drizzle-driver` returns a db with a `useQuery` method. If not, use PowerSync's `useQuery` hook from `@powersync/react-native` directly with a raw SQL string, or use a `useEffect` + `db.select()` pattern for reactive queries.

---

## Task 1: Install packages and configure project

**Files:**
- Modify: `package.json`
- Modify: `app.json`
- Modify: `jest.config.js`
- Create: `drizzle.config.ts`

- [ ] **Step 1: Remove expo-sqlite and install new packages**

```bash
pnpm remove expo-sqlite
pnpm add @op-engineering/op-sqlite @powersync/react-native @powersync/op-sqlite @powersync/drizzle-driver drizzle-orm
pnpm add -D drizzle-kit
```

- [ ] **Step 2: Remove expo-sqlite from app.json plugins**

In `app.json`, remove `"expo-sqlite"` from the `plugins` array. The array should look like:

```json
"plugins": [
  "expo-dev-client",
  "expo-router",
  [
    "expo-splash-screen",
    {
      "image": "./src/assets/images/splash-icon.png",
      "imageWidth": 200,
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  ],
  "expo-font",
  "expo-web-browser",
  "expo-localization"
]
```

- [ ] **Step 3: Add db:generate script to package.json**

In the `"scripts"` section of `package.json`, add:

```json
"db:generate": "drizzle-kit generate"
```

- [ ] **Step 4: Add new native packages to jest transformIgnorePatterns**

In `jest.config.js`, update `transformIgnorePatterns` to include the new packages:

```js
transformIgnorePatterns: [
  '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|react-native-unistyles|react-native-worklets|@shopify/react-native-skia|lottie-react-native|@op-engineering/op-sqlite|@powersync/react-native|@powersync/op-sqlite|@powersync/drizzle-driver|@powersync/common|drizzle-orm))',
  '/node_modules/react-native-reanimated/plugin/',
  '/node_modules/@react-native/babel-preset/',
],
```

- [ ] **Step 5: Create drizzle.config.ts at project root**

```ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
});
```

- [ ] **Step 6: Install iOS pods**

```bash
cd ios && pod install && cd ..
```

Expected: pod install completes with new pods for `op-sqlite`.

- [ ] **Step 7: Verify TypeScript compiles**

```bash
pnpm tsc
```

Expected: no errors (may show missing schema imports — that's fine at this stage).

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml app.json jest.config.js drizzle.config.ts ios/Podfile.lock ios/Podfile
git commit -m "chore: replace expo-sqlite with op-sqlite + powersync + drizzle"
```

---

## Task 2: Categories schema and types

**Files:**
- Create: `src/features/categories/database/schema.ts`
- Create: `src/features/categories/database/types.ts`

- [ ] **Step 1: Create the categories schema**

```ts
// src/features/categories/database/schema.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});
```

- [ ] **Step 2: Create the categories types**

```ts
// src/features/categories/database/types.ts
import { categories } from './schema';

export type CategoryEntity = typeof categories.$inferSelect;
export type NewCategoryEntity = typeof categories.$inferInsert;
```

- [ ] **Step 3: Verify TypeScript**

```bash
pnpm tsc
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/categories/
git commit -m "feat: add categories database schema and types"
```

---

## Task 3: Inventory schema and types

**Files:**
- Create: `src/features/inventory/database/schema.ts`
- Create: `src/features/inventory/database/types.ts`

- [ ] **Step 1: Create the inventory schema**

```ts
// src/features/inventory/database/schema.ts
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
```

- [ ] **Step 2: Create inventory types**

```ts
// src/features/inventory/database/types.ts
import { inventoryItems } from './schema';

export type InventoryItemEntity = typeof inventoryItems.$inferSelect;
export type NewInventoryItemEntity = typeof inventoryItems.$inferInsert;
```

- [ ] **Step 3: Verify TypeScript**

```bash
pnpm tsc
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/inventory/
git commit -m "feat: add inventory_items database schema and types"
```

---

## Task 4: Trips schema and types

**Files:**
- Create: `src/features/trips/database/schema.ts`
- Create: `src/features/trips/database/types.ts`

- [ ] **Step 1: Create the trips schema**

This file defines four tables: `trips`, `trip_locations`, `trip_items`, and `trip_usage_reviews`.

```ts
// src/features/trips/database/schema.ts
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
```

- [ ] **Step 2: Create trips types**

```ts
// src/features/trips/database/types.ts
import { tripItems, tripLocations, tripUsageReviews, trips } from './schema';

export type TripEntity = typeof trips.$inferSelect;
export type NewTripEntity = typeof trips.$inferInsert;

export type TripLocationEntity = typeof tripLocations.$inferSelect;
export type NewTripLocationEntity = typeof tripLocations.$inferInsert;

export type TripItemEntity = typeof tripItems.$inferSelect;
export type NewTripItemEntity = typeof tripItems.$inferInsert;

export type TripUsageReviewEntity = typeof tripUsageReviews.$inferSelect;
export type NewTripUsageReviewEntity = typeof tripUsageReviews.$inferInsert;
```

- [ ] **Step 3: Verify TypeScript**

```bash
pnpm tsc
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/trips/
git commit -m "feat: add trips database schema and types"
```

---

## Task 5: Lists schema and types

**Files:**
- Create: `src/features/lists/database/schema.ts`
- Create: `src/features/lists/database/types.ts`

- [ ] **Step 1: Create the lists schema**

```ts
// src/features/lists/database/schema.ts
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
```

- [ ] **Step 2: Create lists types**

```ts
// src/features/lists/database/types.ts
import { packingListItems, packingLists } from './schema';

export type PackingListEntity = typeof packingLists.$inferSelect;
export type NewPackingListEntity = typeof packingLists.$inferInsert;

export type PackingListItemEntity = typeof packingListItems.$inferSelect;
export type NewPackingListItemEntity = typeof packingListItems.$inferInsert;
```

- [ ] **Step 3: Verify TypeScript**

```bash
pnpm tsc
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/lists/
git commit -m "feat: add packing_lists + packing_list_items database schema and types"
```

---

## Task 6: Aggregate schema and generate migration snapshot

**Files:**
- Create: `src/database/schema.ts`

- [ ] **Step 1: Create the aggregate schema file**

This file re-exports all Drizzle table definitions in one place. `drizzle.config.ts` points here, and `client.ts` will import from here.

```ts
// src/database/schema.ts
export { categories } from '@/src/features/categories/database/schema';
export { inventoryItems } from '@/src/features/inventory/database/schema';
export {
  tripItems,
  tripLocations,
  tripUsageReviews,
  trips,
} from '@/src/features/trips/database/schema';
export { packingListItems, packingLists } from '@/src/features/lists/database/schema';
```

- [ ] **Step 2: Generate the migration snapshot**

```bash
pnpm db:generate
```

Expected: `src/database/migrations/` directory is created with a timestamped folder containing `migration.sql` and `snapshot.json`. These files track the schema for version control — PowerSync handles actual table creation via `DrizzleAppSchema`.

- [ ] **Step 3: Verify TypeScript**

```bash
pnpm tsc
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/database/schema.ts src/database/migrations/
git commit -m "feat: add aggregate database schema and initial migration snapshot"
```

---

## Task 7: Database client and contexts

**Files:**
- Create: `src/database/powersync.ts`
- Create: `src/database/client.ts`
- Create: `src/database/providers/DatabaseContext.ts`
- Create: `src/database/providers/PowerSyncContext.ts`

- [ ] **Step 1: Create powersync.ts — AppSchema from DrizzleAppSchema**

`DrizzleAppSchema` generates the PowerSync schema automatically from the Drizzle tables — no manual schema duplication needed.

```ts
// src/database/powersync.ts
import { DrizzleAppSchema } from '@powersync/drizzle-driver';
import * as drizzleSchema from './schema';

export const AppSchema = new DrizzleAppSchema(drizzleSchema);
```

- [ ] **Step 2: Create client.ts — PowerSync instance and Drizzle db**

```ts
// src/database/client.ts
import { wrapPowerSyncWithDrizzle } from '@powersync/drizzle-driver';
import { OPSqliteOpenFactory } from '@powersync/op-sqlite';
import { PowerSyncDatabase } from '@powersync/react-native';
import * as drizzleSchema from './schema';
import { AppSchema } from './powersync';

export const powerSyncDb = new PowerSyncDatabase({
  schema: AppSchema,
  database: new OPSqliteOpenFactory({ dbFilename: 'mule.db' }),
});

export const db = wrapPowerSyncWithDrizzle(powerSyncDb, { schema: drizzleSchema });
```

- [ ] **Step 3: Create DatabaseContext.ts**

```ts
// src/database/providers/DatabaseContext.ts
import { createContext, useContext } from 'react';
import type { db } from '../client';

type DrizzleDb = typeof db;

export const DatabaseContext = createContext<DrizzleDb | null>(null);

export function useDatabase(): DrizzleDb {
  const context = useContext(DatabaseContext);
  if (!context) throw new Error('useDatabase must be used within DatabaseProvider');
  return context;
}
```

- [ ] **Step 4: Create PowerSyncContext.ts**

```ts
// src/database/providers/PowerSyncContext.ts
export { PowerSyncContext, usePowerSync } from '@powersync/react-native';
```

- [ ] **Step 5: Verify TypeScript**

```bash
pnpm tsc
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/database/
git commit -m "feat: add database client, PowerSync instance, and contexts"
```

---

## Task 8: DatabaseProvider

**Files:**
- Create: `src/database/providers/DatabaseProvider.tsx`
- Create: `src/database/providers/DatabaseProvider.test.tsx`

- [ ] **Step 1: Write the failing test**

```ts
// src/database/providers/DatabaseProvider.test.tsx
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { DatabaseProvider } from './DatabaseProvider';

jest.mock('@/src/database/client', () => ({
  powerSyncDb: {
    init: jest.fn().mockResolvedValue(undefined),
  },
  db: {},
}));

jest.mock('@powersync/react-native', () => ({
  PowerSyncContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}));

describe('DatabaseProvider', () => {
  it('renders children once database is ready', async () => {
    const { getByText } = render(
      <DatabaseProvider>
        <Text>ready</Text>
      </DatabaseProvider>,
    );
    await waitFor(() => expect(getByText('ready')).toBeTruthy());
  });

  it('renders error message when init fails', async () => {
    const { powerSyncDb } = require('@/src/database/client');
    (powerSyncDb.init as jest.Mock).mockRejectedValueOnce(new Error('DB failed'));

    const { getByText } = render(
      <DatabaseProvider>
        <Text>ready</Text>
      </DatabaseProvider>,
    );
    await waitFor(() =>
      expect(getByText(/Database failed to initialize: DB failed/)).toBeTruthy(),
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
pnpm test:run src/database/providers/DatabaseProvider.test.tsx
```

Expected: FAIL — `DatabaseProvider` does not exist yet.

- [ ] **Step 3: Implement DatabaseProvider**

```tsx
// src/database/providers/DatabaseProvider.tsx
import { ReactNode, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { PowerSyncContext } from '@powersync/react-native';
import { db, powerSyncDb } from '../client';
import { DatabaseContext } from './DatabaseContext';

type Props = { children: ReactNode };

export function DatabaseProvider({ children }: Props) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    powerSyncDb
      .init()
      .then(() => setReady(true))
      .catch((e: unknown) =>
        setError(e instanceof Error ? e : new Error(String(e))),
      );
  }, []);

  if (error) {
    return (
      <View>
        <Text>Database failed to initialize: {error.message}</Text>
      </View>
    );
  }

  if (!ready) return null;

  return (
    <PowerSyncContext.Provider value={powerSyncDb}>
      <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
    </PowerSyncContext.Provider>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
pnpm test:run src/database/providers/DatabaseProvider.test.tsx
```

Expected: PASS — 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/database/providers/
git commit -m "feat: add DatabaseProvider with PowerSync init and error boundary"
```

---

## Task 9: Wire DatabaseProvider into AppLayout

**Files:**
- Modify: `src/layouts/AppLayout/AppLayout.tsx`

- [ ] **Step 1: Update AppLayout to wrap children with DatabaseProvider**

```tsx
// src/layouts/AppLayout/AppLayout.tsx
import { useFonts } from '@expo-google-fonts/source-sans-3/useFonts';
import { ReactNode } from 'react';
import { fonts } from '@/src/theme/fonts';
import { DatabaseProvider } from '@/src/database/providers/DatabaseProvider';

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [loaded] = useFonts(fonts);

  if (!loaded) {
    return null;
  }

  return <DatabaseProvider>{children}</DatabaseProvider>;
};
```

- [ ] **Step 2: Verify TypeScript**

```bash
pnpm tsc
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/AppLayout/AppLayout.tsx
git commit -m "feat: wire DatabaseProvider into AppLayout"
```

---

## Task 10: Categories queries and tests

**Files:**
- Create: `src/features/categories/database/queries.ts`
- Create: `src/features/categories/database/queries.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/features/categories/database/queries.test.ts
import { createCategory, deleteCategory, getCategoryById, updateCategory } from './queries';

const mockReturning = jest.fn();
const mockWhere = jest.fn(() => ({ returning: mockReturning }));
const mockSet = jest.fn(() => ({ where: mockWhere }));
const mockValues = jest.fn(() => ({ returning: mockReturning }));
const mockInsert = jest.fn(() => ({ values: mockValues }));
const mockUpdate = jest.fn(() => ({ set: mockSet }));
const mockDelete = jest.fn(() => ({ where: mockWhere }));
const mockLimit = jest.fn(() => ({ where: mockWhere }));
const mockFrom = jest.fn(() => ({ where: mockWhere, limit: mockLimit }));
const mockSelect = jest.fn(() => ({ from: mockFrom }));

jest.mock('@/src/database/client', () => ({
  db: {
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
    select: mockSelect,
  },
}));

jest.mock('drizzle-orm', () => ({ eq: jest.fn() }));

const now = Date.now();
const mockCategory = { id: 'cat-1', name: 'Clothing', icon: null, createdAt: now, updatedAt: now };

describe('category queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('createCategory inserts and returns the new record', async () => {
    mockReturning.mockResolvedValueOnce([mockCategory]);
    const result = await createCategory({ id: 'cat-1', name: 'Clothing', createdAt: now, updatedAt: now });
    expect(mockInsert).toHaveBeenCalled();
    expect(result).toEqual(mockCategory);
  });

  it('updateCategory updates and returns the updated record', async () => {
    mockReturning.mockResolvedValueOnce([{ ...mockCategory, name: 'Updated' }]);
    const result = await updateCategory('cat-1', { name: 'Updated', updatedAt: now });
    expect(mockUpdate).toHaveBeenCalled();
    expect(result.name).toBe('Updated');
  });

  it('deleteCategory removes the record', async () => {
    mockWhere.mockResolvedValueOnce(undefined);
    await deleteCategory('cat-1');
    expect(mockDelete).toHaveBeenCalled();
  });

  it('getCategoryById returns null when not found', async () => {
    mockWhere.mockResolvedValueOnce([]);
    const result = await getCategoryById('not-found');
    expect(result).toBeNull();
  });

  it('getCategoryById returns the category when found', async () => {
    mockWhere.mockResolvedValueOnce([mockCategory]);
    const result = await getCategoryById('cat-1');
    expect(result).toEqual(mockCategory);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
pnpm test:run src/features/categories/database/queries.test.ts
```

Expected: FAIL — `queries` module does not exist.

- [ ] **Step 3: Implement queries.ts**

```ts
// src/features/categories/database/queries.ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { categories } from './schema';
import type { CategoryEntity, NewCategoryEntity } from './types';

export async function createCategory(input: NewCategoryEntity): Promise<CategoryEntity> {
  const [created] = await db.insert(categories).values(input).returning();
  return created;
}

export async function updateCategory(
  id: CategoryEntity['id'],
  input: Partial<NewCategoryEntity>,
): Promise<CategoryEntity> {
  const [updated] = await db
    .update(categories)
    .set(input)
    .where(eq(categories.id, id))
    .returning();
  return updated;
}

export async function deleteCategory(id: CategoryEntity['id']): Promise<void> {
  await db.delete(categories).where(eq(categories.id, id));
}

export async function getCategoryById(id: CategoryEntity['id']): Promise<CategoryEntity | null> {
  const [category] = await db.select().from(categories).where(eq(categories.id, id));
  return category ?? null;
}

export async function getCategories(): Promise<CategoryEntity[]> {
  return db.select().from(categories).orderBy(categories.name);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

```bash
pnpm test:run src/features/categories/database/queries.test.ts
```

Expected: PASS — 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/features/categories/database/queries.ts src/features/categories/database/queries.test.ts
git commit -m "feat: add categories queries and tests"
```

---

## Task 11: Categories hooks

**Files:**
- Create: `src/features/categories/database/hooks/useCategories.ts`
- Create: `src/features/categories/database/hooks/useCategories.test.ts`
- Create: `src/features/categories/database/hooks/useCategory.ts`
- Create: `src/features/categories/database/hooks/useCreateCategory.ts`
- Create: `src/features/categories/database/hooks/useUpdateCategory.ts`
- Create: `src/features/categories/database/hooks/useDeleteCategory.ts`

- [ ] **Step 1: Write the failing tests for useCategories**

```ts
// src/features/categories/database/hooks/useCategories.test.ts
import { renderHook } from '@testing-library/react-native';
import { useCategories } from './useCategories';

const mockUseQuery = jest.fn();

jest.mock('@/src/database/client', () => ({
  db: {
    useQuery: mockUseQuery,
    select: jest.fn(() => ({ from: jest.fn(() => ({ orderBy: jest.fn() })) })),
  },
}));

describe('useCategories', () => {
  it('returns data, isLoading, and error from db.useQuery', () => {
    const mockResult = { data: [{ id: '1', name: 'Clothing' }], isLoading: false, error: null };
    mockUseQuery.mockReturnValue(mockResult);

    const { result } = renderHook(() => useCategories());

    expect(result.current.data).toEqual(mockResult.data);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('surfaces isLoading while query is in flight', () => {
    mockUseQuery.mockReturnValue({ data: [], isLoading: true, error: null });
    const { result } = renderHook(() => useCategories());
    expect(result.current.isLoading).toBe(true);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

```bash
pnpm test:run src/features/categories/database/hooks/useCategories.test.ts
```

Expected: FAIL — hook does not exist yet.

- [ ] **Step 3: Implement all categories hooks**

```ts
// src/features/categories/database/hooks/useCategories.ts
import { db } from '@/src/database/client';
import { categories } from '../schema';
import type { CategoryEntity } from '../types';

export function useCategories(): { data: CategoryEntity[]; isLoading: boolean; error: Error | null } {
  return db.useQuery(db.select().from(categories).orderBy(categories.name));
}
```

```ts
// src/features/categories/database/hooks/useCategory.ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { categories } from '../schema';
import type { CategoryEntity } from '../types';

export function useCategory(
  id: CategoryEntity['id'],
): { data: CategoryEntity | null; isLoading: boolean; error: Error | null } {
  const result = db.useQuery(
    db.select().from(categories).where(eq(categories.id, id)).limit(1),
  );
  return { ...result, data: result.data[0] ?? null };
}
```

```ts
// src/features/categories/database/hooks/useCreateCategory.ts
import { useCallback } from 'react';
import { createCategory } from '../queries';
import type { CategoryEntity, NewCategoryEntity } from '../types';

export function useCreateCategory(): (input: NewCategoryEntity) => Promise<CategoryEntity> {
  return useCallback(createCategory, []);
}
```

```ts
// src/features/categories/database/hooks/useUpdateCategory.ts
import { useCallback } from 'react';
import { updateCategory } from '../queries';
import type { CategoryEntity, NewCategoryEntity } from '../types';

export function useUpdateCategory(): (
  id: CategoryEntity['id'],
  input: Partial<NewCategoryEntity>,
) => Promise<CategoryEntity> {
  return useCallback(updateCategory, []);
}
```

```ts
// src/features/categories/database/hooks/useDeleteCategory.ts
import { useCallback } from 'react';
import { deleteCategory } from '../queries';
import type { CategoryEntity } from '../types';

export function useDeleteCategory(): (id: CategoryEntity['id']) => Promise<void> {
  return useCallback(deleteCategory, []);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

```bash
pnpm test:run src/features/categories/database/hooks/useCategories.test.ts
```

Expected: PASS.

- [ ] **Step 5: Run all tests to check for regressions**

```bash
pnpm test:run
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/features/categories/database/hooks/
git commit -m "feat: add categories CRUD hooks"
```

---

## Task 12: Inventory queries and tests

**Files:**
- Create: `src/features/inventory/database/queries.ts`
- Create: `src/features/inventory/database/queries.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/features/inventory/database/queries.test.ts
import {
  createInventoryItem,
  deleteInventoryItem,
  getInventoryItemById,
  updateInventoryItem,
} from './queries';

const mockReturning = jest.fn();
const mockWhere = jest.fn(() => ({ returning: mockReturning }));
const mockSet = jest.fn(() => ({ where: mockWhere }));
const mockValues = jest.fn(() => ({ returning: mockReturning }));
const mockInsert = jest.fn(() => ({ values: mockValues }));
const mockUpdate = jest.fn(() => ({ set: mockSet }));
const mockDelete = jest.fn(() => ({ where: mockWhere }));
const mockFrom = jest.fn(() => ({ where: mockWhere }));
const mockSelect = jest.fn(() => ({ from: mockFrom }));

jest.mock('@/src/database/client', () => ({
  db: {
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
    select: mockSelect,
  },
}));

jest.mock('drizzle-orm', () => ({ eq: jest.fn() }));

const now = Date.now();
const mockItem = {
  id: 'item-1',
  categoryId: null,
  name: 'Passport',
  description: null,
  weightGrams: null,
  quantity: 1,
  notes: null,
  tags: '[]',
  createdAt: now,
  updatedAt: now,
};

describe('inventory item queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('createInventoryItem inserts and returns new record', async () => {
    mockReturning.mockResolvedValueOnce([mockItem]);
    const result = await createInventoryItem({ id: 'item-1', name: 'Passport', tags: '[]', quantity: 1, createdAt: now, updatedAt: now });
    expect(mockInsert).toHaveBeenCalled();
    expect(result).toEqual(mockItem);
  });

  it('updateInventoryItem updates and returns updated record', async () => {
    mockReturning.mockResolvedValueOnce([{ ...mockItem, name: 'Updated Passport' }]);
    const result = await updateInventoryItem('item-1', { name: 'Updated Passport', updatedAt: now });
    expect(result.name).toBe('Updated Passport');
  });

  it('deleteInventoryItem removes the record', async () => {
    mockWhere.mockResolvedValueOnce(undefined);
    await deleteInventoryItem('item-1');
    expect(mockDelete).toHaveBeenCalled();
  });

  it('getInventoryItemById returns null when not found', async () => {
    mockWhere.mockResolvedValueOnce([]);
    const result = await getInventoryItemById('not-found');
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify they fail**

```bash
pnpm test:run src/features/inventory/database/queries.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement queries.ts**

```ts
// src/features/inventory/database/queries.ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { inventoryItems } from './schema';
import type { InventoryItemEntity, NewInventoryItemEntity } from './types';

export async function createInventoryItem(
  input: NewInventoryItemEntity,
): Promise<InventoryItemEntity> {
  const [created] = await db.insert(inventoryItems).values(input).returning();
  return created;
}

export async function updateInventoryItem(
  id: InventoryItemEntity['id'],
  input: Partial<NewInventoryItemEntity>,
): Promise<InventoryItemEntity> {
  const [updated] = await db
    .update(inventoryItems)
    .set(input)
    .where(eq(inventoryItems.id, id))
    .returning();
  return updated;
}

export async function deleteInventoryItem(id: InventoryItemEntity['id']): Promise<void> {
  await db.delete(inventoryItems).where(eq(inventoryItems.id, id));
}

export async function getInventoryItemById(
  id: InventoryItemEntity['id'],
): Promise<InventoryItemEntity | null> {
  const [item] = await db
    .select()
    .from(inventoryItems)
    .where(eq(inventoryItems.id, id));
  return item ?? null;
}

export async function getInventoryItems(): Promise<InventoryItemEntity[]> {
  return db.select().from(inventoryItems).orderBy(inventoryItems.name);
}

export async function getInventoryItemsByCategory(
  categoryId: InventoryItemEntity['categoryId'],
): Promise<InventoryItemEntity[]> {
  return db
    .select()
    .from(inventoryItems)
    .where(eq(inventoryItems.categoryId, categoryId))
    .orderBy(inventoryItems.name);
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm test:run src/features/inventory/database/queries.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/inventory/database/queries.ts src/features/inventory/database/queries.test.ts
git commit -m "feat: add inventory_items queries and tests"
```

---

## Task 13: Inventory hooks

**Files:**
- Create: `src/features/inventory/database/hooks/useInventoryItems.ts`
- Create: `src/features/inventory/database/hooks/useInventoryItems.test.ts`
- Create: `src/features/inventory/database/hooks/useInventoryItem.ts`
- Create: `src/features/inventory/database/hooks/useCreateInventoryItem.ts`
- Create: `src/features/inventory/database/hooks/useUpdateInventoryItem.ts`
- Create: `src/features/inventory/database/hooks/useDeleteInventoryItem.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/features/inventory/database/hooks/useInventoryItems.test.ts
import { renderHook } from '@testing-library/react-native';
import { useInventoryItems } from './useInventoryItems';

const mockUseQuery = jest.fn();

jest.mock('@/src/database/client', () => ({
  db: {
    useQuery: mockUseQuery,
    select: jest.fn(() => ({ from: jest.fn(() => ({ orderBy: jest.fn() })) })),
  },
}));

describe('useInventoryItems', () => {
  it('returns data, isLoading, and error', () => {
    const items = [{ id: '1', name: 'Passport', tags: '[]', quantity: 1, createdAt: 0, updatedAt: 0, categoryId: null, description: null, weightGrams: null, notes: null }];
    mockUseQuery.mockReturnValue({ data: items, isLoading: false, error: null });

    const { result } = renderHook(() => useInventoryItems());

    expect(result.current.data).toEqual(items);
    expect(result.current.isLoading).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify they fail**

```bash
pnpm test:run src/features/inventory/database/hooks/useInventoryItems.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement all inventory hooks**

```ts
// src/features/inventory/database/hooks/useInventoryItems.ts
import { db } from '@/src/database/client';
import { inventoryItems } from '../schema';
import type { InventoryItemEntity } from '../types';

export function useInventoryItems(): {
  data: InventoryItemEntity[];
  isLoading: boolean;
  error: Error | null;
} {
  return db.useQuery(db.select().from(inventoryItems).orderBy(inventoryItems.name));
}
```

```ts
// src/features/inventory/database/hooks/useInventoryItem.ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { inventoryItems } from '../schema';
import type { InventoryItemEntity } from '../types';

export function useInventoryItem(
  id: InventoryItemEntity['id'],
): { data: InventoryItemEntity | null; isLoading: boolean; error: Error | null } {
  const result = db.useQuery(
    db.select().from(inventoryItems).where(eq(inventoryItems.id, id)).limit(1),
  );
  return { ...result, data: result.data[0] ?? null };
}
```

```ts
// src/features/inventory/database/hooks/useCreateInventoryItem.ts
import { useCallback } from 'react';
import { createInventoryItem } from '../queries';
import type { InventoryItemEntity, NewInventoryItemEntity } from '../types';

export function useCreateInventoryItem(): (
  input: NewInventoryItemEntity,
) => Promise<InventoryItemEntity> {
  return useCallback(createInventoryItem, []);
}
```

```ts
// src/features/inventory/database/hooks/useUpdateInventoryItem.ts
import { useCallback } from 'react';
import { updateInventoryItem } from '../queries';
import type { InventoryItemEntity, NewInventoryItemEntity } from '../types';

export function useUpdateInventoryItem(): (
  id: InventoryItemEntity['id'],
  input: Partial<NewInventoryItemEntity>,
) => Promise<InventoryItemEntity> {
  return useCallback(updateInventoryItem, []);
}
```

```ts
// src/features/inventory/database/hooks/useDeleteInventoryItem.ts
import { useCallback } from 'react';
import { deleteInventoryItem } from '../queries';
import type { InventoryItemEntity } from '../types';

export function useDeleteInventoryItem(): (id: InventoryItemEntity['id']) => Promise<void> {
  return useCallback(deleteInventoryItem, []);
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm test:run src/features/inventory/database/hooks/useInventoryItems.test.ts
```

Expected: PASS.

- [ ] **Step 5: Run all tests**

```bash
pnpm test:run
```

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/features/inventory/database/hooks/
git commit -m "feat: add inventory_items CRUD hooks"
```

---

## Task 14: Trips queries and tests

**Files:**
- Create: `src/features/trips/database/queries.ts`
- Create: `src/features/trips/database/queries.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/features/trips/database/queries.test.ts
import {
  createTrip,
  createTripLocation,
  deleteTrip,
  deleteTripLocation,
  getTripById,
  updateTrip,
  updateTripLocation,
} from './queries';

const mockReturning = jest.fn();
const mockWhere = jest.fn(() => ({ returning: mockReturning }));
const mockSet = jest.fn(() => ({ where: mockWhere }));
const mockValues = jest.fn(() => ({ returning: mockReturning }));
const mockInsert = jest.fn(() => ({ values: mockValues }));
const mockUpdate = jest.fn(() => ({ set: mockSet }));
const mockDelete = jest.fn(() => ({ where: mockWhere }));
const mockFrom = jest.fn(() => ({ where: mockWhere }));
const mockSelect = jest.fn(() => ({ from: mockFrom }));

jest.mock('@/src/database/client', () => ({
  db: {
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
    select: mockSelect,
  },
}));

jest.mock('drizzle-orm', () => ({ eq: jest.fn() }));

const now = Date.now();
const mockTrip = {
  id: 'trip-1',
  name: 'Tokyo Trip',
  destination: 'Tokyo',
  startDate: now,
  endDate: now,
  tripType: null,
  status: 'upcoming' as const,
  notes: null,
  createdAt: now,
  updatedAt: now,
};

describe('trip queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('createTrip inserts and returns new record', async () => {
    mockReturning.mockResolvedValueOnce([mockTrip]);
    const result = await createTrip({ id: 'trip-1', name: 'Tokyo Trip', status: 'upcoming', createdAt: now, updatedAt: now });
    expect(mockInsert).toHaveBeenCalled();
    expect(result).toEqual(mockTrip);
  });

  it('updateTrip updates and returns updated record', async () => {
    mockReturning.mockResolvedValueOnce([{ ...mockTrip, status: 'active' }]);
    const result = await updateTrip('trip-1', { status: 'active', updatedAt: now });
    expect(result.status).toBe('active');
  });

  it('deleteTrip removes the record', async () => {
    mockWhere.mockResolvedValueOnce(undefined);
    await deleteTrip('trip-1');
    expect(mockDelete).toHaveBeenCalled();
  });

  it('getTripById returns null when not found', async () => {
    mockWhere.mockResolvedValueOnce([]);
    const result = await getTripById('not-found');
    expect(result).toBeNull();
  });

  it('createTripLocation inserts and returns new record', async () => {
    const mockLocation = { id: 'loc-1', tripId: 'trip-1', name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, arrival: null, departure: null, sortOrder: 0, notes: null, createdAt: now, updatedAt: now };
    mockReturning.mockResolvedValueOnce([mockLocation]);
    const result = await createTripLocation({ id: 'loc-1', tripId: 'trip-1', name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, sortOrder: 0, createdAt: now, updatedAt: now });
    expect(result).toEqual(mockLocation);
  });
});
```

- [ ] **Step 2: Run to verify they fail**

```bash
pnpm test:run src/features/trips/database/queries.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement queries.ts**

```ts
// src/features/trips/database/queries.ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { tripItems, tripLocations, tripUsageReviews, trips } from './schema';
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
  const [updated] = await db
    .update(trips)
    .set(input)
    .where(eq(trips.id, id))
    .returning();
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
  const [updated] = await db
    .update(tripItems)
    .set(input)
    .where(eq(tripItems.id, id))
    .returning();
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm test:run src/features/trips/database/queries.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/trips/database/queries.ts src/features/trips/database/queries.test.ts
git commit -m "feat: add trips queries and tests"
```

---

## Task 15: Trips hooks

**Files:**
- Create: `src/features/trips/database/hooks/useTrips.ts`
- Create: `src/features/trips/database/hooks/useTrips.test.ts`
- Create: `src/features/trips/database/hooks/useTrip.ts`
- Create: `src/features/trips/database/hooks/useCreateTrip.ts`
- Create: `src/features/trips/database/hooks/useUpdateTrip.ts`
- Create: `src/features/trips/database/hooks/useDeleteTrip.ts`
- Create: `src/features/trips/database/hooks/useTripLocations.ts`
- Create: `src/features/trips/database/hooks/useCreateTripLocation.ts`
- Create: `src/features/trips/database/hooks/useUpdateTripLocation.ts`
- Create: `src/features/trips/database/hooks/useDeleteTripLocation.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/features/trips/database/hooks/useTrips.test.ts
import { renderHook } from '@testing-library/react-native';
import { useTrips } from './useTrips';

const mockUseQuery = jest.fn();

jest.mock('@/src/database/client', () => ({
  db: {
    useQuery: mockUseQuery,
    select: jest.fn(() => ({ from: jest.fn(() => ({ orderBy: jest.fn() })) })),
  },
}));

describe('useTrips', () => {
  it('returns trips data, isLoading, and error', () => {
    const trips = [{ id: '1', name: 'Tokyo Trip', status: 'upcoming', createdAt: 0, updatedAt: 0, destination: null, startDate: null, endDate: null, tripType: null, notes: null }];
    mockUseQuery.mockReturnValue({ data: trips, isLoading: false, error: null });

    const { result } = renderHook(() => useTrips());

    expect(result.current.data).toEqual(trips);
    expect(result.current.isLoading).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify they fail**

```bash
pnpm test:run src/features/trips/database/hooks/useTrips.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement all trips hooks**

```ts
// src/features/trips/database/hooks/useTrips.ts
import { db } from '@/src/database/client';
import { trips } from '../schema';
import type { TripEntity } from '../types';

export function useTrips(): { data: TripEntity[]; isLoading: boolean; error: Error | null } {
  return db.useQuery(db.select().from(trips).orderBy(trips.createdAt));
}
```

```ts
// src/features/trips/database/hooks/useTrip.ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { trips } from '../schema';
import type { TripEntity } from '../types';

export function useTrip(
  id: TripEntity['id'],
): { data: TripEntity | null; isLoading: boolean; error: Error | null } {
  const result = db.useQuery(
    db.select().from(trips).where(eq(trips.id, id)).limit(1),
  );
  return { ...result, data: result.data[0] ?? null };
}
```

```ts
// src/features/trips/database/hooks/useCreateTrip.ts
import { useCallback } from 'react';
import { createTrip } from '../queries';
import type { NewTripEntity, TripEntity } from '../types';

export function useCreateTrip(): (input: NewTripEntity) => Promise<TripEntity> {
  return useCallback(createTrip, []);
}
```

```ts
// src/features/trips/database/hooks/useUpdateTrip.ts
import { useCallback } from 'react';
import { updateTrip } from '../queries';
import type { NewTripEntity, TripEntity } from '../types';

export function useUpdateTrip(): (
  id: TripEntity['id'],
  input: Partial<NewTripEntity>,
) => Promise<TripEntity> {
  return useCallback(updateTrip, []);
}
```

```ts
// src/features/trips/database/hooks/useDeleteTrip.ts
import { useCallback } from 'react';
import { deleteTrip } from '../queries';
import type { TripEntity } from '../types';

export function useDeleteTrip(): (id: TripEntity['id']) => Promise<void> {
  return useCallback(deleteTrip, []);
}
```

```ts
// src/features/trips/database/hooks/useTripLocations.ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { tripLocations } from '../schema';
import type { TripEntity, TripLocationEntity } from '../types';

export function useTripLocations(
  tripId: TripEntity['id'],
): { data: TripLocationEntity[]; isLoading: boolean; error: Error | null } {
  return db.useQuery(
    db
      .select()
      .from(tripLocations)
      .where(eq(tripLocations.tripId, tripId))
      .orderBy(tripLocations.sortOrder),
  );
}
```

```ts
// src/features/trips/database/hooks/useCreateTripLocation.ts
import { useCallback } from 'react';
import { createTripLocation } from '../queries';
import type { NewTripLocationEntity, TripLocationEntity } from '../types';

export function useCreateTripLocation(): (
  input: NewTripLocationEntity,
) => Promise<TripLocationEntity> {
  return useCallback(createTripLocation, []);
}
```

```ts
// src/features/trips/database/hooks/useUpdateTripLocation.ts
import { useCallback } from 'react';
import { updateTripLocation } from '../queries';
import type { NewTripLocationEntity, TripLocationEntity } from '../types';

export function useUpdateTripLocation(): (
  id: TripLocationEntity['id'],
  input: Partial<NewTripLocationEntity>,
) => Promise<TripLocationEntity> {
  return useCallback(updateTripLocation, []);
}
```

```ts
// src/features/trips/database/hooks/useDeleteTripLocation.ts
import { useCallback } from 'react';
import { deleteTripLocation } from '../queries';
import type { TripLocationEntity } from '../types';

export function useDeleteTripLocation(): (id: TripLocationEntity['id']) => Promise<void> {
  return useCallback(deleteTripLocation, []);
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm test:run src/features/trips/database/hooks/useTrips.test.ts
```

Expected: PASS.

- [ ] **Step 5: Run all tests**

```bash
pnpm test:run
```

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/features/trips/database/hooks/
git commit -m "feat: add trips and trip_locations CRUD hooks"
```

---

## Task 16: Lists queries and tests

**Files:**
- Create: `src/features/lists/database/queries.ts`
- Create: `src/features/lists/database/queries.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/features/lists/database/queries.test.ts
import { createList, deleteList, getListById, updateList } from './queries';

const mockReturning = jest.fn();
const mockWhere = jest.fn(() => ({ returning: mockReturning }));
const mockSet = jest.fn(() => ({ where: mockWhere }));
const mockValues = jest.fn(() => ({ returning: mockReturning }));
const mockInsert = jest.fn(() => ({ values: mockValues }));
const mockUpdate = jest.fn(() => ({ set: mockSet }));
const mockDelete = jest.fn(() => ({ where: mockWhere }));
const mockFrom = jest.fn(() => ({ where: mockWhere }));
const mockSelect = jest.fn(() => ({ from: mockFrom }));

jest.mock('@/src/database/client', () => ({
  db: {
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
    select: mockSelect,
  },
}));

jest.mock('drizzle-orm', () => ({ eq: jest.fn() }));

const now = Date.now();
const mockList = { id: 'list-1', name: 'Weekend Trip', description: null, tags: '[]', createdAt: now, updatedAt: now };

describe('packing list queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('createList inserts and returns new record', async () => {
    mockReturning.mockResolvedValueOnce([mockList]);
    const result = await createList({ id: 'list-1', name: 'Weekend Trip', tags: '[]', createdAt: now, updatedAt: now });
    expect(mockInsert).toHaveBeenCalled();
    expect(result).toEqual(mockList);
  });

  it('updateList updates and returns updated record', async () => {
    mockReturning.mockResolvedValueOnce([{ ...mockList, name: 'Updated' }]);
    const result = await updateList('list-1', { name: 'Updated', updatedAt: now });
    expect(result.name).toBe('Updated');
  });

  it('deleteList removes the record', async () => {
    mockWhere.mockResolvedValueOnce(undefined);
    await deleteList('list-1');
    expect(mockDelete).toHaveBeenCalled();
  });

  it('getListById returns null when not found', async () => {
    mockWhere.mockResolvedValueOnce([]);
    const result = await getListById('not-found');
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify they fail**

```bash
pnpm test:run src/features/lists/database/queries.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement queries.ts**

```ts
// src/features/lists/database/queries.ts
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
  return updated;
}

export async function deleteList(id: PackingListEntity['id']): Promise<void> {
  await db.delete(packingLists).where(eq(packingLists.id, id));
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm test:run src/features/lists/database/queries.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/lists/database/queries.ts src/features/lists/database/queries.test.ts
git commit -m "feat: add packing_lists queries and tests"
```

---

## Task 17: Lists hooks

**Files:**
- Create: `src/features/lists/database/hooks/useLists.ts`
- Create: `src/features/lists/database/hooks/useLists.test.ts`
- Create: `src/features/lists/database/hooks/useList.ts`
- Create: `src/features/lists/database/hooks/useCreateList.ts`
- Create: `src/features/lists/database/hooks/useUpdateList.ts`
- Create: `src/features/lists/database/hooks/useDeleteList.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/features/lists/database/hooks/useLists.test.ts
import { renderHook } from '@testing-library/react-native';
import { useLists } from './useLists';

const mockUseQuery = jest.fn();

jest.mock('@/src/database/client', () => ({
  db: {
    useQuery: mockUseQuery,
    select: jest.fn(() => ({ from: jest.fn(() => ({ orderBy: jest.fn() })) })),
  },
}));

describe('useLists', () => {
  it('returns lists data, isLoading, and error', () => {
    const lists = [{ id: '1', name: 'Weekend Trip', tags: '[]', createdAt: 0, updatedAt: 0, description: null }];
    mockUseQuery.mockReturnValue({ data: lists, isLoading: false, error: null });

    const { result } = renderHook(() => useLists());

    expect(result.current.data).toEqual(lists);
    expect(result.current.isLoading).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify they fail**

```bash
pnpm test:run src/features/lists/database/hooks/useLists.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement all lists hooks**

```ts
// src/features/lists/database/hooks/useLists.ts
import { db } from '@/src/database/client';
import { packingLists } from '../schema';
import type { PackingListEntity } from '../types';

export function useLists(): { data: PackingListEntity[]; isLoading: boolean; error: Error | null } {
  return db.useQuery(db.select().from(packingLists).orderBy(packingLists.name));
}
```

```ts
// src/features/lists/database/hooks/useList.ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { packingLists } from '../schema';
import type { PackingListEntity } from '../types';

export function useList(
  id: PackingListEntity['id'],
): { data: PackingListEntity | null; isLoading: boolean; error: Error | null } {
  const result = db.useQuery(
    db.select().from(packingLists).where(eq(packingLists.id, id)).limit(1),
  );
  return { ...result, data: result.data[0] ?? null };
}
```

```ts
// src/features/lists/database/hooks/useCreateList.ts
import { useCallback } from 'react';
import { createList } from '../queries';
import type { NewPackingListEntity, PackingListEntity } from '../types';

export function useCreateList(): (input: NewPackingListEntity) => Promise<PackingListEntity> {
  return useCallback(createList, []);
}
```

```ts
// src/features/lists/database/hooks/useUpdateList.ts
import { useCallback } from 'react';
import { updateList } from '../queries';
import type { NewPackingListEntity, PackingListEntity } from '../types';

export function useUpdateList(): (
  id: PackingListEntity['id'],
  input: Partial<NewPackingListEntity>,
) => Promise<PackingListEntity> {
  return useCallback(updateList, []);
}
```

```ts
// src/features/lists/database/hooks/useDeleteList.ts
import { useCallback } from 'react';
import { deleteList } from '../queries';
import type { PackingListEntity } from '../types';

export function useDeleteList(): (id: PackingListEntity['id']) => Promise<void> {
  return useCallback(deleteList, []);
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm test:run src/features/lists/database/hooks/useLists.test.ts
```

Expected: PASS.

- [ ] **Step 5: Run all tests**

```bash
pnpm test:run
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/features/lists/database/hooks/
git commit -m "feat: add packing_lists CRUD hooks"
```

---

## Task 18: Create database-feature skill

**Files:**
- Create: `~/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/database-feature.md` — or wherever project skills live; check existing skill paths first

> **Note:** Skill files live in the superpowers plugin directory. Run `find ~/.claude -name "*.md" -path "*/skills/*" | head -5` to find the correct path before creating the file.

- [ ] **Step 1: Find the correct skills directory**

```bash
find ~/.claude -name "*.md" -path "*/skills/*" | head -10
```

Expected: shows paths like `~/.claude/plugins/cache/.../skills/brainstorming.md`.

- [ ] **Step 2: Create the database-feature skill file**

Write to the skills directory found in step 1 (use the same parent directory as other skills):

```markdown
---
name: database-feature
description: Use when creating a new database feature or modifying an existing one — ensures schemas, types, queries, hooks, and PowerSync registration follow project conventions
metadata:
  type: skill
---

# Database Feature

Use this skill when:
- Adding a new feature with a database table
- Adding a new table to an existing feature
- Adding new query functions or hooks to an existing feature

## Checklist

1. **Schema** — define table in `src/features/<feature>/database/schema.ts` using `drizzle-orm/sqlite-core`
2. **Types** — export `<Name>Entity` and `New<Name>Entity` from `src/features/<feature>/database/types.ts`
3. **Aggregate schema** — add export to `src/database/schema.ts`
4. **Generate migration** — run `pnpm db:generate`
5. **Queries** — add CRUD functions to `src/features/<feature>/database/queries.ts`
6. **Tests** — add query tests to `queries.test.ts` (mock `@/src/database/client`)
7. **Hooks** — create hooks in `src/features/<feature>/database/hooks/`
8. **Hook tests** — add hook tests alongside hooks

## Schema Conventions

```ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const myTable = sqliteTable('my_table', {
  id: text('id').primaryKey(),                    // UUID, set by caller
  name: text('name').notNull(),
  isActive: integer('is_active').notNull().default(1),  // booleans as integer 0/1
  tags: text('tags').notNull().default('[]'),      // JSON arrays as text
  notes: text('notes'),                            // nullable = optional
  createdAt: integer('created_at').notNull(),      // unix ms
  updatedAt: integer('updated_at').notNull(),      // unix ms
});
```

**Rules:**
- All PKs are client-generated UUIDs (`crypto.randomUUID()`)
- No native boolean — use `integer` (0/1)
- No native array — use `text` with JSON serialisation
- All timestamps are unix milliseconds as `integer`
- Nullable columns are optional fields — no `.notNull()`
- FKs are `text` with no Drizzle `.references()` — PowerSync manages referential integrity

## Types Convention

```ts
// types.ts
import { myTable } from './schema';

export type MyTableEntity = typeof myTable.$inferSelect;
export type NewMyTableEntity = typeof myTable.$inferInsert;
```

Use the `Entity` suffix to avoid collisions with React component names.

## Queries Convention

```ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { myTable } from './schema';
import type { MyTableEntity, NewMyTableEntity } from './types';

export async function createMyRecord(input: NewMyTableEntity): Promise<MyTableEntity> {
  const [created] = await db.insert(myTable).values(input).returning();
  return created;
}

export async function updateMyRecord(
  id: MyTableEntity['id'],
  input: Partial<NewMyTableEntity>,
): Promise<MyTableEntity> {
  const [updated] = await db.update(myTable).set(input).where(eq(myTable.id, id)).returning();
  return updated;
}

export async function deleteMyRecord(id: MyTableEntity['id']): Promise<void> {
  await db.delete(myTable).where(eq(myTable.id, id));
}

export async function getMyRecordById(id: MyTableEntity['id']): Promise<MyTableEntity | null> {
  const [record] = await db.select().from(myTable).where(eq(myTable.id, id));
  return record ?? null;
}
```

## Hook Conventions

**Read hooks** use `db.useQuery()` for reactivity — components re-render automatically when data changes:

```ts
// useMyRecords.ts
import { db } from '@/src/database/client';
import { myTable } from '../schema';
import type { MyTableEntity } from '../types';

export function useMyRecords(): { data: MyTableEntity[]; isLoading: boolean; error: Error | null } {
  return db.useQuery(db.select().from(myTable).orderBy(myTable.createdAt));
}
```

**Single-record read hooks** unwrap the array:

```ts
// useMyRecord.ts
import { eq } from 'drizzle-orm';
import { db } from '@/src/database/client';
import { myTable } from '../schema';
import type { MyTableEntity } from '../types';

export function useMyRecord(
  id: MyTableEntity['id'],
): { data: MyTableEntity | null; isLoading: boolean; error: Error | null } {
  const result = db.useQuery(db.select().from(myTable).where(eq(myTable.id, id)).limit(1));
  return { ...result, data: result.data[0] ?? null };
}
```

**Write hooks** wrap query functions with `useCallback`:

```ts
// useCreateMyRecord.ts
import { useCallback } from 'react';
import { createMyRecord } from '../queries';
import type { MyTableEntity, NewMyTableEntity } from '../types';

export function useCreateMyRecord(): (input: NewMyTableEntity) => Promise<MyTableEntity> {
  return useCallback(createMyRecord, []);
}
```

## Testing Conventions

Mock `@/src/database/client` in all tests — OPS SQLite is a native module that cannot run in Jest:

```ts
jest.mock('@/src/database/client', () => ({
  db: {
    insert: jest.fn(() => ({ values: jest.fn(() => ({ returning: jest.fn() })) })),
    update: jest.fn(() => ({ set: jest.fn(() => ({ where: jest.fn(() => ({ returning: jest.fn() })) })) })),
    delete: jest.fn(() => ({ where: jest.fn() })),
    select: jest.fn(() => ({ from: jest.fn(() => ({ where: jest.fn(), orderBy: jest.fn() })) })),
    useQuery: jest.fn(),
  },
}));
jest.mock('drizzle-orm', () => ({ eq: jest.fn() }));
```

## PowerSync Notes

- `DrizzleAppSchema` in `src/database/powersync.ts` auto-generates the PowerSync schema from the aggregate `src/database/schema.ts` — **no manual registration needed**
- Adding a new table to `src/database/schema.ts` is the only PowerSync step required
- Do not add `.references()` to FK columns in Drizzle schema — PowerSync handles referential integrity
- When a backend is added later: configure `backendConnector` in `src/database/client.ts` only
```

- [ ] **Step 3: Commit**

```bash
git add <skill-file-path>
git commit -m "docs: add database-feature skill for future database work"
```

---

## Final Verification

- [ ] **Run the full test suite**

```bash
pnpm test:run
```

Expected: all tests pass.

- [ ] **Run TypeScript check**

```bash
pnpm tsc
```

Expected: no errors.

- [ ] **Run linter**

```bash
pnpm lint
```

Expected: no errors.
