# Mule Project Description

## Overview

**Mule** is a mobile-first travel packing app that helps users pack smarter over time.

The app lets users build a reusable inventory of items they may pack for trips, create trip-specific packing lists, save reusable packing lists, and review what they actually used after each trip. Over time, Mule learns from the user’s packing behavior and helps them make better packing decisions.

The product loop:

**Inventory -> Trip Packing List -> Post-Trip Usage Review -> Smarter Future Suggestions**

Mule should feel calm, practical, and trustworthy. The app should help users reduce overpacking without making packing feel rigid or stressful.

---

## Core Product Idea

Most packing apps help users create checklists. Mule goes further by tracking what the user actually used after a trip.

Example flow:

1. The user creates a trip.
2. Mule suggests items from their inventory and saved lists.
3. The user marks items as packed.
4. After the trip, Mule asks which items were used, unused, or unanswered.
5. Mule uses that history to improve future packing suggestions.

The long-term goal is to help the user understand:

- which items they almost always use
- which items they often pack but rarely use
- which items are trip-type dependent
- which saved lists work best for specific kinds of travel
- how much they tend to overpack

---

## App Name

**Mule**

The name references a packing mule: practical, reliable, and made for carrying things. The tone should be useful rather than gimmicky. The brand can include subtle mule, backpack, trail, and travel motifs.

---

## Target User

Mule is for people who travel often enough to benefit from better packing habits, including:

- weekend travelers
- business travelers
- backpackers
- hikers and outdoor travelers
- digital nomads
- families or couples who reuse packing lists
- people who often forget things or overpack

The first version should work well for a single user without requiring an account.

---

## No-Login Philosophy

Mule should not require login during onboarding or first use.

The initial experience should be local-first and low-friction:

- no signup wall
- no email required
- no social login
- no account setup before value is shown

Users should be able to start building their inventory immediately.

Optional sync/account functionality can be added later, but it should not block the core packing workflow.

---

## Main Sections

### Trips

The **Trips** section contains specific trips the user is planning, currently packing for, or has completed.

A trip may include:

- destination
- start and end dates
- trip type
- weather or climate notes
- packing list
- packed status
- post-trip usage review
- notes

Trip states:

- upcoming
- active
- completed
- reviewed

---

### Lists

The **Lists** section contains reusable saved packing lists.

Examples:

- Weekend trip
- Work trip
- Beach vacation
- Hiking trip
- Festival
- Cold weather
- Carry-on only
- International travel

Saved lists should be usable as templates when creating a new trip.

A list can contain:

- default items
- optional items
- categories
- notes
- quantities
- trip type tags

---

### Inventory

The **Inventory** section is the user’s master collection of packable items.

Inventory items may include:

- name
- category
- image or icon
- description
- weight
- quantity
- notes
- tags
- usage history
- last packed date
- usage rate
- recommendation status

Example items:

- Passport
- Phone charger
- Merino wool T-shirt
- Hiking pants
- Rain jacket
- Hydro Flask 24oz
- Osprey Daylite Pack
- Anker Power Bank
- Toothbrush
- Sunscreen

Inventory items should be easy to add quickly.

---

### Insights

The **Insights** section helps the user understand packing behavior.

Possible insights:

- “You tend to overpack”
- “You did not use 28% of items on your last 5 trips”
- “Your most-used items”
- “Consider leaving behind”
- “Items always used on hiking trips”
- “Items often packed but rarely used”
- “Items forgotten on similar trips”
- “Average packed item count by trip type”

Insights should be actionable, not judgmental.

---

### Profile

The **Profile** section can contain local preferences and app settings.

Since the app should not require login, the profile should initially focus on preferences:

- nickname
- home region
- preferred units
- packing style
- default trip types
- privacy/local storage settings
- export/import data
- optional sync later

---

## Primary User Flow

### 1. First Launch

The user opens Mule for the first time.

Mule explains:

- no login is required
- the user can start by building an inventory
- Mule improves recommendations after each trip

Suggested onboarding steps:

1. Welcome
2. Basic profile
3. Travel style
4. Starter inventory
5. Create first trip

---

### 2. Build Starter Inventory

The user selects common categories and quick-add items.

Categories:

- Clothing
- Toiletries
- Electronics
- Documents
- Accessories
- Medicine
- Outdoor gear
- Bags

