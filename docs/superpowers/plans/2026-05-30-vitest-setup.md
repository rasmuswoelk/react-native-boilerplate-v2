# Vitest Unit Test Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete vitest unit test infrastructure with working tests for utility functions and lib/ design system components, then open a PR.

**Architecture:** vitest with `@vitejs/plugin-react` (JSX transform) and `vite-tsconfig-paths` (`@/` alias resolution) runs in a Node environment. `react-test-renderer` renders components in pure JS. Manual mocks in `__mocks__/` replace native packages (`react-native`, `react-native-unistyles`, `expo-localization`). Six test files cover three utility modules and two components.

**Tech Stack:** vitest, @vitejs/plugin-react, vite-tsconfig-paths, react-test-renderer, @vitest/coverage-v8, pnpm

---

## File Map

| Action | Path |
|--------|------|
| Create | `vitest.config.ts` |
| Create | `test/setup.ts` |
| Create | `test/mocks/theme.ts` |
| Create | `__mocks__/react-native.ts` |
| Create | `__mocks__/react-native-unistyles.ts` |
| Create | `__mocks__/expo-localization.ts` |
| Create | `lib/theme/utils/__tests__/getLineHeight.test.ts` |
| Create | `lib/theme/utils/__tests__/createSpacingProps.test.ts` |
| Create | `lib/theme/utils/__tests__/colorTypes.test.ts` |
| Create | `lib/i18n/__tests__/createI18n.test.ts` |
| Create | `lib/components/Box/__tests__/Box.test.tsx` |
| Create | `lib/components/Typography/__tests__/Typography.test.tsx` |
| Modify | `package.json` — add test scripts |

---

### Task 1: Create feature branch and install packages

**Files:** `package.json`, `pnpm-lock.yaml`

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b feat/vitest-setup
```

- [ ] **Step 2: Install dev dependencies**

```bash
pnpm add -D vitest @vitejs/plugin-react vite-tsconfig-paths react-test-renderer @types/react-test-renderer @vitest/coverage-v8
```

Expected: 6 packages added. `package.json` devDependencies now includes all six.

- [ ] **Step 3: Verify**

```bash
grep -E '"vitest"|"@vitejs/plugin-react"|"vite-tsconfig-paths"|"react-test-renderer"|"@vitest/coverage-v8"' package.json
```

Expected: 5 matching lines.

---

### Task 2: Create vitest config and test infrastructure files

**Files:**
- Create: `vitest.config.ts`
- Create: `test/setup.ts`
- Create: `test/mocks/theme.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

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
    exclude: ['node_modules', 'android', 'ios', '.expo', 'app-example'],
    coverage: {
      provider: 'v8',
      include: ['lib/**'],
      exclude: ['lib/**/*.d.ts', 'lib/**/__tests__/**'],
    },
  },
})
```

- [ ] **Step 2: Create `test/setup.ts`**

```ts
import { afterEach, vi } from 'vitest'

