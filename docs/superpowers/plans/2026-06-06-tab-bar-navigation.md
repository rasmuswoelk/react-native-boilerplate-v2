# Tab Bar Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the WelcomeScreen entry point with a four-tab navigator (Trips, Lists, Inventory, Settings) using Expo Router's `(tabs)` group.

**Architecture:** The root Stack in `app/_layout.tsx` gains a `(tabs)` screen entry. `app/index.tsx` becomes a redirect to `/(tabs)/trips`. Each tab has a thin route file in `app/(tabs)/` that imports a boilerplate screen from the matching feature folder in `src/features/`.

**Tech Stack:** Expo Router v4 (`Tabs`), `@expo/vector-icons` (Ionicons), React Testing Library (`@testing-library/react-native`), Jest (jest-expo preset).

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `app/_layout.tsx` | Add `(tabs)` screen entry, remove `index` entry |
| Modify | `app/index.tsx` | Redirect to `/(tabs)/trips` |
| Create | `app/(tabs)/_layout.tsx` | Tabs navigator with icons |
| Create | `app/(tabs)/trips.tsx` | Thin route → TripListScreen |
| Create | `app/(tabs)/lists.tsx` | Thin route → ListsScreen |
| Create | `app/(tabs)/inventory.tsx` | Thin route → InventoryScreen |
| Create | `app/(tabs)/settings.tsx` | Thin route → SettingsScreen |
| Create | `src/features/trips/screens/TripListScreen/TripListScreen.tsx` | Boilerplate placeholder |
| Create | `src/features/trips/screens/TripListScreen/index.ts` | Barrel export |
| Create | `src/features/trips/screens/TripListScreen/TripListScreen.test.tsx` | Render test |
| Create | `src/features/lists/screens/ListsScreen/ListsScreen.tsx` | Boilerplate placeholder |
| Create | `src/features/lists/screens/ListsScreen/index.ts` | Barrel export |
| Create | `src/features/lists/screens/ListsScreen/ListsScreen.test.tsx` | Render test |
| Create | `src/features/inventory/screens/InventoryScreen/InventoryScreen.tsx` | Boilerplate placeholder |
| Create | `src/features/inventory/screens/InventoryScreen/index.ts` | Barrel export |
| Create | `src/features/inventory/screens/InventoryScreen/InventoryScreen.test.tsx` | Render test |
| Create | `src/features/settings/screens/SettingsScreen/SettingsScreen.tsx` | Boilerplate placeholder |
| Create | `src/features/settings/screens/SettingsScreen/index.ts` | Barrel export |
| Create | `src/features/settings/screens/SettingsScreen/SettingsScreen.test.tsx` | Render test |

---

### Task 1: TripListScreen boilerplate

**Files:**
- Create: `src/features/trips/screens/TripListScreen/TripListScreen.tsx`
- Create: `src/features/trips/screens/TripListScreen/index.ts`
- Create: `src/features/trips/screens/TripListScreen/TripListScreen.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/trips/screens/TripListScreen/TripListScreen.test.tsx
import { render } from '@testing-library/react-native';
import { TripListScreen } from './TripListScreen';

describe('TripListScreen', () => {
  it('renders the screen name', () => {
    const { getByText } = render(<TripListScreen />);
    expect(getByText('Trips')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test src/features/trips/screens/TripListScreen/TripListScreen.test.tsx
```

Expected: FAIL — "Cannot find module './TripListScreen'"

- [ ] **Step 3: Create the screen component**

```tsx
// src/features/trips/screens/TripListScreen/TripListScreen.tsx
import { StyleSheet, Text, View } from 'react-native';

export function TripListScreen() {
  return (
    <View style={styles.container}>
      <Text>Trips</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
```

- [ ] **Step 4: Create the barrel export**

```ts
// src/features/trips/screens/TripListScreen/index.ts
export * from './TripListScreen';
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm test src/features/trips/screens/TripListScreen/TripListScreen.test.tsx
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/trips/screens/TripListScreen/
git commit -m "feat: add TripListScreen boilerplate"
```

---

### Task 2: ListsScreen boilerplate

**Files:**
- Create: `src/features/lists/screens/ListsScreen/ListsScreen.tsx`
- Create: `src/features/lists/screens/ListsScreen/index.ts`
- Create: `src/features/lists/screens/ListsScreen/ListsScreen.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/lists/screens/ListsScreen/ListsScreen.test.tsx
import { render } from '@testing-library/react-native';
import { ListsScreen } from './ListsScreen';

describe('ListsScreen', () => {
  it('renders the screen name', () => {
    const { getByText } = render(<ListsScreen />);
    expect(getByText('Lists')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test src/features/lists/screens/ListsScreen/ListsScreen.test.tsx
```

Expected: FAIL — "Cannot find module './ListsScreen'"

- [ ] **Step 3: Create the screen component**

```tsx
// src/features/lists/screens/ListsScreen/ListsScreen.tsx
import { StyleSheet, Text, View } from 'react-native';

export function ListsScreen() {
  return (
    <View style={styles.container}>
      <Text>Lists</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
```

- [ ] **Step 4: Create the barrel export**

```ts
// src/features/lists/screens/ListsScreen/index.ts
export * from './ListsScreen';
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm test src/features/lists/screens/ListsScreen/ListsScreen.test.tsx
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/lists/screens/ListsScreen/
git commit -m "feat: add ListsScreen boilerplate"
```

---

### Task 3: InventoryScreen boilerplate

