---
name: create-shared-component
description: Rules for deciding when a component belongs in lib/components/ and what every shared component must include. Use when adding a new component or considering whether to extract an existing one.
---

# Creating Shared Components

A component belongs in `lib/components/` when it is (or will be) used in more than one feature, **or** when it is purely presentational with no feature-specific business logic.

Keep a component inside its feature folder until one of these is true:
- It's referenced from a second feature or screen
- It wraps a theme token (spacing, color, typography) in a reusable way
- A new component is clearly generic from the start (a Button, a Badge, an Avatar)

---

## Directory structure

Every shared component follows this layout:

```
lib/components/ComponentName/
  ComponentName.tsx        ← implementation
  index.ts                 ← re-export only
  __tests__/
    ComponentName.test.tsx ← unit tests
  stories/
    ComponentName.stories.tsx ← Storybook story
```

`index.ts` re-exports from the implementation file and nothing else:

```ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

---

## Required for every shared component

| Artifact | Why |
|---|---|
| `ComponentName.tsx` | The component itself with typed props |
| `index.ts` | Clean import path (`@/lib/components/ComponentName`) |
| `__tests__/ComponentName.test.tsx` | Proves it works; catches regressions |
| `stories/ComponentName.stories.tsx` | Makes it discoverable; the catalogue |

None of these are optional. A component without tests or a story is invisible to the rest of the team and will be recreated.

This requirement applies to shared components in `lib/components/`. It does **not** apply to feature screens under `src/features/<feature>/screens/`; screens should not get tests unless the user explicitly asks for them. For screen creation, follow `docs/skills/create-screen.md`.

---

## Component file conventions

- Export a named `type ComponentNameProps` (not inline) so callers can extend it
- Accept and forward `style` for layout overrides at the call site
- Accept `testID` via `ViewProps` or `TextProps` so tests can target the root element
- Use theme tokens, never hardcoded colours or pixel values
- Use Unistyles for theming. Do not import `StyleSheet` from `react-native` for themed components.
- For user-visible text, prefer `Typography` from `@/lib/components/Typography` instead of React Native `Text`.

```tsx
import type { ViewProps } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

export type BadgeProps = ViewProps & {
  label: string;
  variant?: 'success' | 'warning' | 'error';
};

export const Badge = ({ label, variant = 'success', style, ...props }: BadgeProps) => {
  const { theme } = useUnistyles();
  // ...
};
```

---

## Imports

Always import from the index, never from the implementation file directly:

```ts
// ✅
import { Badge } from '@/lib/components/Badge';

// ❌
import { Badge } from '@/lib/components/Badge/Badge';
```

---

## Tests — what to cover

See `docs/skills/create-test.md` for full testing patterns. Minimum for a shared component:

- Renders without crashing
- Renders children / required content
- Each meaningful prop variant produces the expected style or output
- Snapshot for the default state

---

## Stories — what to include

See `docs/skills/create-story.md` for full story patterns. Minimum:

- `Default` — most common usage, preferably with `args` so Controls work
- One story per meaningful visual variant

---

## Checklist before opening a PR

- [ ] `lib/components/ComponentName/` directory created
- [ ] `index.ts` exports component and props type
- [ ] Props typed with a named exported type
- [ ] `testID` reachable on root element
- [ ] Tests written and passing (`pnpm test:run lib/components/ComponentName`)
- [ ] Story added and visible in Storybook (`pnpm storybook`)
- [ ] `pnpm lint` clean
- [ ] `pnpm typecheck` clean
