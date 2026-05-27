# Unistyles 3.0 Migration Design

**Date:** 2026-05-27
**Status:** Approved

## Overview

Migrate the project's styling infrastructure from the custom `ThemeProvider` / `useTheme` / `useStyles` system to [Unistyles 3.0](https://www.unistyl.es/). All component external APIs (`<Box padding="md">`, `<Typography variant="h1">` etc.) remain unchanged. Dark mode with adaptive theme switching is added as part of the migration.

## Goals

- Replace custom theme infrastructure with idiomatic Unistyles 3.0
- Preserve all component prop APIs (Box, Stack, Typography, Container, Card)
- Add light/dark adaptive theming backed by the device colour scheme
- No custom wrapper hooks over Unistyles — consumers use Unistyles APIs directly

## Architecture

### Deleted

| File | Reason |
|---|---|
| `lib/theme/providers/ThemeProvider/ThemeProvider.tsx` | Replaced by `StyleSheet.configure()` |
| `lib/theme/providers/ThemeProvider/index.ts` | Same |
| `lib/theme/hooks/useTheme.ts` | Replaced by `useUnistyles()` |
| `lib/theme/hooks/useStyles.ts` | Replaced by `StyleSheet.create()` |
| `src/theme/index.ts` | Theme values move into `src/unistyles.ts` |

### New

| File | Purpose |
|---|---|
| `src/unistyles.ts` | Defines light/dark themes, breakpoints, calls `StyleSheet.configure()`, augments Unistyles module types |

### Modified (internals only, external API unchanged)

- `app.json` — add `"react-native-unistyles"` to `plugins`
- `app/_layout.tsx` — import `src/unistyles.ts` as side-effect, remove ThemeProvider
- `src/layouts/AppLayout/AppLayout.tsx` — remove ThemeProvider wrapper; font loading (`useFonts`) stays unchanged; remove `theme` import from `src/theme/index.ts`
- All components using `useTheme()` → `useUnistyles()`
- All components using `useStyles(createStyles(...))` → module-level `StyleSheet.create(theme => ({...}))`

### Unchanged

- `lib/theme/variables/` — spacing, typography, borderRadius, primitive colors (imported into `src/unistyles.ts`)
- `lib/theme/utils/colorTypes.ts` — colour path resolution logic
- `lib/theme/utils/createSpacingProps.ts` — spacing prop resolution logic
- `src/theme/fonts.ts` — font definitions and mapper
- All component prop interfaces

## Theme Structure

### Shared values (identical in both themes)

Primitive colour palettes (gray, red, green, orange, blue scales), brand palette, spacing, typography, and borderRadius are defined once in a `sharedTheme` object and spread into both themes.

### Semantic colours — light

```
background:  #ffffff
text:        #000000
primary:     #000000
secondary:   #666666
border:      #e0e0e0
ground:      #ffffff
figure:      #000000
```

### Semantic colours — dark

```
background:  #0d0d0d
text:        #f0f0f0
primary:     #ffffff
secondary:   #999999
border:      #2a2a2a
ground:      #000000
figure:      #ffffff
```

### Configuration

```ts
// src/unistyles.ts
import { StyleSheet } from 'react-native-unistyles'

const sharedTheme = {
  spacing,
  typography,
  borderRadius,
  colors: {
    white: '#fff',
    black: '#000',
    red: { ... },
    green: { ... },
    orange: { ... },
    blue: { ... },
    gray: { ... },
    brand: { ... },
  },
}

const lightTheme = {
  ...sharedTheme,
  colors: {
    ...sharedTheme.colors,
    ground: '#ffffff',
    figure: '#000000',
    background: '#ffffff',
    text: '#000000',
    primary: '#000000',
    secondary: '#666666',
    border: '#e0e0e0',
  },
} as const

const darkTheme = {
  ...sharedTheme,
  colors: {
    ...sharedTheme.colors,
    ground: '#000000',
    figure: '#ffffff',
    background: '#0d0d0d',
    text: '#f0f0f0',
    primary: '#ffffff',
    secondary: '#999999',
    border: '#2a2a2a',
  },
} as const

type AppThemes = { light: typeof lightTheme; dark: typeof darkTheme }

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: { light: lightTheme, dark: darkTheme },
  settings: { adaptiveThemes: true },
})
```

