---
name: create-test
description: Patterns and rules for writing unit tests (jest) and e2e tests (Maestro) in this React Native boilerplate. Use when asked to add, write, or create tests for any file in the project.
---

# Creating Tests in This Project

Decide which test layer before writing anything:
- **Unit test** — testing a pure function or a `lib/` component in isolation
- **E2e test** — testing a user-visible flow on the running iOS simulator

---

## Unit Tests (jest)

### Screen tests

Do **not** add tests for new screen components by default.

Only create tests for screens under `src/features/<feature>/screens/` when the user explicitly asks for screen tests or asks to test that screen. Shared `lib/components/` still require tests when created.

### File placement
`lib/path/to/__tests__/filename.test.ts` (`.tsx` for components)

### When to mock — declarations go at the top of the file, before imports

**`react-native`** — only when the code under test calls a native RN API at runtime (e.g. `PixelRatio`). A type-only import like `import { ViewStyle } from 'react-native'` is stripped at compile time and needs no mock.
```ts
jest.mock('react-native')
```

**`react-native-unistyles`** — never needed. It is globally mocked by `setupFiles` (`react-native-unistyles/mocks` + `src/unistyles.ts`), which wires the real theme into the mock. Do not add this to individual test files.

**`expo-localization`** — when the code under test calls `getLocales()` or similar locale APIs:
```ts
jest.mock('expo-localization')
```

**Font imports** — Typography and any component that imports from `@/src/theme/fonts` (which pulls in `@expo-google-fonts` packages):
```ts
jest.mock('@/src/theme/fonts', () => ({
  fontMapper: {
    primary: {
      regular: { normal: 'Font_400Regular', italic: 'Font_400Regular_Italic' },
      bold:    { normal: 'Font_700Bold',    italic: 'Font_700Bold_Italic' },
      black:   { normal: 'Font_900Black',   italic: 'Font_900Black_Italic' },
      light:   { normal: 'Font_300Light',   italic: 'Font_300Light_Italic' },
      medium:  { normal: 'Font_500Medium',  italic: 'Font_500Medium_Italic' },
    },
  },
  availableFontKeys: {},
  fonts: {},
}))
```

### Component rendering — use `@testing-library/react-native`

```tsx
import { render } from '@testing-library/react-native'
import { Typography } from '@/lib/components/Typography'

it('renders children', () => {
  const { getByText } = render(<Box><Typography>hello</Typography></Box>)
  expect(getByText('hello')).toBeTruthy()
})
```

For style assertions use `toHaveStyle` from `@testing-library/react-native/matchers`:
```tsx
const { getByTestId } = render(<Box testID="box" marginTop="sm" />)
expect(getByTestId('box')).toHaveStyle({ marginTop: 8 })
```

### Theme values in assertions

The unistyles mock runs `src/unistyles.ts` during setup, so tests receive the real `lightTheme`. Key values to use in `toHaveStyle` assertions:

| Token | Key | Value |
|-------|-----|-------|
| spacing | xs | 4 |
| spacing | sm | 8 |
| spacing | md | 16 |
| spacing | lg | 24 |
| spacing | xl | 32 |
| borderRadius | xs | 4 |
| borderRadius | sm | 8 |
| borderRadius | md | 16 |
| borderRadius | lg | 24 |
| borderRadius | xl | 32 |
| colors | background | #ffffff |
| colors | ground | #ffffff |
| colors | text | #000000 |
| colors | border | #e0e0e0 |
| colors.gray | 200 | #e0e0e0 |
| colors.gray | 500 | #757575 |
| colors.gray | 700 | #424242 |
| colors.brand | 600 | #0284c7 |

### Run command
```bash
pnpm test:run lib/path/to/__tests__/
```

---

## E2E Tests (Maestro)

### File placement
`e2e/XX-description.yaml` — XX is the next number in sequence.

Check existing files first: `ls e2e/`

### Required header — every flow starts with this

```yaml
appId: com.rasmuswoelk.react-native-boilerplate
---
- launchApp
```

### Navigate to playground

Most flows need this after `launchApp`:
```yaml
- tapOn: "Enter the playground"
- assertVisible: "Home"
```

### Element matching

By visible text (case-sensitive, must match exactly):
```yaml
- tapOn: "Colors"
- assertVisible: "Base Colors"
```

By `accessibilityLabel` (for elements with no visible text):
```yaml
- tapOn:
    label: "Toggle dark mode"
```

Use English strings unless the flow specifically tests DA language.

### Run a single flow
```bash
pnpm e2e:flow e2e/XX-description.yaml
```

### Record interactively
```bash
maestro studio
```

### Prerequisites check before running
1. `maestro --version` — confirms CLI installed
2. iOS Simulator is running
3. Dev build installed — `pnpm ios` if unsure
