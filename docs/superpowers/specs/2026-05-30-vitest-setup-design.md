# Vitest Unit Test Setup Design

## Context

The project has no test infrastructure. This adds vitest as the unit test runner targeting two layers: pure utility functions (`lib/theme/utils/`, `lib/i18n/`) and `lib/` design system components (`Box`, `Typography`). Component tests use `react-test-renderer` (React 19 compatible) with manual mocks for native packages. The result is a working, runnable test suite that serves as a pattern foundation for future tests.

---

## Architecture

### Why `react-test-renderer` over `@testing-library/react-native`

`@testing-library/react-native` internally relies on React Native's native rendering host config, which conflicts with our mocked react-native approach. `react-test-renderer` is a pure-JS renderer — it renders any React tree into a JS object, independent of the host platform. It works cleanly with our mocked native components. The deprecation notice in React 19 means it will eventually be replaced; for a boilerplate foundation it is the pragmatic choice.

### Environment: Node (not jsdom)

React Native's renderer doesn't use the DOM. Using `jsdom` adds browser globals that aren't relevant and can mask bugs. `node` is the correct environment for React Native unit tests.

### Mock strategy

Native packages are mocked via `__mocks__/` at the project root + `vi.mock('pkg')` calls at the top of each test file. Vitest resolves the manual mock automatically when `vi.mock()` is called without a factory.

---

## File Map

| Action | Path | Role |
|--------|------|------|
| Create | `vitest.config.ts` | Vitest config: node env, globals, plugin-react, tsconfig-paths |
| Create | `test/setup.ts` | Global setup: `afterEach` cleanup |
| Create | `test/mocks/theme.ts` | Shared mock theme matching actual theme structure |
| Create | `__mocks__/react-native.ts` | JS React components for View, Text; PixelRatio, StyleSheet |
| Create | `__mocks__/react-native-unistyles.ts` | `useUnistyles → mockTheme`, `StyleSheet.create` pass-through |
| Create | `__mocks__/expo-localization.ts` | `getLocales → [{ languageCode: 'en' }]` |
| Create | `lib/theme/utils/__tests__/getLineHeight.test.ts` | Test `getLineHeight(fontSize, multiplier)` |
| Create | `lib/theme/utils/__tests__/createSpacingProps.test.ts` | Test `createSpacingStyles`, `omitSpacingProps`, `getSpacingPropertiesByComponentProps` |
| Create | `lib/theme/utils/__tests__/colorTypes.test.ts` | Test `getColorFromPath`, `getBorderRadiusFromPath` |
| Create | `lib/i18n/__tests__/createI18n.test.ts` | Test factory init, translations, language switching |
| Create | `lib/components/Box/__tests__/Box.test.tsx` | Render, spacing props, backgroundColor resolution, snapshot |
| Create | `lib/components/Typography/__tests__/Typography.test.tsx` | Render, variant prop, fontWeight prop, snapshot |
| Modify | `package.json` | Add `test`, `test:run`, `test:coverage` scripts |

---

## Packages to add (devDependencies)

```
vitest
@vitejs/plugin-react
vite-tsconfig-paths
react-test-renderer
@types/react-test-renderer
@vitest/coverage-v8
```

---

## Key design choices

### `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'android', 'ios', '.expo'],
    coverage: {
      provider: 'v8',
      include: ['lib/**'],
      exclude: ['lib/**/*.d.ts', 'lib/**/__tests__/**'],
    },
  },
})
```

### `__mocks__/react-native.ts`

Provides mock React components (using `React.forwardRef`) for `View`, `Text`, `ScrollView`, `Pressable`, `Switch`. Provides `PixelRatio.roundToNearestPixel = Math.round`. `StyleSheet.create` returns styles unchanged.

### `__mocks__/react-native-unistyles.ts`

`useUnistyles()` returns `{ theme: mockTheme, rt: { themeName: 'light' } }`. `StyleSheet.create` accepts a function (called with mockTheme) or object and returns the result. `UnistylesRuntime.setTheme` / `setAdaptiveThemes` are `vi.fn()`.

### `test/mocks/theme.ts`

Exports `mockTheme` that mirrors the actual `lightTheme` shape from `src/unistyles.ts`:
- `colors`: semantic keys (`background`, `text`, `ground`, `figure`, `primary`, `border`, `white`, `black`) + palette keys (`gray`, `brand`)
- `spacing`: `{ xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 40, '3xl': 48 }`
- `borderRadius`: `{ xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }`
- `typography`: `{ fontFamily, fontSize, fontWeight, lineHeight, variant }` matching actual shape

### `createI18n` test approach

The factory guards against double-init with `if (i18next.isInitialized) return i18next`. Tests run in sequence within a single describe block: first test initializes with EN/DA resources; subsequent tests verify translations and `changeLanguage()`. `changeLanguage()` is async and must be awaited.

---

## What each test file covers

### `getLineHeight.test.ts`
- Returns `fontSize × lineHeight` rounded to nearest pixel
- `getLineHeight(16, 1.2)` → `Math.round(19.2)` = 19
- `getLineHeight(14, 1.1)` → `Math.round(15.4)` = 15

### `createSpacingProps.test.ts`
- `createSpacingStyles({ margin: 'md' }, spacing)` → `{ margin: 16 }`
- `createSpacingStyles({ padding: 'lg', margin: 'sm' }, spacing)` → both resolved
- `omitSpacingProps({ margin: 'md', color: 'red' })` → `{ color: 'red' }`
- `getSpacingPropertiesByComponentProps({ margin: 'md', color: 'red' })` → `{ margin: 'md' }`
- Unknown spacing key: value not included in output

### `colorTypes.test.ts`
- `getColorFromPath(colors, 'background')` → `'#ffffff'`
- `getColorFromPath(colors, 'gray.200')` → `'#e0e0e0'`
- `getColorFromPath(colors, 'nonexistent')` → throws
- `getBorderRadiusFromPath(borderRadius, 'md')` → `16`

### `createI18n.test.ts`
- Returns initialized i18next instance
- `t('playground.home.title')` returns English string
- `await i18n.changeLanguage('da')` → `t('playground.home.title')` returns Danish string
- Non-existent key falls back to fallbackLng
- Double-call to `createI18n` returns the same already-initialized instance

### `Box.test.tsx`
- Renders without crashing (no props)
- Renders children
- Applies `marginTop="lg"` → `spacingStyles.marginTop = 24`
- Resolves `backgroundColor="ground"` → computed background color in style prop
- Snapshot of `<Box marginTop="sm"><Text>hi</Text></Box>`

### `Typography.test.tsx`
- Renders without crashing
- Renders children text
- `variant="paragraph"` applies the variant style
- `fontWeight="bold"` applies the correct fontWeight value
- Snapshot of `<Typography variant="body">Hello</Typography>`

---

## Verification

```bash
pnpm test:run          # all tests pass
pnpm test:coverage     # coverage report generates
pnpm test              # watch mode works
```

Expected: 15-20 passing tests across 6 files. Coverage report shows lib/ utility files.
