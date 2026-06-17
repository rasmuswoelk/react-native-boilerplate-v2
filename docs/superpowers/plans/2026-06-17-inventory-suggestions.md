# Inventory Suggestions Implementation Plan

> **For agentic workers:** Implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a static inventory suggestion catalog that helps users quickly populate their inventory during onboarding and later add more common travel items. Suggestions are localized through the existing i18n setup, stored statically in the app, and converted into normal database rows only when the user adds them.

**Architecture:** Keep suggestions as app-bundled catalog data, separate from user-owned database rows. Each suggestion has a stable identifier used for translations and provenance. When a user accepts a suggestion, the app creates the required category row if needed and inserts an `inventory_items` row with the localized name copied into the database.

---

## Product Rules

- Suggestions are not database rows until the user adds them.
- Added inventory items become user-owned data and should not automatically rename when the app language changes.
- Suggestion labels should render in the user's selected language and fall back to English/default names.
- Category labels should render in the user's selected language for suggestion UI.
- Predefined category rows should be created in the database only when needed.
- Suggestions should be deduped against existing inventory rows using a stable `sourceSuggestionId`.
- The suggestion catalog must be easy to expand without schema changes.

---

## Default Categories

Use these stable category IDs. The display names are English defaults and i18n fallback values.

| ID | Default Name | Purpose | Example Items |
|---|---|---|---|
| `essentials` | Essentials | Items people almost always need | passport, wallet, keys, phone, charger, tickets, travel documents |
| `clothing` | Clothing | General clothes | t-shirts, pants, underwear, socks, sweater, jacket, sleepwear |
| `footwear` | Footwear | Shoes and related items | sneakers, sandals, hiking boots, dress shoes, insoles |
| `toiletries` | Toiletries | Bathroom and hygiene items | toothbrush, toothpaste, deodorant, shampoo, razor, skincare |
| `health` | Health | Medical and wellness items | medication, painkillers, vitamins, first aid kit, glasses, contact lenses |
| `electronics` | Electronics | Devices and accessories | laptop, tablet, camera, headphones, power bank, adapters, cables |
| `travel_gear` | Travel Gear | Luggage and travel-specific equipment | backpack, suitcase, packing cubes, luggage lock, neck pillow, travel towel |
| `weather_gear` | Weather Gear | Items based on climate and season | rain jacket, umbrella, gloves, hat, sunscreen, sunglasses |
| `activities` | Activities | Trip-specific gear | swimwear, workout clothes, hiking gear, ski gear, snorkeling gear, books, games |
| `food_drink` | Food & Drink | Consumables and reusable food items | water bottle, snacks, coffee, lunch box, cutlery |
| `baby_kids` | Baby & Kids | Items for users traveling with children | diapers, stroller, toys, baby food, pacifier, child medication |
| `pets` | Pets | Items for users traveling with animals | leash, pet food, bowls, medication, pet documents |
| `work` | Work | Business trips or remote work | laptop stand, notebook, business cards, work documents, mouse, keyboard |
| `safety` | Safety | Travel, outdoor, and unfamiliar-place safety items | flashlight, whistle, emergency cash, copies of documents, AirTag, pepper spray where legal |
| `miscellaneous` | Miscellaneous | Fallback category for items that do not fit elsewhere | gifts, souvenirs, laundry bag, ziplock bags |

Category assignment guidelines:

- Put must-not-forget travel items in `essentials`, even if they could technically fit another category.
- Put climate and season protection in `weather_gear`; for example, sunscreen and sunglasses belong there.
- Put trip-context items in `activities`; for example, swimwear, workout clothes, ski gear, and books.
- Keep `miscellaneous` as a true fallback rather than a general dumping category.

---

## File Map

**Create:**

- `src/features/inventorySuggestions/types.ts`
- `src/features/inventorySuggestions/data/categories.ts`
- `src/features/inventorySuggestions/data/suggestions.ts`
- `src/features/inventorySuggestions/utils/getLocalizedInventorySuggestions.ts`
- `src/features/inventorySuggestions/utils/getSuggestionAvailability.ts`
- `src/features/inventorySuggestions/database/createInventoryItemsFromSuggestions.ts`
- `src/features/inventorySuggestions/__tests__/getLocalizedInventorySuggestions.test.ts`
- `src/features/inventorySuggestions/__tests__/getSuggestionAvailability.test.ts`
- `src/features/inventorySuggestions/database/createInventoryItemsFromSuggestions.test.ts`

