# Testing

Two levels of testing: **unit tests** (vitest) for `lib/` utilities and components, and **e2e tests** (Maestro) for user-visible flows on the iOS simulator.

---

## Unit Tests — vitest

### Commands

```bash
pnpm test            # watch mode
pnpm test:run        # single run, all files
pnpm test:coverage   # coverage report under coverage/
```

Run a single file:
```bash
pnpm test:run lib/theme/utils/__tests__/getLineHeight.test.ts
```

### What is tested

| File | Covers |
|------|--------|
| `lib/theme/utils/__tests__/getLineHeight.test.ts` | `getLineHeight` rounding via mocked `PixelRatio` |
| `lib/theme/utils/__tests__/createSpacingProps.test.ts` | spacing style resolution, `omitSpacingProps`, `getSpacingPropertiesByComponentProps` |
| `lib/theme/utils/__tests__/colorTypes.test.ts` | `getColorFromPath`, `getBorderRadiusFromPath` |
| `lib/i18n/__tests__/createI18n.test.ts` | factory init, language switching, double-init guard |
| `lib/components/Box/__tests__/Box.test.tsx` | spacing props, color/borderRadius resolution, snapshot |
| `lib/components/Typography/__tests__/Typography.test.tsx` | variant, fontWeight props, snapshot |

### Architecture

| Concern | Decision |
|---------|----------|
| Environment | Node — no DOM, no jsdom |
| Component renderer | `react-test-renderer` wrapped in `act()` (React 19 concurrent renderer requires it) |
| Native mocks | `__mocks__/react-native.ts`, `__mocks__/react-native-unistyles.ts`, `__mocks__/expo-localization.ts` |
| Mock theme | `test/mocks/theme.ts` mirrors `src/unistyles.ts` lightTheme shape |

### Writing a new unit test

**Utility function** — create `lib/path/to/__tests__/myUtil.test.ts`:

```ts
import { describe, expect, it, vi } from 'vitest'

vi.mock('react-native') // only if the util imports from react-native

import { myUtil } from '../myUtil'

describe('myUtil', () => {
  it('does the thing', () => {
    expect(myUtil(input)).toBe(expected)
  })
})
```

**Component** — create `lib/components/MyComp/__tests__/MyComp.test.tsx`:

```tsx
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { act, create } from 'react-test-renderer'

vi.mock('react-native')
vi.mock('react-native-unistyles')

import { MyComp } from '../MyComp'

const render = (element: React.ReactElement) => {
  let renderer: ReturnType<typeof create>
  act(() => { renderer = create(element) })
  return renderer!.toJSON() as any
}

describe('MyComp', () => {
  it('renders without crashing', () => {
    expect(() => { act(() => { create(<MyComp />) }) }).not.toThrow()
  })
})
```

The `render` helper flushes React's concurrent renderer before calling `toJSON()`. Without `act()`, `toJSON()` returns `null` in React 19.

---

## E2E Tests — Maestro

### Prerequisites

1. `brew install maestro` — install Maestro CLI (one-time)
2. `pnpm ios` — build and install dev build on the simulator (re-run if native code changes)
3. iOS Simulator must be running

### Commands

```bash
pnpm e2e                                  # all flows
pnpm e2e:flow e2e/01-navigation.yaml      # single flow
maestro studio                            # interactive recorder
```

### Flows

| File | Covers |
|------|--------|
| `e2e/01-navigation.yaml` | Root screen → playground → all 5 tabs |
| `e2e/02-language-toggle.yaml` | EN→DA switch, verify string change, restore |
| `e2e/03-dark-mode.yaml` | Dark mode toggle smoke test |
| `e2e/04-tab-content.yaml` | Card titles on each playground tab |

### Architecture

| Concern | Decision |
|---------|----------|
| Element matching | Visible text (translation strings) and `accessibilityLabel` for non-text elements |
| App state | Each flow relaunches the app — flows are fully independent |
| Animations | Maestro waits up to 5s per element — covers the 1.2s FadeIn on the root screen |
| Platform | iOS only, bundle ID `com.rasmuswoelk.react-native-boilerplate` |

### Writing a new e2e flow

Create `e2e/XX-description.yaml`. Every flow must begin with:

```yaml
appId: com.rasmuswoelk.react-native-boilerplate
---
- launchApp
```

Match elements by visible text:
```yaml
- tapOn: "Enter the playground"
- assertVisible: "Home"
```

Match by `accessibilityLabel` for elements with no visible text:
```yaml
- tapOn:
    label: "Toggle dark mode"
```

Use `maestro studio` to record interactions visually when the flow is complex.
