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

### File placement
`lib/path/to/__tests__/filename.test.ts` (`.tsx` for components)

### Mock declarations — always at the very top of the file, before imports

For any test touching a component or importing from `react-native` or `react-native-unistyles`:
```ts
jest.mock('react-native')
jest.mock('react-native-unistyles')
```

For i18n tests:
```ts
jest.mock('expo-localization')
```

For Typography specifically (blocks `@expo-google-fonts` imports):
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

it('renders children', () => {
  const { getByText } = render(<Box><Text>hello</Text></Box>)
  expect(getByText('hello')).toBeTruthy()
})
```

For style assertions use `toHaveStyle` from `@testing-library/react-native/matchers`:
```tsx
const { getByTestId } = render(<Box testID="box" marginTop="sm" />)
expect(getByTestId('box')).toHaveStyle({ marginTop: 8 })
```

### Mock theme values

The unistyles mock returns the lightTheme shape from `src/unistyles.ts`. Key values:

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