**Modify:**

- `src/features/inventory/database/schema.ts`
- `src/features/inventory/database/types.ts`
- `src/features/categories/database/schema.ts`
- `src/features/categories/database/types.ts`
- `src/database/schema.ts`
- `src/translations/en.json`
- `src/translations/da.json`
- `src/database/seed.ts`
- `src/features/inventory/screens/InventoryScreen/InventoryScreen.tsx`
- Add a Drizzle migration in `src/database/migrations/`

---

## Data Model

### Static Types

Create stable, language-neutral catalog types:

```ts
export type PredefinedCategoryId =
  | 'essentials'
  | 'clothing'
  | 'footwear'
  | 'toiletries'
  | 'health'
  | 'electronics'
  | 'travel_gear'
  | 'weather_gear'
  | 'activities'
  | 'food_drink'
  | 'baby_kids'
  | 'pets'
  | 'work'
  | 'safety'
  | 'miscellaneous';

export type PredefinedCategory = {
  id: PredefinedCategoryId;
  defaultName: string;
  icon?: string;
};

export type InventorySuggestion = {
  id: string;
  categoryId: PredefinedCategoryId;
  defaultName: string;
  estimatedWeightGrams?: number;
  tags?: string[];
};
```

Use simple, stable suggestion IDs such as:

- `passport`
- `wallet`
- `phone_charger`
- `t_shirt`
- `packing_cubes`

The translation key format should be:

- `inventorySuggestions.categories.${categoryId}`
- `inventorySuggestions.items.${suggestionId}`

### Database Additions

Add provenance columns:

| Table | Column | Type | Notes |
|---|---|---|---|
| `inventory_items` | `source_suggestion_id` | text, nullable | Stable suggestion ID used for deduping and "already added" UI |
| `categories` | `source_category_id` | text, nullable | Stable predefined category ID used to find or create category rows |

Add indexes:

- `inventory_items_source_suggestion_id_idx`
- `categories_source_category_id_idx`

Do not require uniqueness at the database level initially. User data and sync conflict handling may need flexibility. Enforce duplicate prevention in the helper that adds suggestions.

---

## Task 1: Add Catalog Types and Category Data

**Files:**

- Create: `src/features/inventorySuggestions/types.ts`
- Create: `src/features/inventorySuggestions/data/categories.ts`

- [ ] **Step 1: Create catalog types**

Define `PredefinedCategoryId`, `PredefinedCategory`, `InventorySuggestion`, and localized view-model types.

- [ ] **Step 2: Create predefined categories**

Create a `predefinedCategories` array using the category IDs from this plan.

Suggested Lucide icon names:

```ts
export const predefinedCategories = [
  { id: 'essentials', defaultName: 'Essentials', icon: 'star' },
  { id: 'clothing', defaultName: 'Clothing', icon: 'shirt' },
  { id: 'footwear', defaultName: 'Footwear', icon: 'footprints' },
  { id: 'toiletries', defaultName: 'Toiletries', icon: 'droplets' },
  { id: 'health', defaultName: 'Health', icon: 'heart-pulse' },
  { id: 'electronics', defaultName: 'Electronics', icon: 'smartphone' },
  { id: 'travel_gear', defaultName: 'Travel Gear', icon: 'luggage' },
  { id: 'weather_gear', defaultName: 'Weather Gear', icon: 'cloud-sun' },
  { id: 'activities', defaultName: 'Activities', icon: 'waves' },
  { id: 'food_drink', defaultName: 'Food & Drink', icon: 'utensils' },
  { id: 'baby_kids', defaultName: 'Baby & Kids', icon: 'baby' },
  { id: 'pets', defaultName: 'Pets', icon: 'paw-print' },
  { id: 'work', defaultName: 'Work', icon: 'briefcase-business' },
  { id: 'safety', defaultName: 'Safety', icon: 'shield' },
  { id: 'miscellaneous', defaultName: 'Miscellaneous', icon: 'more-horizontal' },
] as const satisfies readonly PredefinedCategory[];
```

