---
name: create-story
description: Patterns and rules for writing Storybook stories in this React Native boilerplate. Use when asked to add, write, or create stories for any component in the project.
---

# Creating Stories in This Project

Stories live next to their component in a `stories/` subfolder:

```
lib/components/ComponentName/
  ComponentName.tsx
  stories/
    ComponentName.stories.tsx
  __tests__/
    ComponentName.test.tsx
```

---

## Setup

Stories are only bundled when the env var is set:

```bash
EXPO_PUBLIC_STORYBOOK_ENABLED=true expo start
# or use the shorthand:
pnpm storybook
```

Navigate to `/storybook` in the running app to open the Storybook UI.

---

## Story file structure

Always use `@storybook/react-native` (not `@storybook/react`):

```tsx
import type { Meta, StoryObj } from '@storybook/react-native';
import { ComponentName } from '../ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
};

export default meta;

type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  render: () => <ComponentName />,
};
```

Use `const meta: Meta<typeof X> = { ... }` (type annotation) — not `satisfies`, which is web Storybook syntax and doesn't work here.

---

## `args` vs `render`

**Use `args` when** the story is a single component instance with tweakable props — this wires Controls automatically:

```tsx
export const Default: Story = {
  args: {
    variant: 'body',
    children: 'The quick brown fox',
  },
};
```

**Use `render` when** the story shows multiple instances, layout, or needs wrapper elements:

```tsx
export const Variants: Story = {
  render: () => (
    <Stack gap="sm">
      {(['h1', 'h2', 'body'] as const).map((v) => (
        <Typography key={v} variant={v}>
          {v}
        </Typography>
      ))}
    </Stack>
  ),
};
```

---

## `argTypes` — Controls panel

Use `argTypes` in `meta` to give the Controls panel dropdown menus for union-typed props:

```tsx
const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'body', 'caption', 'label'],
    },
    fontWeight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'bold', 'black'],
    },
  },
};
```

---

## Theme-aware values

Components use Unistyles, so pass theme token strings — not raw numbers:

```tsx
// spacing tokens: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' ... '7xl' | 'gutter'
<Box p="md" />

// color paths: 'background' | 'brand.100' | 'gray.200' | 'white' | ...
<Box backgroundColor="brand.100" />

// border radius: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
<Box borderRadius="md" />
```

The global decorator in `.rnstorybook/preview.tsx` imports `@/src/unistyles` and `@/src/i18n`, so themes and translations are available in every story without extra setup.

---

## Glob coverage

`.rnstorybook/main.ts` discovers stories via:

```
../lib/**/*.stories.?(ts|tsx)
../app/**/*.stories.?(ts|tsx)
```

Any file matching `*.stories.tsx` anywhere under `lib/` or `app/` is picked up automatically.

---

## What to story

Cover:
- **Default** — the component with its most common props
- **Variants** — all meaningful visual states (size, color, weight, etc.)
- **Edge cases** — empty content, long strings, deeply nested usage

Skip:
- Stories that duplicate an existing story with one prop difference — use `args` in meta defaults + Controls instead
- Stories that require mocking internal business logic — those belong in unit tests
