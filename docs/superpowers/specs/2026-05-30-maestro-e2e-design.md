# Maestro E2E Test Setup Design

## Context

The project has unit tests via vitest. This adds Maestro as the e2e test runner targeting the iOS simulator with a development build. Four YAML flow files cover navigation, language toggling, dark mode toggling, and per-tab content verification. Tests run locally only; CI is out of scope.

---

## Architecture

### Tool choice: Maestro with YAML flows

Maestro requires no native configuration changes, works directly with Expo development builds, and uses text-based element matching against visible strings. Each YAML file is an independent flow — Maestro relaunches the app at the start of each file. Element matching uses visible text content (translation strings we control) and `accessibilityLabel` for elements without visible text (the dark mode Switch).

### Platform: iOS only

App bundle ID: `com.rasmuswoelk.react-native-boilerplate`

Android is out of scope.

### Element matching strategy

Elements are found by visible text. This works reliably because:
- All user-facing strings are translation keys we own
- The playground uses card titles and tab labels that are stable across refactors
- The one non-text element (dark mode Switch) already has `accessibilityLabel="Toggle dark mode"` set in the source

No `testID` additions are required.

### Animation handling

The root screen has a `FadeIn` with a 1200ms delay before "Enter the playground" is visible. Maestro's default element wait timeout is 5 seconds, so no explicit wait commands are needed.

---

## File Map

| Action | Path | Role |
|--------|------|------|
| Create | `e2e/01-navigation.yaml` | Root → playground → all 5 tabs |
| Create | `e2e/02-language-toggle.yaml` | EN→DA switch, verify string changes, restore |
| Create | `e2e/03-dark-mode.yaml` | Dark mode toggle smoke test |
| Create | `e2e/04-tab-content.yaml` | Per-tab content verification |
| Modify | `package.json` | Add `e2e` and `e2e:flow` scripts |

---

## Prerequisites (manual, not automated)

```bash
brew install maestro        # install Maestro CLI
pnpm ios                    # build and install dev build on simulator
```

The iOS Simulator must be running before executing any flows.

---

## Package.json scripts

```json
"e2e": "maestro test e2e/",
"e2e:flow": "maestro test"
```

- `pnpm e2e` — run all flows
- `pnpm e2e:flow e2e/01-navigation.yaml` — run one flow

---

## Flow Designs

### `01-navigation.yaml`

Covers: root screen visible → enter playground → switch all 5 tabs in sequence.

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

### `02-language-toggle.yaml`

Covers: switch from EN to DA (verify Danish string appears), switch back to EN (verify English restored).

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

### `03-dark-mode.yaml`

Covers: toggle dark mode switch, verify the app remains stable (smoke test — Maestro cannot verify color values).

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

### `04-tab-content.yaml`

Covers: navigate to each tab and assert its expected card titles are rendered.

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

---

## Verification

```bash
pnpm e2e                                    # all 4 flows pass
pnpm e2e:flow e2e/01-navigation.yaml        # single flow
maestro studio                              # interactive flow recorder
```

Expected: 4 flows, all passing on iOS simulator with dev build running.