afterEach(() => {
  vi.clearAllMocks()
})
```

- [ ] **Step 3: Create `test/mocks/theme.ts`**

This file mirrors the shape of `src/unistyles.ts` lightTheme and is used by the `__mocks__/react-native-unistyles.ts` manual mock.

```ts
export const mockTheme = {
  colors: {
    white: '#fff',
    black: '#000',
    ground: '#ffffff',
    figure: '#000000',
    background: '#ffffff',
    text: '#000000',
    primary: '#000000',
    secondary: '#666666',
    border: '#e0e0e0',
    red:    { 100: '#ffe3e3', 200: '#ffb3b3', 300: '#ff8383', 400: '#ff5353', 500: '#ff2323', 600: '#e61e1e', 700: '#cc1a1a', 800: '#b31515' },
    green:  { 100: '#e3ffe3', 200: '#b3ffb3', 300: '#83ff83', 400: '#53ff53', 500: '#23ff23', 600: '#1ecc1e', 700: '#1acc1a', 800: '#15b715' },
    orange: { 100: '#fff3e0', 200: '#ffe0b2', 300: '#ffcc80', 400: '#ffb74d', 500: '#ffa726', 600: '#ff9800', 700: '#ff5722', 800: '#d84315' },
    blue:   { 100: '#e3f2fd', 200: '#bbdefb', 300: '#90caf9', 400: '#64b5f6', 500: '#42a5f5', 600: '#2196f3', 700: '#1e88e5', 800: '#1976d2' },
    gray:   { 100: '#f5f5f5', 200: '#e0e0e0', 300: '#bdbdbd', 400: '#9e9e9e', 500: '#757575', 600: '#616161', 700: '#424242', 800: '#212121' },
    brand:  { 100: '#e8f4fd', 200: '#bee9fb', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#004d7a', 900: '#002f44' },
  },
  spacing: {
    '3xs': 1, '2xs': 2, xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
    '2xl': 40, '3xl': 48, '4xl': 56, '5xl': 64, '6xl': 72, '7xl': 80, gutter: 12,
  },
  borderRadius: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  typography: {
    lineHeight: { xs: 1, sm: 1.1, md: 1.2, lg: 1.3, xl: 1.4 },
    fontFamily: { primary: 'SpaceMono' },
    fontSize: {
      '3xs': 6, '2xs': 10, xs: 12, sm: 14, md: 16, lg: 18, xl: 20,
      '2xl': 24, '3xl': 32, '4xl': 40, '5xl': 48, '6xl': 56, '7xl': 64,
    },
    fontWeight: { light: 300, regular: 400, medium: 500, bold: 600, black: 700 },
    variant: {
      h1:        { fontSize: 32, fontWeight: 700, lineHeight: 45 },
      h2:        { fontSize: 24, fontWeight: 600, lineHeight: 31 },
      h3:        { fontSize: 20, fontWeight: 500, lineHeight: 28 },
      h4:        { fontSize: 18, fontWeight: 400, lineHeight: 23 },
      h5:        { fontSize: 16, fontWeight: 300, lineHeight: 19 },
      body:      { fontSize: 16, lineHeight: 19 },
      paragraph: { fontSize: 16, lineHeight: 22 },
      caption:   { fontSize: 14, lineHeight: 15 },
      label:     { fontSize: 14, lineHeight: 15 },
    },
  },
} as const
```

---

### Task 3: Create manual mock files

**Files:**
- Create: `__mocks__/react-native.ts`
- Create: `__mocks__/react-native-unistyles.ts`
- Create: `__mocks__/expo-localization.ts`

These files live at the project root. Vitest uses them automatically when `vi.mock('package-name')` is called in a test without a factory.

- [ ] **Step 1: Create `__mocks__/react-native.ts`**

```ts
import React from 'react'
import { vi } from 'vitest'

const makeNativeComponent = (name: string) => {
  const Component = React.forwardRef<any, any>(({ children, ...props }, ref) =>
    React.createElement(name, { ...props, ref }, children)
  )
  Component.displayName = name
  return Component
}

export const View = makeNativeComponent('View')
export const Text = makeNativeComponent('Text')
export const ScrollView = makeNativeComponent('ScrollView')
export const Pressable = makeNativeComponent('Pressable')
export const Switch = makeNativeComponent('Switch')
export const TouchableOpacity = makeNativeComponent('TouchableOpacity')
export const Image = makeNativeComponent('Image')

export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T): T => styles,
  hairlineWidth: 0.5,
  flatten: (style: any) => style,
}

export const PixelRatio = {
  roundToNearestPixel: (value: number) => Math.round(value),
  get: () => 2,
  getFontScale: () => 1,
}

export const Platform = {
  OS: 'ios' as const,
  select: (obj: Record<string, any>) => obj.ios ?? obj.default,
}

export const Animated = {
  View: makeNativeComponent('Animated.View'),
  Text: makeNativeComponent('Animated.Text'),
  Value: vi.fn().mockImplementation(() => ({
    setValue: vi.fn(),
    interpolate: vi.fn(),
  })),
  timing: vi.fn(() => ({ start: vi.fn() })),
  spring: vi.fn(() => ({ start: vi.fn() })),
  createAnimatedComponent: (Component: any) => Component,
}

export const useColorScheme = vi.fn(() => 'light')
export const useWindowDimensions = vi.fn(() => ({ width: 375, height: 812 }))
```

- [ ] **Step 2: Create `__mocks__/react-native-unistyles.ts`**

```ts
import { vi } from 'vitest'
import { mockTheme } from '../test/mocks/theme'