- [ ] **Step 3: Verify TypeScript**

```bash
pnpm tsc
```

Expected: no type errors.

---

## Task 2: Add Initial Suggestion Catalog

**Files:**

- Create: `src/features/inventorySuggestions/data/suggestions.ts`

- [ ] **Step 1: Create an initial catalog**

Start with a focused but useful base set. Prefer 8-15 suggestions in core categories and fewer in optional categories.

Suggested starter set:

```ts
export const inventorySuggestions = [
  { id: 'passport', categoryId: 'essentials', defaultName: 'Passport', estimatedWeightGrams: 45 },
  { id: 'wallet', categoryId: 'essentials', defaultName: 'Wallet', estimatedWeightGrams: 120 },
  { id: 'keys', categoryId: 'essentials', defaultName: 'Keys', estimatedWeightGrams: 70 },
  { id: 'phone', categoryId: 'essentials', defaultName: 'Phone', estimatedWeightGrams: 200 },
  { id: 'phone_charger', categoryId: 'essentials', defaultName: 'Phone Charger', estimatedWeightGrams: 85 },
  { id: 'travel_documents', categoryId: 'essentials', defaultName: 'Travel Documents', estimatedWeightGrams: 80 },
  { id: 't_shirt', categoryId: 'clothing', defaultName: 'T-Shirt', estimatedWeightGrams: 150 },
  { id: 'pants', categoryId: 'clothing', defaultName: 'Pants', estimatedWeightGrams: 450 },
  { id: 'underwear', categoryId: 'clothing', defaultName: 'Underwear', estimatedWeightGrams: 50 },
  { id: 'socks', categoryId: 'clothing', defaultName: 'Socks', estimatedWeightGrams: 40 },
  { id: 'sweater', categoryId: 'clothing', defaultName: 'Sweater', estimatedWeightGrams: 400 },
  { id: 'jacket', categoryId: 'clothing', defaultName: 'Jacket', estimatedWeightGrams: 650 },
  { id: 'sneakers', categoryId: 'footwear', defaultName: 'Sneakers', estimatedWeightGrams: 700 },
  { id: 'sandals', categoryId: 'footwear', defaultName: 'Sandals', estimatedWeightGrams: 350 },
  { id: 'toothbrush', categoryId: 'toiletries', defaultName: 'Toothbrush', estimatedWeightGrams: 20 },
  { id: 'toothpaste', categoryId: 'toiletries', defaultName: 'Toothpaste', estimatedWeightGrams: 100 },
  { id: 'deodorant', categoryId: 'toiletries', defaultName: 'Deodorant', estimatedWeightGrams: 75 },
  { id: 'shampoo', categoryId: 'toiletries', defaultName: 'Shampoo', estimatedWeightGrams: 150 },
  { id: 'medication', categoryId: 'health', defaultName: 'Medication', estimatedWeightGrams: 40 },
  { id: 'painkillers', categoryId: 'health', defaultName: 'Painkillers', estimatedWeightGrams: 30 },
  { id: 'first_aid_kit', categoryId: 'health', defaultName: 'First Aid Kit', estimatedWeightGrams: 250 },
  { id: 'glasses', categoryId: 'health', defaultName: 'Glasses', estimatedWeightGrams: 35 },
  { id: 'laptop', categoryId: 'electronics', defaultName: 'Laptop', estimatedWeightGrams: 1400 },
  { id: 'headphones', categoryId: 'electronics', defaultName: 'Headphones', estimatedWeightGrams: 250 },
  { id: 'power_bank', categoryId: 'electronics', defaultName: 'Power Bank', estimatedWeightGrams: 220 },
  { id: 'travel_adapter', categoryId: 'electronics', defaultName: 'Travel Adapter', estimatedWeightGrams: 95 },
  { id: 'backpack', categoryId: 'travel_gear', defaultName: 'Backpack', estimatedWeightGrams: 800 },
  { id: 'suitcase', categoryId: 'travel_gear', defaultName: 'Suitcase', estimatedWeightGrams: 3200 },
  { id: 'packing_cubes', categoryId: 'travel_gear', defaultName: 'Packing Cubes', estimatedWeightGrams: 200 },
  { id: 'umbrella', categoryId: 'weather_gear', defaultName: 'Umbrella', estimatedWeightGrams: 300 },
  { id: 'sunscreen', categoryId: 'weather_gear', defaultName: 'Sunscreen', estimatedWeightGrams: 90 },
  { id: 'sunglasses', categoryId: 'weather_gear', defaultName: 'Sunglasses', estimatedWeightGrams: 35 },
  { id: 'swimwear', categoryId: 'activities', defaultName: 'Swimwear', estimatedWeightGrams: 120 },
  { id: 'book', categoryId: 'activities', defaultName: 'Book', estimatedWeightGrams: 300 },
  { id: 'water_bottle', categoryId: 'food_drink', defaultName: 'Water Bottle', estimatedWeightGrams: 180 },
  { id: 'snacks', categoryId: 'food_drink', defaultName: 'Snacks', estimatedWeightGrams: 200 },
  { id: 'diapers', categoryId: 'baby_kids', defaultName: 'Diapers', estimatedWeightGrams: 300 },
  { id: 'stroller', categoryId: 'baby_kids', defaultName: 'Stroller', estimatedWeightGrams: 7000 },
  { id: 'leash', categoryId: 'pets', defaultName: 'Leash', estimatedWeightGrams: 150 },
  { id: 'pet_food', categoryId: 'pets', defaultName: 'Pet Food', estimatedWeightGrams: 1000 },
  { id: 'notebook', categoryId: 'work', defaultName: 'Notebook', estimatedWeightGrams: 250 },
  { id: 'mouse', categoryId: 'work', defaultName: 'Mouse', estimatedWeightGrams: 100 },
  { id: 'flashlight', categoryId: 'safety', defaultName: 'Flashlight', estimatedWeightGrams: 120 },
  { id: 'emergency_cash', categoryId: 'safety', defaultName: 'Emergency Cash', estimatedWeightGrams: 5 },
  { id: 'laundry_bag', categoryId: 'miscellaneous', defaultName: 'Laundry Bag', estimatedWeightGrams: 60 },
  { id: 'ziplock_bags', categoryId: 'miscellaneous', defaultName: 'Ziplock Bags', estimatedWeightGrams: 40 },
] as const satisfies readonly InventorySuggestion[];
```

