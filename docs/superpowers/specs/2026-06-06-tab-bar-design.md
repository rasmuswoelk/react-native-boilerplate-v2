# Tab Bar Navigation Design

**Date:** 2026-06-06
**Branch:** app/mule-travel-packing-app

## Context

The Mule Travel Packing App needs a primary navigation structure. The current entry point is a WelcomeScreen placeholder. This spec replaces it with a four-tab bar that matches the app's core feature areas: Trips, Lists, Inventory, and Settings.

## Navigation Architecture

The tab bar becomes the app's primary navigation using Expo Router's `(tabs)` group.

```
app/
  _layout.tsx          — Root Stack (storybook screen remains; index removed)
  index.tsx            — Redirect to /(tabs)/trips
  (tabs)/
    _layout.tsx        — Tabs navigator with 4 tabs
    trips.tsx          — thin route (one import, one default export)
    lists.tsx          — thin route
    inventory.tsx      — thin route
    settings.tsx       — thin route
```

The root Stack keeps the `storybook` screen and adds the `(tabs)` group. The `index` route redirects immediately to `/(tabs)/trips`.

## Screens

Each screen is a boilerplate placeholder that renders only its name. All follow the component-folder convention from CLAUDE.md.

| Screen | Path |
|--------|------|
| TripListScreen | `src/features/trips/screens/TripListScreen/` |
| ListsScreen | `src/features/lists/screens/ListsScreen/` |
| InventoryScreen | `src/features/inventory/screens/InventoryScreen/` |
| SettingsScreen | `src/features/settings/screens/SettingsScreen/` |

`settings` is a new feature folder created alongside the existing `trips`, `lists`, and `inventory` features.

## Tab Icons

Uses `@expo/vector-icons` Ionicons (already in dependencies). Active state uses filled variant, inactive uses outline variant.

| Tab | Active icon | Inactive icon |
|-----|-------------|---------------|
| Trips | `airplane` | `airplane-outline` |
| Lists | `list` | `list-outline` |
| Inventory | `cube` | `cube-outline` |
| Settings | `settings` | `settings-outline` |

## Route Files

Route files are thin entry points — one import and one default export, no logic:

```ts
// app/(tabs)/trips.tsx
import { TripListScreen } from '@/src/features/trips/screens/TripListScreen';
export default TripListScreen;
```

## Out of Scope

- Tab bar custom styling (colors, height) — follows default Expo Router Tabs styling for now
- Screen content beyond the screen name label
- Navigation between tabs programmatically