export const StyleSheet = {
  create: (stylesOrFn: any) =>
    typeof stylesOrFn === 'function' ? stylesOrFn(mockTheme) : stylesOrFn,
  hairlineWidth: 0.5,
}

export const useUnistyles = () => ({
  theme: mockTheme,
  rt: { themeName: 'light' as const },
})

export const UnistylesRuntime = {
  setTheme: vi.fn(),
  setAdaptiveThemes: vi.fn(),
  themeName: 'light',
}
```

- [ ] **Step 3: Create `__mocks__/expo-localization.ts`**

```ts
export const getLocales = () => [
  { languageCode: 'en', regionCode: 'US', languageTag: 'en-US' },
]
export const getCalendars = () => []
export const locale = 'en-US'
```

---

### Task 4: Add test scripts to package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add the three test scripts inside the `"scripts"` block**

Open `package.json` and add these three entries to the `scripts` object:

```json
"test": "vitest",
"test:run": "vitest run",
"test:coverage": "vitest run --coverage"
```

After editing, the scripts block should contain at minimum:
```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage",
  "start": "expo start",
  ...
}
```

- [ ] **Step 2: Verify vitest can start (even with no test files yet)**

```bash
pnpm test:run 2>&1 | head -10
```

Expected: vitest starts and reports 0 test files (or exits cleanly — no `command not found` errors).

---

### Task 5: Write and verify utility tests — getLineHeight, createSpacingProps, colorTypes

**Files:**
- Create: `lib/theme/utils/__tests__/getLineHeight.test.ts`
- Create: `lib/theme/utils/__tests__/createSpacingProps.test.ts`
- Create: `lib/theme/utils/__tests__/colorTypes.test.ts`

`getLineHeight` uses `PixelRatio.roundToNearestPixel` from react-native, so we mock it. `createSpacingProps` imports `useUnistyles` at the module level, so we mock that too. `colorTypes` is a pure function with no runtime native dependencies.

- [ ] **Step 1: Create `lib/theme/utils/__tests__/getLineHeight.test.ts`**

```ts
import { describe, expect, it, vi } from 'vitest'

vi.mock('react-native')

import { getLineHeight } from '../getLineHeight'

describe('getLineHeight', () => {
  it('multiplies fontSize by lineHeight and rounds to nearest pixel', () => {
    // 16 × 1.2 = 19.2 → Math.round → 19
    expect(getLineHeight(16, 1.2)).toBe(19)
  })

  it('returns an integer result when multiplication is already whole', () => {
    // 20 × 1.5 = 30 → Math.round → 30
    expect(getLineHeight(20, 1.5)).toBe(30)
  })

  it('rounds down below 0.5', () => {
    // 14 × 1.1 = 15.4 → Math.round → 15
    expect(getLineHeight(14, 1.1)).toBe(15)
  })

  it('rounds up at or above 0.5', () => {
    // 10 × 1.35 = 13.5 → Math.round → 14
    expect(getLineHeight(10, 1.35)).toBe(14)
  })
})
```

- [ ] **Step 2: Create `lib/theme/utils/__tests__/createSpacingProps.test.ts`**

```ts
import { describe, expect, it, vi } from 'vitest'

vi.mock('react-native')
vi.mock('react-native-unistyles')

import {
  createSpacingStyles,
  getSpacingPropertiesByComponentProps,
  omitSpacingProps,
} from '../createSpacingProps'
import { spacing } from '@/lib/theme/variables/spacing'

describe('createSpacingStyles', () => {
  it('converts a single spacing key to its pixel value', () => {
    expect(createSpacingStyles({ margin: 'md' }, spacing)).toEqual({ margin: 16 })
  })

  it('converts multiple spacing keys in one call', () => {
    expect(
      createSpacingStyles({ padding: 'lg', marginTop: 'sm' }, spacing)
    ).toEqual({ padding: 24, marginTop: 8 })
  })

  it('ignores keys not present in the spacing scale', () => {
    expect(createSpacingStyles({ margin: 'unknown' as any }, spacing)).toEqual({})
  })

  it('returns an empty object when no spacing props are passed', () => {
    expect(createSpacingStyles({}, spacing)).toEqual({})
  })
})