### Type augmentation

The current `declare global { namespace Theme { interface AppTheme } }` pattern in `src/theme/index.ts` is replaced by the Unistyles module augmentation above. The `Theme.AppTheme` global type is no longer needed — components use the inferred type from `useUnistyles()`.

## Component Pattern Changes

### Theme access

```ts
// Before
import { useTheme } from '@/lib/theme/hooks/useTheme'
const { theme } = useTheme()

// After
import { useUnistyles } from 'react-native-unistyles'
const { theme } = useUnistyles()
```

### Stylesheets

```ts
// Before — called inside component
const styles = useStyles(stylesDefinition)
const stylesDefinition = createStyles(({ theme }) => ({
  container: { padding: theme.spacing.md },
}))

// After — defined at module level, used directly in JSX (no hook)
import { StyleSheet } from 'react-native-unistyles'

const stylesheet = StyleSheet.create(theme => ({
  container: { padding: theme.spacing.md },
}))

// In JSX: <View style={stylesheet.container} />
```

Unistyles' JSI bindings make `stylesheet` reactive — it updates automatically when the theme changes without needing a hook call.

### No changes needed

`colorTypes.ts` utilities (`getColorFromPath`, `getBorderRadiusFromPath`) and `createSpacingProps.ts` do not reference StyleSheet and require no changes. The `Box` component's colour/borderRadius prop resolution is unaffected.

## Files Requiring Internal Updates

| File | Change |
|---|---|
| `app/_layout.tsx` | Add `import '@/src/unistyles'`; remove ThemeProvider |
| `src/layouts/AppLayout/AppLayout.tsx` | Remove ThemeProvider import and wrapper |
| `lib/components/Box/Box.tsx` | `useTheme` → `useUnistyles` |
| `lib/components/Card/Card.tsx` | `useTheme`/`useStyles` → `useUnistyles`/`StyleSheet.create` |
| `lib/components/Container/Container.tsx` | Same |
| `lib/components/Stack/Stack.tsx` | Same |
| `lib/components/Typography/Typography.tsx` | Same |
| `lib/components/AnimatedWidthBar/AnimatedWidthBar.tsx` | Same |
| `lib/components/FadeIn/FadeIn.tsx` | Same |
| `lib/components/Gradient/Gradient.tsx` | Same |
| `lib/layouts/BaseLayout/BaseLayout.tsx` | Same |
| `lib/layouts/PlaygroundLayout/PlaygroundLayout.tsx` | Same |
| `lib/screens/playground/screens/ColorsScreen/ColorsScreen.tsx` | Same |
| `lib/screens/playground/screens/SpacingScreen/SpacingScreen.tsx` | Same |
| `lib/screens/playground/screens/TypographyScreen/TypographyScreen.tsx` | Same |
| `lib/screens/playground/screens/IndexScreen/IndexScreen.tsx` | Same |
| `app.json` | Add Unistyles to plugins array |

## Installation Steps

1. `npx expo install react-native-unistyles`
2. Add `"react-native-unistyles"` to `plugins` in `app.json`
3. `npx expo prebuild` — regenerates native iOS/Android projects
4. `cd ios && pod install` — installs iOS native module
5. Rebuild with `expo run:ios` / `expo run:android`

The project already uses `expo run:ios` / `expo run:android` (not Expo Go), so no workflow change is required.

## Out of Scope

- Breakpoints / responsive styles (can be added later via `UnistylesBreakpoints` augmentation)
- Manual theme switching UI (adaptive themes handle this automatically via device setting)
- Changes to component prop APIs
