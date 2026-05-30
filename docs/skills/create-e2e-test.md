---
name: create-e2e-test
description: Patterns and rules for writing Maestro e2e tests in this React Native boilerplate. Use when asked to add, write, or create e2e or Maestro tests.
---

# Creating E2E Tests (Maestro)

## Prerequisites

Before writing or running flows:
1. `maestro --version` — confirms CLI is installed
2. iOS Simulator is running with the dev build installed (`pnpm ios` if unsure)

## File placement

`e2e/XX-description.yaml` where XX is the next number in sequence.

Check what exists first: `ls e2e/`

---

## Every flow starts with this header

```yaml
appId: com.rasmuswoelk.react-native-boilerplate
---
- launchApp
```

## Navigating into the playground

Most flows begin here after `launchApp`:

```yaml
- tapOn: "Enter the playground"
- assertVisible: "Home"
```

---

## Element matching

### By visible text (most common)

Case-sensitive, must match the exact string rendered on screen. Use English unless the flow specifically tests the DA language:

```yaml
- tapOn: "Colors"
- assertVisible: "Base Colors"
```

### By accessibilityLabel

For elements with no visible text (icon buttons, switches):

```yaml
- tapOn:
    label: "Toggle dark mode"
- assertVisible:
    label: "Toggle dark mode"
```

### Asserting toggle state

```yaml
- assertVisible:
    label: "Toggle dark mode"
    checked: false
- tapOn:
    label: "Toggle dark mode"
- assertVisible:
    label: "Toggle dark mode"
    checked: true
```

### Scrolling to off-screen elements

Use `scrollUntilVisible` when content may be below the fold:

```yaml
- scrollUntilVisible:
    element:
      text: "Font weights"
```

---

## Full flow example

```yaml
appId: com.rasmuswoelk.react-native-boilerplate
---
- launchApp
- tapOn: "Enter the playground"
- assertVisible: "Welcome to the playground"
- tapOn: "Typography"
- assertVisible: "Variants"
- scrollUntilVisible:
    element:
      text: "Font weights"
```

---

## Run commands

```bash
pnpm e2e                              # all flows
pnpm e2e:flow e2e/05-my-flow.yaml    # single flow
maestro studio                        # interactive recorder (good for discovery)
```

---

## Rules

- Each flow launches a fresh app — flows are fully independent, never chain state between them
- Maestro waits up to 5 s per element — adequate for the 1.2 s FadeIn on the root screen
- Use `scrollUntilVisible` before asserting or tapping anything that might be below the fold
- Prefer visible text over `accessibilityLabel` unless the element has no text