describe('omitSpacingProps', () => {
  it('removes all spacing keys from the object', () => {
    const result = omitSpacingProps({ margin: 'md', color: 'red', padding: 'sm' })
    expect(result).toEqual({ color: 'red' })
  })

  it('returns the object unchanged when it has no spacing keys', () => {
    const result = omitSpacingProps({ color: 'red', fontSize: 16 })
    expect(result).toEqual({ color: 'red', fontSize: 16 })
  })
})

describe('getSpacingPropertiesByComponentProps', () => {
  it('picks only spacing-related props', () => {
    const result = getSpacingPropertiesByComponentProps({
      margin: 'md',
      color: 'red',
      padding: 'lg',
      testID: 'box',
    })
    expect(result).toEqual({ margin: 'md', padding: 'lg' })
  })

  it('returns an empty object when no spacing keys are present', () => {
    expect(getSpacingPropertiesByComponentProps({ color: 'red' })).toEqual({})
  })
})
```

- [ ] **Step 3: Create `lib/theme/utils/__tests__/colorTypes.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { getBorderRadiusFromPath, getColorFromPath } from '../colorTypes'
import { borderRadius } from '@/lib/theme/variables/borderRadius'

const colors = {
  white: '#fff',
  background: '#ffffff',
  gray: { 200: '#e0e0e0', 500: '#757575' },
  brand: { 600: '#0284c7' },
}

describe('getColorFromPath', () => {
  it('returns a top-level color string', () => {
    expect(getColorFromPath(colors, 'background')).toBe('#ffffff')
  })

  it('resolves a dot-separated nested path', () => {
    expect(getColorFromPath(colors, 'gray.200')).toBe('#e0e0e0')
  })

  it('resolves a deeply nested path', () => {
    expect(getColorFromPath(colors, 'brand.600')).toBe('#0284c7')
  })

  it('throws when the top-level key does not exist', () => {
    expect(() => getColorFromPath(colors, 'nonexistent')).toThrow(
      'Color path "nonexistent" not found in theme colors'
    )
  })

  it('throws when the path resolves to an object, not a string', () => {
    expect(() => getColorFromPath(colors, 'gray')).toThrow(
      'Color path "gray" does not resolve to a color string'
    )
  })

  it('throws when a nested key does not exist', () => {
    expect(() => getColorFromPath(colors, 'gray.999')).toThrow(
      'Color path "gray.999" not found in theme colors'
    )
  })
})

describe('getBorderRadiusFromPath', () => {
  it('returns the numeric value for xs', () => {
    expect(getBorderRadiusFromPath(borderRadius, 'xs')).toBe(4)
  })

  it('returns the numeric value for md', () => {
    expect(getBorderRadiusFromPath(borderRadius, 'md')).toBe(16)
  })

  it('returns the numeric value for xl', () => {
    expect(getBorderRadiusFromPath(borderRadius, 'xl')).toBe(32)
  })
})
```

- [ ] **Step 4: Run the utility tests**

```bash
pnpm test:run lib/theme/utils/__tests__/
```

Expected: 3 test files, ~14 tests, all passing.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts test/ __mocks__/ lib/theme/utils/__tests__/ package.json pnpm-lock.yaml
git commit -m "test: add vitest setup with utility tests"
```

---

### Task 6: Write and verify i18n test — createI18n

**Files:**
- Create: `lib/i18n/__tests__/createI18n.test.ts`

`createI18n` wraps the i18next singleton. Because vitest isolates module state per test file, i18next starts uninitialized for this file. All tests in this file share the same initialized instance; language-switching tests reset to `'en'` after each assertion.

- [ ] **Step 1: Create `lib/i18n/__tests__/createI18n.test.ts`**

