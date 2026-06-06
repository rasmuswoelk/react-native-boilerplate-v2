---
name: create-screen
description: Rules for creating feature screen components and Expo Router route entry points in this React Native boilerplate. Use when asked to add, write, or create a screen.
---

# Creating Screens in This Project

Screens live inside their feature folder:

```
src/features/<feature>/screens/<ScreenName>/
  ScreenName.tsx
  index.ts
```

Route files in `app/` import screens through the folder index and stay thin:

```ts
import { TripListScreen } from '@/src/features/trips/screens/TripListScreen';

export default TripListScreen;
```

---

## Tests

Do **not** create screen tests by default.

Only add a screen test when the user explicitly asks for tests, or when they specifically ask to test the screen. If tests are requested, follow `docs/skills/create-test.md`.

Shared `lib/components/` still require tests. This exception only applies to screen components under `src/features/<feature>/screens/`.

---

## Styling

Use Unistyles for theming. Never import `StyleSheet` from `react-native` in a screen.

Preferred pattern:

```tsx
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Typography } from '@/lib/components/Typography';

export function ExampleScreen() {
  return (
    <View style={styles.container}>
      <Typography variant="body">Example</Typography>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
}));
```

Use theme tokens for colors, spacing, typography, border radius, and other values already present in `src/theme/theme.ts` and `lib/theme/variables/`.

---

## Text

Always use `Typography` from `@/lib/components/Typography` for user-visible text in screens.

Do not import or render `Text` from `react-native` in screen components.

---

## Checklist

- [ ] Screen folder created under `src/features/<feature>/screens/<ScreenName>/`
- [ ] `index.ts` exports from `./ScreenName`
- [ ] No screen test added unless explicitly requested
- [ ] Uses `StyleSheet` from `react-native-unistyles`, not `react-native`
- [ ] Uses `Typography` from `@/lib/components/Typography`, not React Native `Text`
- [ ] Route files are thin: one import and one default export