Quick-add examples:

- T-shirt
- Toothbrush
- Phone charger
- Water bottle
- Passport
- Sunglasses
- Sunscreen
- Power bank

The goal is to seed enough inventory data to make the first trip useful.

---

### 3. Create a Trip

The user creates a trip by entering:

- destination
- dates
- trip type
- optional notes
- optional saved list template

Mule creates a suggested packing list from:

- inventory
- saved lists
- trip type
- past behavior
- default essentials

---

### 4. Pack for Trip

The user checks off items as packed.

During the packing phase, the most important states are:

- To Pack
- Packed

---

### 5. Review After Trip

After the trip, Mule asks:

**“What did you use?”**

The user marks each item as:

- Used
- Did not use
- No response

This is the key learning moment in the app.

---

### 6. Improve Future Suggestions

Mule uses trip history to suggest better packing lists.

Examples:

- If the user never uses dress shoes on weekend trips, Mule can suggest leaving them behind.
- If the user always uses a power bank on international trips, Mule should recommend it.
- If the user packs a rain jacket often but only uses it for outdoor trips, Mule should make it context-dependent.

---

## Key Screens

### Onboarding

Purpose:

- explain the value proposition
- establish that login is not required
- gather basic preferences
- help the user start inventory setup

Screens:

1. Welcome
2. Basic setup
3. Travel profile
4. Starter inventory
5. Create first trip

---

### Trips Overview

Purpose:

- show upcoming and past trips
- highlight current or next trip
- show packing progress
- provide entry point to create a new trip

Important UI elements:

- title: Trips
- add trip button
- Upcoming / Past segmented control
- featured trip card
- progress bar
- trip list rows
- bottom navigation

---

### Trip Detail

Purpose:

- manage a specific trip packing list

Important UI elements:

- destination hero image or header
- date range
- tabs: Packing List, Details, Notes
- packing progress
- filter chips: All, To Pack, Packed, Used
- categorized item list
- review CTA after trip

---

### Add Item

Purpose:

- quickly add items to a trip or inventory

Important UI elements:

- search field
- tabs: Quick Add, My Inventory, Templates
- quick item chips
- category list
- custom item button

---

### Inventory

Purpose:

- manage reusable item database

Important UI elements:

- item list
- category filters
- item cards
- “View all”
- reminder to keep inventory up to date

---

### Review Trip

Purpose:

- capture used/unused information after the trip

Important UI elements:

- Used / Did not use / No response summary
- item list with status toggles
- note field
- done action

---

### Insights

Purpose:

- show learning and behavior over time

Important UI elements:

- overpacking percentage
- most-used items
- items to consider leaving behind
- usage by trip type
- item-specific recommendation signals

---

## Data Model Draft

### User Profile

```ts
type UserProfile = {
  id: string;
  nickname?: string;
  homeRegion?: string;
  preferredUnits: "metric" | "imperial";
  packingStyle?: "minimal" | "balanced" | "prepared";
  defaultTripTypes: TripType[];
  createdAt: string;
  updatedAt: string;
};
```

### Trip

```ts
type Trip = {
  id: string;
  title: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  type?: TripType;
  status: "upcoming" | "active" | "completed" | "reviewed";
  notes?: string;
  packingItems: TripPackingItem[];
  createdAt: string;
  updatedAt: string;
};
```

### Trip Type

```ts
type TripType =
  | "weekend"
  | "work"
  | "warm_weather"
  | "cold_weather"
  | "outdoor"
  | "international"
  | "festival"
  | "custom";
```

### Inventory Item

```ts
type InventoryItem = {
  id: string;
  name: string;
  category: ItemCategory;
  description?: string;
  quantity?: number;
  weightGrams?: number;
  tags: string[];
  imageUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
```

### Item Category

```ts
type ItemCategory =
  | "clothing"
  | "toiletries"
  | "electronics"
  | "documents"
  | "accessories"
  | "medicine"
  | "bags"
  | "outdoor"
  | "other";
```

### Trip Packing Item

```ts
type TripPackingItem = {
  id: string;
  tripId: string;
  inventoryItemId: string;
  nameSnapshot: string;
  categorySnapshot: ItemCategory;
  packedStatus: "to_pack" | "packed";
  usageStatus?: "used" | "unused" | "no_response";
  quantity?: number;
  notes?: string;
};
```

