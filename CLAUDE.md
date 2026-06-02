# Project conventions

## Folder structure

```
lib/        Generic, reusable code — no app-specific logic
src/        App-specific code
app/        Expo Router screens and navigation
```

### lib/ — reusable library

Code in `lib/` must be portable to any project built from this boilerplate without modification:

- **components/** — Primitive UI components (Box, Stack, Card, Typography, etc.)
- **layouts/** — Generic layout shells (BaseLayout, PlaygroundLayout)
- **screens/playground/** — Design-system playground screens
- **theme/variables/** — Primitive design tokens: spacing, typography, border-radius, and generic color scales (white/black + named palettes). No semantic or brand colors.
- **theme/utils/** — Theme utility functions
- **stores/** — Generic storage adapters (e.g. `zustandStorage` MMKV adapter)
- **i18n/** — `createI18n` factory

No barrel `index.ts` files at the `lib/` root.

### src/ — app code

Everything specific to this application:

- **theme/theme.ts** — Unistyles configuration: brand palette, semantic colors (ground, figure, background, text, etc.), light/dark themes
- **theme/fonts.ts** — Font loading and font-family mapping
- **i18n/index.ts** — Instantiated i18n (calls `createI18n` with app translations)
- **translations/** — Translation JSON files
- **layouts/AppLayout/** — Root layout (loads fonts, wraps app)
- **stores/** — App-specific zustand stores (usePreferencesStore, useCounterStore, etc.)
- **assets/** — Fonts, images, animations

## Theme color convention

Generic primitive color scales (red, green, blue, orange, gray, white, black) live in
`lib/theme/variables/colors.ts` and are imported into `src/unistyles.ts`.

App-specific values defined in `src/unistyles.ts`:
- `brand` — the project's brand color palette
- Semantic colors — `ground`, `figure`, `background`, `text`, `primary`, `secondary`, `border`
  (with separate light/dark values)

## Path aliases

`@/` maps to the project root. Use `@/lib/...` and `@/src/...` for cross-folder imports.
