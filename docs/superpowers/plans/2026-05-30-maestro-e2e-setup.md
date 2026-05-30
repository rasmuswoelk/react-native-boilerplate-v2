# Maestro E2E Test Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 4 Maestro e2e flows covering navigation, language toggle, dark mode, and tab content; plus a `docs/testing.md` reference and a `docs/skills/create-test.md` skill for writing future tests.

**Architecture:** Four independent YAML flows in `e2e/`, each relaunching the app from scratch. Elements matched by visible text (translation strings we control) and `accessibilityLabel` for the dark mode switch. No native configuration changes required.

**Tech Stack:** Maestro CLI, YAML, Expo development build, iOS Simulator

---

## File Map

| Action | Path | Role |
|--------|------|------|
| Create | `e2e/01-navigation.yaml` | Root → playground → all 5 tabs |
| Create | `e2e/02-language-toggle.yaml` | EN→DA switch, verify strings, restore |
| Create | `e2e/03-dark-mode.yaml` | Dark mode toggle smoke test |
| Create | `e2e/04-tab-content.yaml` | Per-tab card title verification |
| Modify | `package.json` | Add `e2e` and `e2e:flow` scripts |
| Create | `docs/testing.md` | Full testing reference for the project |
| Create | `docs/skills/create-test.md` | Skill file for writing tests in future |

---

### Task 1: Install Maestro and add package.json scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Maestro CLI**

```bash
brew install maestro
```

- [ ] **Step 2: Verify install**

```bash
maestro --version
```

Expected: prints a version number like `1.x.x`. If not found, restart your terminal after the brew install.

- [ ] **Step 3: Add scripts to `package.json`**

Open `package.json` and add to the `"scripts"` block:

```json
"e2e": "maestro test e2e/",
"e2e:flow": "maestro test"
```

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "chore: add Maestro e2e scripts to package.json"
```

---

### Task 2: Create navigation flow

**Files:**
- Create: `e2e/01-navigation.yaml`

**Prerequisite:** iOS Simulator is running with the dev build already installed. If you haven't built yet, run `pnpm ios` first (takes several minutes on first run).

- [ ] **Step 1: Create `e2e/01-navigation.yaml`**

```yaml
appId: com.rasmuswoelk.react-native-boilerplate
---
- launchApp
- assertVisible: "Enter the playground"
- tapOn: "Enter the playground"
- assertVisible: "Home"
- tapOn: "Typography"
- assertVisible: "Variants"
- tapOn: "Spacing"
- assertVisible: "Spacing Values"
- tapOn: "Colors"
- assertVisible: "Base Colors"
- tapOn: "Gradients"
- tapOn: "Home"
- assertVisible: "Welcome to the playground"
```

"Enter the playground" has a 1.2s FadeIn delay. Maestro waits up to 5 seconds for elements by default — no explicit wait command is needed.

- [ ] **Step 2: Run the flow**

```bash
pnpm e2e:flow e2e/01-navigation.yaml
```

Expected: each step turns green in the Maestro output. If a step fails with "element not found", verify the simulator is running and the app is installed.

- [ ] **Step 3: Commit**

```bash
git add e2e/01-navigation.yaml
git commit -m "test(e2e): add navigation flow"
```

---

### Task 3: Create language toggle flow

**Files:**
- Create: `e2e/02-language-toggle.yaml`

- [ ] **Step 1: Create `e2e/02-language-toggle.yaml`**

```yaml
appId: com.rasmuswoelk.react-native-boilerplate
---
- launchApp
- tapOn: "Enter the playground"
- assertVisible: "Home"
- tapOn: "DA"
- assertVisible: "Hjem"
- tapOn: "EN"
- assertVisible: "Home"
```

"Hjem" is the Danish translation of the "Home" tab label (from `src/translations/da.json`). The flow restores EN at the end so it does not pollute simulator state for flows run after it.

- [ ] **Step 2: Run the flow**

```bash
pnpm e2e:flow e2e/02-language-toggle.yaml
```

Expected: all steps green.

- [ ] **Step 3: Commit**

```bash
git add e2e/02-language-toggle.yaml
git commit -m "test(e2e): add language toggle flow"
```

---

### Task 4: Create dark mode flow

**Files:**
- Create: `e2e/03-dark-mode.yaml`

The dark mode Switch has `accessibilityLabel="Toggle dark mode"` set in `app/playground/_layout.tsx`. Maestro matches it via the `label:` key. This is a smoke test — Maestro cannot verify color values, so we verify the toggle is tappable and the app stays stable after each toggle.

- [ ] **Step 1: Create `e2e/03-dark-mode.yaml`**

```yaml
appId: com.rasmuswoelk.react-native-boilerplate
---
- launchApp
- tapOn: "Enter the playground"
- assertVisible: "Dark mode"
- tapOn:
    label: "Toggle dark mode"
