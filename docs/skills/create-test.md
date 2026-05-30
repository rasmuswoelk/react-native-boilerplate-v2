---
name: create-test
description: Patterns and rules for writing unit tests (vitest) and e2e tests (Maestro) in this React Native boilerplate. Use when asked to add, write, or create tests for any file in the project.
---

# Creating Tests in This Project

Decide which test layer before writing anything:
- **Unit test** — testing a pure function or a `lib/` component in isolation
- **E2e test** — testing a user-visible flow on the running iOS simulator

---

## Unit Tests (vitest)

### File placement
`lib/path/to/__tests__/filename.test.ts` (`.tsx` for components)

### Mock declarations — always at the very top of the file, before imports

For any test touching a component or importing from `react-native` or `react-native-unistyles`:
```ts
vi.mock('react-native')
vi.mock('react-native-unistyles')
```

For i18n tests:
```ts
vi.mock('expo-localization')
```

For Typography specifically (blocks `@expo-google-fonts` imports):
```ts
vi.mock('@/src/theme/fonts', () => ({
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

### Component render helper — required for React 19

```tsx
import { act, create } from 'react-test-renderer'

const render = (element: React.ReactElement) => {
  let renderer: ReturnType<typeof create>
  act(() => { renderer = create(element) })
  return renderer!.toJSON() as any
}
```

Without `act()`, `toJSON()` returns `null` in React 19's concurrent renderer.

### Style inspection helper

```ts
const flatStyle = (style: unknown): Record<string, any> => {
  if (!style) return {}
  if (Array.isArray(style)) return Object.assign({}, ...style.map(flatStyle))
  return style as Record<string, any>
}

// Usage
const tree = render(<Box marginTop="sm" />)
const style = flatStyle(tree?.props?.style)
expect(style.marginTop).toBe(8)
```

### Mock theme values (from `test/mocks/theme.ts`)

Use these values in assertions — they match what `useUnistyles()` returns in tests:

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