- [ ] **Step 2: Add catalog validation tests**

Test that:

- every suggestion has a unique `id`
- every suggestion references an existing category
- every category ID is unique
- every weight is positive when present

---

## Task 3: Add i18n Keys

**Files:**

- Modify: `src/translations/en.json`
- Modify: `src/translations/da.json`

- [ ] **Step 1: Add English category translations**

Add:

```json
"inventorySuggestions": {
  "categories": {
    "essentials": "Essentials",
    "clothing": "Clothing",
    "footwear": "Footwear",
    "toiletries": "Toiletries",
    "health": "Health",
    "electronics": "Electronics",
    "travel_gear": "Travel Gear",
    "weather_gear": "Weather Gear",
    "activities": "Activities",
    "food_drink": "Food & Drink",
    "baby_kids": "Baby & Kids",
    "pets": "Pets",
    "work": "Work",
    "safety": "Safety",
    "miscellaneous": "Miscellaneous"
  },
  "items": {}
}
```

- [ ] **Step 2: Add English item translations**

Add one key under `inventorySuggestions.items` for every suggestion ID.

- [ ] **Step 3: Add Danish translations**

Translate categories and items in `src/translations/da.json`. If a translation is uncertain, use the English value temporarily and leave a short `TODO` in the implementation PR description rather than in JSON.

- [ ] **Step 4: Verify JSON validity**

```bash
pnpm tsc
```

Expected: no JSON import/type errors.

---

## Task 4: Localize Suggestions

**Files:**

- Create: `src/features/inventorySuggestions/utils/getLocalizedInventorySuggestions.ts`
- Create: `src/features/inventorySuggestions/__tests__/getLocalizedInventorySuggestions.test.ts`