- assertVisible: "Dark mode"
- tapOn:
    label: "Toggle dark mode"
- assertVisible: "Dark mode"
```

- [ ] **Step 2: Run the flow**

```bash
pnpm e2e:flow e2e/03-dark-mode.yaml
```

Expected: all steps green. The "Dark mode" label is visible after both toggles, confirming the app does not crash or blank.

- [ ] **Step 3: Commit**

```bash
git add e2e/03-dark-mode.yaml
git commit -m "test(e2e): add dark mode toggle flow"
```

---

### Task 5: Create tab content flow

**Files:**
- Create: `e2e/04-tab-content.yaml`

- [ ] **Step 1: Create `e2e/04-tab-content.yaml`**

```yaml
appId: com.rasmuswoelk.react-native-boilerplate
---
- launchApp
- tapOn: "Enter the playground"
- assertVisible: "Welcome to the playground"
- tapOn: "Colors"
- assertVisible: "Base Colors"
- tapOn: "Typography"
- assertVisible: "Variants"
- assertVisible: "Font sizes"
- assertVisible: "Font weights"
- tapOn: "Spacing"
- assertVisible: "Spacing Values"
- assertVisible: "Margin Examples"
```

- [ ] **Step 2: Run the flow**

```bash
pnpm e2e:flow e2e/04-tab-content.yaml
```

Expected: all steps green.

- [ ] **Step 3: Run the full suite**

```bash
pnpm e2e
```

Expected: all 4 flows pass. Maestro runs them sequentially, relaunching the app between each.

- [ ] **Step 4: Commit**

```bash
git add e2e/04-tab-content.yaml
git commit -m "test(e2e): add tab content flow"
```

---

### Task 6: Create testing documentation

**Files:**
- Create: `docs/testing.md`

- [ ] **Step 1: Create `docs/testing.md`**

The file uses 4-backtick fences (` ```` `) where inner content contains triple-backtick code blocks.

````markdown
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
````

- [ ] **Step 2: Commit**

```bash
git add docs/testing.md
git commit -m "docs: add testing reference document"
```

---

### Task 7: Create test creation skill

**Files:**
- Create: `docs/skills/create-test.md`

This skill file can be invoked by telling Claude Code: *"Follow the skill at `docs/skills/create-test.md` to create a new test."* It provides all patterns needed without looking at existing test files.

- [ ] **Step 1: Create `docs/skills/create-test.md`**

````markdown
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
````

- [ ] **Step 2: Commit**

```bash
git add docs/skills/create-test.md
git commit -m "docs: add create-test skill"
```

---

## Self-Review

**Spec coverage:**
- ✅ `01-navigation.yaml` — root → playground → 5 tabs
- ✅ `02-language-toggle.yaml` — EN→DA→EN
- ✅ `03-dark-mode.yaml` — smoke test
- ✅ `04-tab-content.yaml` — per-tab card titles
- ✅ `package.json` scripts
- ✅ `docs/testing.md`
- ✅ `docs/skills/create-test.md`

**Placeholder scan:** None found.

**Type consistency:** N/A — no shared types across tasks.

---

## Verification

```bash
pnpm test:run   # 40 unit tests still pass (unchanged)
pnpm e2e        # all 4 Maestro flows pass on iOS simulator
```