```ts
import { beforeAll, describe, expect, it, vi } from 'vitest'
import i18next from 'i18next'

vi.mock('expo-localization')

import { createI18n } from '../createI18n'

const resources = {
  en: { translation: { greeting: 'Hello', items: '{{count}} item', items_other: '{{count}} items' } },
  da: { translation: { greeting: 'Hej', items: '{{count}} element', items_other: '{{count}} elementer' } },
}

describe('createI18n', () => {
  let i18n: typeof i18next

  beforeAll(() => {
    i18n = createI18n(resources)
  })

  it('returns an initialized i18next instance', () => {
    expect(i18n.isInitialized).toBe(true)
  })

  it('starts with the device locale returned by expo-localization (mocked to "en")', () => {
    expect(i18n.language).toBe('en')
  })

  it('translates a key in the active language', () => {
    expect(i18n.t('greeting')).toBe('Hello')
  })

  it('switches language at runtime', async () => {
    await i18n.changeLanguage('da')
    expect(i18n.t('greeting')).toBe('Hej')
    await i18n.changeLanguage('en')
  })

  it('falls back to fallbackLng for an unknown language', async () => {
    await i18n.changeLanguage('fr')
    expect(i18n.t('greeting')).toBe('Hello') // 'en' is fallbackLng
    await i18n.changeLanguage('en')
  })

  it('returns the already-initialized instance on a second call (double-init guard)', () => {
    const second = createI18n(resources)
    expect(second).toBe(i18n)
  })
})
```

- [ ] **Step 2: Run the i18n test**

```bash
pnpm test:run lib/i18n/__tests__/
```

Expected: 1 test file, 6 tests, all passing.

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/__tests__/
git commit -m "test: add createI18n unit tests"
```

---

### Task 7: Write and verify component tests — Box and Typography

**Files:**
- Create: `lib/components/Box/__tests__/Box.test.tsx`
- Create: `lib/components/Typography/__tests__/Typography.test.tsx`

`vi.mock('react-native')` causes vitest to use `__mocks__/react-native.ts`, providing React components for `View`, `Text`, and `PixelRatio`. `vi.mock('react-native-unistyles')` uses `__mocks__/react-native-unistyles.ts`, which returns `mockTheme` from `useUnistyles()`. `react-test-renderer` renders the component tree in pure JS — no native runtime required.

> **Note:** React 19 shows a deprecation warning for `react-test-renderer`. This does not affect functionality. Future tests can migrate to `@testing-library/react-native`.

- [ ] **Step 1: Create `lib/components/Box/__tests__/Box.test.tsx`**

```tsx
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { create } from 'react-test-renderer'

vi.mock('react-native')
vi.mock('react-native-unistyles')

import { Box } from '../Box'

const flatStyle = (style: unknown): Record<string, any> => {
  if (!style) return {}
  if (Array.isArray(style)) return Object.assign({}, ...style.map(flatStyle))
  return style as Record<string, any>
}