- [ ] **Step 1: Implement localization utility**

The utility should accept an i18n `t` function or i18n instance and return localized category and item view models.

Expected behavior:

- translate category names from `inventorySuggestions.categories.${id}`
- translate item names from `inventorySuggestions.items.${id}`
- fall back to `defaultName` when the translation key is missing
- group suggestions by category for UI consumption
- preserve original `id`, `categoryId`, `estimatedWeightGrams`, and `tags`

- [ ] **Step 2: Add tests**

Test:

- item translation success
- category translation success
- item fallback to default name
- category fallback to default name
- grouping order follows `predefinedCategories`

---

## Task 5: Add Database Provenance Columns

**Files:**

- Modify: `src/features/inventory/database/schema.ts`
- Modify: `src/features/categories/database/schema.ts`
- Add migration in `src/database/migrations/`

- [ ] **Step 1: Update inventory schema**

Add:

```ts
sourceSuggestionId: text('source_suggestion_id'),
```

Add index:

```ts
index('inventory_items_source_suggestion_id_idx').on(t.sourceSuggestionId)
```

- [ ] **Step 2: Update categories schema**

Add:

```ts
sourceCategoryId: text('source_category_id'),
```

If the schema uses a callback for indexes, add:

```ts
index('categories_source_category_id_idx').on(t.sourceCategoryId)
```

- [ ] **Step 3: Generate migration**

```bash
pnpm db:generate
```

Expected migration operations:

```sql
ALTER TABLE `inventory_items` ADD `source_suggestion_id` text;
ALTER TABLE `categories` ADD `source_category_id` text;
CREATE INDEX `inventory_items_source_suggestion_id_idx` ON `inventory_items` (`source_suggestion_id`);
CREATE INDEX `categories_source_category_id_idx` ON `categories` (`source_category_id`);
```

- [ ] **Step 4: Update seed data**

In `src/database/seed.ts`, either omit the new nullable fields or set them to `NULL` in raw SQL insert statements. Ensure the app seed path still works.

- [ ] **Step 5: Verify migration and types**

```bash
pnpm tsc
pnpm test -- --runInBand src/features/inventory/database/queries.test.ts src/features/categories/database/queries.test.ts
```

Expected: all tests pass.

---

## Task 6: Add Suggestion Availability Utility

**Files:**

- Create: `src/features/inventorySuggestions/utils/getSuggestionAvailability.ts`
- Create: `src/features/inventorySuggestions/__tests__/getSuggestionAvailability.test.ts`

- [ ] **Step 1: Implement availability helper**

Given localized suggestions and existing inventory items, return suggestions with an `isAdded` flag.

Deduping rules:

- primary: match existing `inventoryItems.sourceSuggestionId` to `suggestion.id`
- fallback: optional normalized name match for older rows without source IDs
- name fallback should be conservative to avoid hiding unrelated custom items

- [ ] **Step 2: Add tests**

Test:

- source ID match marks suggestion as added
- non-matching source IDs remain available
- fallback name match works only when enabled
- missing source IDs do not crash

---

## Task 7: Add Bulk Creation Helper

**Files:**

- Create: `src/features/inventorySuggestions/database/createInventoryItemsFromSuggestions.ts`
- Create: `src/features/inventorySuggestions/database/createInventoryItemsFromSuggestions.test.ts`

- [ ] **Step 1: Implement category lookup/create**

For each selected suggestion category:

1. Try to find category by `sourceCategoryId`.
2. If missing, create a category row with:
   - `id`: client-generated UUID
   - `name`: localized category name
   - `icon`: predefined category icon
   - `sourceCategoryId`: predefined category ID
   - timestamps

Do not use deterministic category row IDs unless the app has a clear sync conflict strategy. Client-generated UUIDs are safer with PowerSync.

- [ ] **Step 2: Implement item creation**

For each selected suggestion:

1. Skip if an inventory item already exists with the same `sourceSuggestionId`.
2. Insert an inventory row with:
   - `id`: client-generated UUID
   - `categoryId`: created/found category row ID
   - `name`: localized suggestion name
   - `weightGrams`: `estimatedWeightGrams ?? null`
   - `quantity`: `1`
   - `tags`: JSON string from suggestion tags or `[]`
   - `sourceSuggestionId`: suggestion ID
   - timestamps

- [ ] **Step 3: Use a transaction**

Wrap category creation and item insertion in a single Drizzle transaction.

- [ ] **Step 4: Return result metadata**

Return:

```ts
type CreateInventoryItemsFromSuggestionsResult = {
  createdItemCount: number;
  skippedItemCount: number;
  createdCategoryCount: number;
};
```

- [ ] **Step 5: Add tests**

Test:

- creates missing categories
- reuses existing categories by `sourceCategoryId`
- creates inventory items with localized names
- skips already-added suggestions
- stores `sourceSuggestionId`
- stores `weightGrams`
- wraps operations in a transaction

---

## Task 8: Add Inventory UI Entry Point

**Files:**

- Modify: `src/features/inventory/screens/InventoryScreen/InventoryScreen.tsx`

- [ ] **Step 1: Add suggestion entry point**

Add a visible way to open suggestions from the inventory screen. The current screen is simple, so start with a button or list section rather than a full redesign.

- [ ] **Step 2: Show grouped suggestions**

Render localized suggestions grouped by category. For large lists, use `FlashList` or another virtualized list instead of `ScrollView`.

- [ ] **Step 3: Add selection controls**

Support:

- select individual suggestion
- select all in a category
- clear selected
- add selected

- [ ] **Step 4: Hide or disable already-added suggestions**

Use the availability helper. Prefer disabling with an "Added" state over hiding during the first iteration so users understand why an expected suggestion is not available.

- [ ] **Step 5: Verify layout**

Test on narrow and regular screen widths. Ensure item names, category labels, and buttons do not overlap or truncate awkwardly.

---

## Task 9: Add Onboarding Hookup

**Files:**

- Modify or create onboarding screens depending on the current onboarding implementation.
- Existing preference state: `src/stores/usePreferencesStore.ts`

- [ ] **Step 1: Find onboarding flow**

Inspect the current onboarding path. If no real onboarding screen exists yet, create the suggestion picker as a reusable component and defer route integration to the onboarding feature.

- [ ] **Step 2: Add suggested onboarding behavior**

Recommended first-run UX:

- Show core categories by default:
  - Essentials
  - Clothing
  - Footwear
  - Toiletries
  - Health
  - Electronics
  - Travel Gear
  - Weather Gear
  - Food & Drink
- Let users opt into optional sets:
  - Activities
  - Baby & Kids
  - Pets
  - Work
  - Safety

- [ ] **Step 3: Complete onboarding after add/skip**

Users should be able to:

- add selected suggestions and continue
- skip inventory setup
- return later from the inventory screen

---

## Task 10: Testing and Verification

- [ ] **Step 1: Run focused unit tests**

```bash
pnpm test -- --runInBand src/features/inventorySuggestions
```

- [ ] **Step 2: Run related database tests**

```bash
pnpm test -- --runInBand src/features/inventory/database src/features/categories/database
```

- [ ] **Step 3: Run TypeScript**

```bash
pnpm tsc
```

- [ ] **Step 4: Run lint/format if available**

```bash
pnpm lint
pnpm format
```

If the project does not have these scripts, use the configured formatter/checker from `package.json`.

- [ ] **Step 5: Manual app checks**

Verify:

- suggestions render in English
- suggestions render in Danish
- missing translation falls back to default English name
- adding one category creates the category and items
- adding the same suggestions twice skips duplicates
- added inventory rows remain unchanged after language change
- existing seed data and database initialization still work

---

## Future Enhancements

- Add trip-context filters, such as beach, business, camping, winter, city, family, and pet travel.
- Add suggestion popularity or priority fields to improve onboarding defaults.
- Add per-suggestion quantities for items like socks, underwear, diapers, and snacks.
- Add aliases/search keywords for better suggestion search across languages.
- Add "starter packs" that select groups of suggestions without creating another database concept.
- Add remote catalog updates later if static catalog growth becomes too large for app releases.