### Saved List

```ts
type SavedList = {
  id: string;
  name: string;
  description?: string;
  tripTypes: TripType[];
  items: SavedListItem[];
  createdAt: string;
  updatedAt: string;
};
```

### Saved List Item

```ts
type SavedListItem = {
  id: string;
  inventoryItemId?: string;
  name: string;
  category: ItemCategory;
  quantity?: number;
  optional?: boolean;
  notes?: string;
};
```

---

## Visual Direction

The app should feel:

- calm
- practical
- editorial
- outdoors-inspired
- trustworthy
- soft but not childish

Suggested visual language:

- warm cream backgrounds
- deep forest green primary color
- soft sage and sand accents
- rounded cards
- subtle shadows
- realistic or muted travel imagery
- simple line icons
- serif-style headings paired with clean sans-serif UI text

---

## Suggested Colors

```css
--color-background: #F7F1E4;
--color-surface: #FFF9ED;
--color-paper: #FFFCF4;
--color-ink: #17352C;
--color-muted: #6E7B70;
--color-brand: #1F4B3F;
--color-brand-soft: #DDEDE1;
--color-sage: #A9C9B4;
--color-sand: #E8D8B8;
--color-clay: #C9875F;
--color-amber: #E3B15F;
--color-line: #E6DDCC;
--color-danger: #A9493D;
```

---

## Typography Direction

Suggested type pairing:

- Headings: serif or editorial serif style
- UI text: clean sans-serif
- Labels: small sans-serif medium/semi-bold

Potential choices:

- Heading: Fraunces, Cormorant Garamond, Newsreader, or Playfair Display
- UI: Inter, SF Pro, or Geist

Typography should be legible on mobile and not overly decorative.

---

## Component Guidelines

### Cards

Cards should use:

- soft white or cream surface
- subtle border
- small shadow or depth
- rounded corners
- clear internal spacing

### Buttons

Primary button:

- deep green background
- white text
- rounded corners
- strong enough contrast

Secondary button:

- light surface
- green or dark text
- subtle border

### Chips

Chips are useful for:

- trip type filters
- packing states
- quick-add items
- categories

States:

- default
- selected
- disabled

### Item Rows

Item rows should include:

- icon or thumbnail
- item name
- category or metadata
- status indicator
- optional action

### Progress Bars

Progress bars should be used for:

- packing completion
- usage review
- insight comparisons

They should be subtle but clear.

---

## Recommendation Logic Draft

Mule should eventually score whether to suggest an item for a trip.

Possible factors:

- usage rate across all trips
- usage rate for this trip type
- recent usage
- seasonal relevance
- destination climate
- trip duration
- saved list inclusion
- whether user often packs but does not use it

Example scoring idea:

```ts
type ItemRecommendationSignal = {
  inventoryItemId: string;
  tripTypeMatchScore: number;
  usageRateScore: number;
  recencyScore: number;
  savedListScore: number;
  seasonalScore?: number;
  finalScore: number;
  reason: string;
};
```

Example recommendation reasons:

- “Used on 8 of your last 10 trips”
- “Always used on hiking trips”
- “Often packed but rarely used”
- “Recommended for international travel”
- “Usually skipped on weekend trips”

---

## MVP Scope

The MVP should focus on:

1. Local-first onboarding
2. Inventory creation
3. Trip creation
4. Packing list management
5. Post-trip usage review
6. Basic insights

Avoid in MVP:

- required login
- complex collaboration
- advanced AI recommendations
- social sharing
- marketplace functionality
- overly complex weather integrations

---

## Future Features

Potential later features:

- optional account and sync
- iCloud or Google Drive backup
- shared trips
- family/group packing
- receipt and expense tracking
- weather-based packing suggestions
- airline baggage rules
- weight tracking
- packing reminders
- calendar integration
- location-aware suggestions
- export/import inventory
- AI-generated packing list drafts

---

## Success Criteria

Mule is successful if users can:

- create a useful starter inventory quickly
- create a trip without friction
- pack from a clear checklist
- review used/unused items after a trip
- see useful insights over time
- trust Mule’s future packing suggestions

The product should reduce decision fatigue and help the user pack with more confidence.

---

## Product Principle

Mule should not make packing feel like data entry.

It should make packing feel easier, smarter, and calmer.