describe('Box', () => {
  it('renders without crashing', () => {
    expect(() => create(<Box />)).not.toThrow()
  })

  it('renders children', () => {
    const tree = create(<Box>{React.createElement('Text', null, 'hello')}</Box>).toJSON()
    expect(JSON.stringify(tree)).toContain('hello')
  })

  it('applies a spacing key as a pixel value in the style', () => {
    const tree = create(<Box marginTop="sm" />).toJSON() as any
    const style = flatStyle(tree?.props?.style)
    expect(style.marginTop).toBe(8) // sm = 8 in mockTheme.spacing
  })

  it('applies multiple spacing keys', () => {
    const tree = create(<Box padding="md" marginBottom="lg" />).toJSON() as any
    const style = flatStyle(tree?.props?.style)
    expect(style.padding).toBe(16)     // md = 16
    expect(style.marginBottom).toBe(24) // lg = 24
  })

  it('resolves a top-level color path for backgroundColor', () => {
    const tree = create(<Box backgroundColor="background" />).toJSON() as any
    const style = flatStyle(tree?.props?.style)
    expect(style.backgroundColor).toBe('#ffffff')
  })

  it('resolves a borderRadius token', () => {
    const tree = create(<Box borderRadius="md" />).toJSON() as any
    const style = flatStyle(tree?.props?.style)
    expect(style.borderRadius).toBe(16) // md = 16
  })

  it('matches snapshot', () => {
    const tree = create(
      <Box marginTop="sm" paddingHorizontal="md" backgroundColor="ground" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

- [ ] **Step 2: Create `lib/components/Typography/__tests__/Typography.test.tsx`**

```tsx
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { create } from 'react-test-renderer'

vi.mock('react-native')
vi.mock('react-native-unistyles')

import { Typography } from '../Typography'

describe('Typography', () => {
  it('renders without crashing', () => {
    expect(() => create(<Typography>Hello</Typography>)).not.toThrow()
  })

  it('renders its children', () => {
    const tree = create(<Typography>Hello world</Typography>).toJSON()
    expect(JSON.stringify(tree)).toContain('Hello world')
  })

  it('accepts a variant prop without crashing', () => {
    expect(() =>
      create(<Typography variant="paragraph">Text</Typography>)
    ).not.toThrow()
  })

  it('accepts a fontWeight prop without crashing', () => {
    expect(() =>
      create(<Typography fontWeight="bold">Text</Typography>)
    ).not.toThrow()
  })

  it('matches snapshot with variant="body"', () => {
    const tree = create(
      <Typography variant="body">Body text</Typography>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('matches snapshot with variant="caption" and fontWeight="bold"', () => {
    const tree = create(
      <Typography variant="caption" fontWeight="bold">
        Caption
      </Typography>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

- [ ] **Step 3: Run the component tests**

```bash
pnpm test:run lib/components/Box/__tests__/ lib/components/Typography/__tests__/
```

Expected: 2 test files, ~13 tests, all passing. Snapshots are written on first run.

If you see errors about missing modules (e.g., `@expo-google-fonts/source-sans-3`), add this mock to the top of `Typography.test.tsx`:

```tsx
vi.mock('@/src/theme/fonts', () => ({
  fontMapper: {
    primary: {
      regular: { normal: 'SourceSans3_400Regular', italic: 'SourceSans3_400Regular_Italic' },
      bold:    { normal: 'SourceSans3_700Bold',    italic: 'SourceSans3_700Bold_Italic' },
      black:   { normal: 'SourceSans3_900Black',   italic: 'SourceSans3_900Black_Italic' },
      light:   { normal: 'SourceSans3_300Light',   italic: 'SourceSans3_300Light_Italic' },
      medium:  { normal: 'SourceSans3_500Medium',  italic: 'SourceSans3_500Medium_Italic' },
    },
  },
  availableFontKeys: {},
  fonts: {},
}))
```

- [ ] **Step 4: Run the full test suite**

```bash
pnpm test:run
```

Expected: 6 test files, all passing. No errors.

- [ ] **Step 5: Commit**

```bash
git add lib/components/Box/__tests__/ lib/components/Typography/__tests__/
git commit -m "test: add Box and Typography component tests"
```

---

### Task 8: Push branch and open PR

- [ ] **Step 1: Push the feature branch**

```bash
git push -u origin feat/vitest-setup
```

- [ ] **Step 2: Open the PR**

```bash
gh pr create \
  --title "test: add vitest unit test setup" \
  --body "$(cat <<'EOF'
## Summary

- Adds vitest as the unit test runner with `@vitejs/plugin-react` and `vite-tsconfig-paths`
- Manual mocks in `__mocks__/` replace `react-native`, `react-native-unistyles`, and `expo-localization` for pure-JS test execution
- Six test files covering `getLineHeight`, `createSpacingProps`, `colorTypes`, `createI18n`, `Box`, and `Typography`
- Renders components with `react-test-renderer` (no native runtime required)
- Coverage via `@vitest/coverage-v8` (`pnpm test:coverage`)

## Test plan

- [ ] `pnpm test:run` — all tests pass
- [ ] `pnpm test:coverage` — coverage report generated under `coverage/`
- [ ] `pnpm test` — watch mode launches without errors
- [ ] Snapshot files committed under `lib/components/*/__tests__/__snapshots__/`

🤖 Generated with [Claude Code](https://claude.ai/claude-code)
EOF
)"
```

- [ ] **Step 3: Record and share the PR URL**

```bash
gh pr view --json url -q .url
```

---

## Verification

```bash
pnpm test:run    # all 6 files pass
pnpm test:coverage   # coverage/index.html shows lib/ coverage
```

Expected test counts per file:
| File | Tests |
|------|-------|
| getLineHeight.test.ts | 4 |
| createSpacingProps.test.ts | 7 |
| colorTypes.test.ts | 6 |
| createI18n.test.ts | 6 |
| Box.test.tsx | 7 |
| Typography.test.tsx | 6 |
| **Total** | **36** |