**Files:**
- Create: `src/features/inventory/screens/InventoryScreen/InventoryScreen.tsx`
- Create: `src/features/inventory/screens/InventoryScreen/index.ts`
- Create: `src/features/inventory/screens/InventoryScreen/InventoryScreen.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/inventory/screens/InventoryScreen/InventoryScreen.test.tsx
import { render } from '@testing-library/react-native';
import { InventoryScreen } from './InventoryScreen';

describe('InventoryScreen', () => {
  it('renders the screen name', () => {
    const { getByText } = render(<InventoryScreen />);
    expect(getByText('Inventory')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test src/features/inventory/screens/InventoryScreen/InventoryScreen.test.tsx
```

Expected: FAIL — "Cannot find module './InventoryScreen'"

- [ ] **Step 3: Create the screen component**

```tsx
// src/features/inventory/screens/InventoryScreen/InventoryScreen.tsx
import { StyleSheet, Text, View } from 'react-native';

export function InventoryScreen() {
  return (
    <View style={styles.container}>
      <Text>Inventory</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
```

- [ ] **Step 4: Create the barrel export**

```ts
// src/features/inventory/screens/InventoryScreen/index.ts
export * from './InventoryScreen';
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm test src/features/inventory/screens/InventoryScreen/InventoryScreen.test.tsx
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/inventory/screens/InventoryScreen/
git commit -m "feat: add InventoryScreen boilerplate"
```

---

### Task 4: SettingsScreen boilerplate

**Files:**
- Create: `src/features/settings/screens/SettingsScreen/SettingsScreen.tsx`
- Create: `src/features/settings/screens/SettingsScreen/index.ts`
- Create: `src/features/settings/screens/SettingsScreen/SettingsScreen.test.tsx`

Note: This creates the `src/features/settings/` folder for the first time.

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/settings/screens/SettingsScreen/SettingsScreen.test.tsx
import { render } from '@testing-library/react-native';
import { SettingsScreen } from './SettingsScreen';

describe('SettingsScreen', () => {
  it('renders the screen name', () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText('Settings')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test src/features/settings/screens/SettingsScreen/SettingsScreen.test.tsx
```

Expected: FAIL — "Cannot find module './SettingsScreen'"

- [ ] **Step 3: Create the screen component**

```tsx
// src/features/settings/screens/SettingsScreen/SettingsScreen.tsx
import { StyleSheet, Text, View } from 'react-native';

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
```

- [ ] **Step 4: Create the barrel export**

```ts
// src/features/settings/screens/SettingsScreen/index.ts
export * from './SettingsScreen';
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm test src/features/settings/screens/SettingsScreen/SettingsScreen.test.tsx
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/settings/screens/SettingsScreen/
git commit -m "feat: add SettingsScreen boilerplate"
```

---

### Task 5: Tab navigator layout

**Files:**
- Create: `app/(tabs)/_layout.tsx`

No tests needed — this is an Expo Router layout file (framework-level wiring).

- [ ] **Step 1: Create `app/(tabs)/` directory and the layout file**

```tsx
// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function tabIcon(active: IoniconName, inactive: IoniconName) {
  return ({ color, focused }: { color: string; focused: boolean }) => (
    <Ionicons name={focused ? active : inactive} size={24} color={color} />
  );
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: tabIcon('airplane', 'airplane-outline'),
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Lists',
          tabBarIcon: tabIcon('list', 'list-outline'),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: tabIcon('cube', 'cube-outline'),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: tabIcon('settings', 'settings-outline'),
        }}
      />
    </Tabs>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(tabs\)/
git commit -m "feat: add tab bar layout with Trips/Lists/Inventory/Settings"
```

---

### Task 6: Route files, root layout, and index redirect

**Files:**
- Create: `app/(tabs)/trips.tsx`
- Create: `app/(tabs)/lists.tsx`
- Create: `app/(tabs)/inventory.tsx`
- Create: `app/(tabs)/settings.tsx`
- Modify: `app/_layout.tsx`
- Modify: `app/index.tsx`

- [ ] **Step 1: Create the four thin route files**

```ts
// app/(tabs)/trips.tsx
import { TripListScreen } from '@/src/features/trips/screens/TripListScreen';
export default TripListScreen;
```

```ts
// app/(tabs)/lists.tsx
import { ListsScreen } from '@/src/features/lists/screens/ListsScreen';
export default ListsScreen;
```

```ts
// app/(tabs)/inventory.tsx
import { InventoryScreen } from '@/src/features/inventory/screens/InventoryScreen';
export default InventoryScreen;
```

```ts
// app/(tabs)/settings.tsx
import { SettingsScreen } from '@/src/features/settings/screens/SettingsScreen';
export default SettingsScreen;
```

- [ ] **Step 2: Update the root layout to register the `(tabs)` group**

Replace the full contents of `app/_layout.tsx`:

```tsx
// app/_layout.tsx
import '@/src/theme/theme';
import '@/src/i18n';
import { Redirect, Stack } from 'expo-router';
import { AppLayout } from '@/src/layouts/AppLayout';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <AppLayout>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="storybook" options={{ headerShown: false }} />
      </Stack>
      {process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true' && <Redirect href="/storybook" />}
    </AppLayout>
  );
}
```

- [ ] **Step 3: Replace `app/index.tsx` with a redirect**

```tsx
// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(tabs)/trips" />;
}
```

- [ ] **Step 4: Run the full test suite**

```bash
pnpm test
```

Expected: all tests pass (the 4 new screen tests + all existing tests).

- [ ] **Step 5: Commit**

```bash
git add app/
git commit -m "feat: wire tab bar routes and update root navigation"
```

---

## Verification

1. Run `pnpm ios` (or `pnpm android`) and confirm:
   - App opens on the Trips tab showing "Trips"
   - Tapping Lists/Inventory/Settings shows those screen names
   - Each tab shows its icon (filled when active, outline when inactive)
   - Storybook still works when `EXPO_PUBLIC_STORYBOOK_ENABLED=true`
2. Run `pnpm test` — all tests pass
