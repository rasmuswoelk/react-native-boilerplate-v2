# Localization Design — expo-localization + i18next

## Context

The boilerplate has no localization infrastructure. All strings are hardcoded in English. This adds a complete i18n setup (English + Danish) using `expo-localization` for locale detection and `i18next` / `react-i18next` for translation. A runtime language toggle is added to the playground header so developers can demo and test translations without changing their device locale.

---

## Architecture

### Separation of concerns

| Layer | Path | Responsibility |
|---|---|---|
| Generic helpers | `lib/i18n/` | i18next factory; knows nothing about specific languages or keys |
| App translations | `src/translations/` | JSON files per language; TypeScript types |
| App initializer | `src/i18n/` | Calls the factory with resources; bootstraps i18next once |
| Root layout | `app/_layout.tsx` | Imports `src/i18n` as a side effect |
| Playground header | `app/playground/_layout.tsx` | Language toggle UI alongside dark mode switch |
| Playground screens | `lib/screens/playground/screens/` | Use `useTranslation` from react-i18next |

---

## New files

### `lib/i18n/createI18n.ts`

Generic factory. Accepts a `Resource` object (language code → namespace → keys) and an optional `fallbackLng`. Reads the device locale from `expo-localization` and initializes i18next. Guards against double-init via `i18next.isInitialized`.

```ts
export const createI18n = (resources: Resource, fallbackLng = 'en') => i18next
```

### `lib/i18n/index.ts`

Re-exports `createI18n` and re-exports `useTranslation` from `react-i18next` so consumers only need one import path.

### `src/translations/en.json` + `src/translations/da.json`

Keys organized by feature namespace. Both files must share an identical key shape.

```
common.back / save / cancel / loading / darkMode / language
playground.tabs.home / typography / spacing / colors / gradients
playground.home.title / greeting ({{name}}) / itemCount (plural)
playground.colors.baseColors / palette ({{name}})
playground.typography.variants / fontSizes / fontWeights / paragraph
playground.spacing.values / marginExamples / paddingExamples
```

`greeting` and `itemCount` exist specifically to demonstrate interpolation and pluralization — they appear in `IndexScreen`.

### `src/translations/index.ts`

Imports both JSON files and exports a typed `resources` object (`{ en: { translation: en }, da: { translation: da } }`).

### `src/i18n/index.ts`

Calls `createI18n(resources)`. Named export `i18n`, also default export. This is the single init point.

### `src/i18n/types.d.ts`

i18next module augmentation so `t('...')` is fully typed against `en.json`:

```ts
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof en };
  }
}
```

---

## Modified files

### `app/_layout.tsx`

Add `import '@/src/i18n'` as a side-effect import (same pattern as `import '@/src/unistyles'`).

### `app/playground/_layout.tsx`

Add a `LanguageSwitcher` component alongside `DarkModeSwitcher`. The switcher displays the active language as a pressable chip ("EN" / "DA") and calls `i18n.changeLanguage()` to toggle. Both controls sit in the existing header bar, `DarkModeSwitcher` on the right, `LanguageSwitcher` on the left.

### `app/playground/(tabs)/_layout.tsx`

Add `useTranslation` and replace the hardcoded tab label strings with `t('playground.tabs.*')`.

### Playground screens (4 files)

Replace hardcoded strings with `t()` calls. `IndexScreen` also adds a translated greeting and item count to demonstrate interpolation/pluralization.

---

## Translation examples (illustrative)

**en.json (excerpt)**
```json
{
  "common": { "darkMode": "Dark mode", "language": "Language" },
  "playground": {
    "home": {
      "title": "Welcome to the playground",
      "greeting": "Hello, {{name}}!",
      "itemCount_one": "{{count}} item",
      "itemCount_other": "{{count}} items"
    },
    "colors": { "baseColors": "Base Colors", "palette": "{{name}} Palette" }
  }
}
```

**da.json (excerpt)**
```json
{
  "common": { "darkMode": "Mørk tilstand", "language": "Sprog" },
  "playground": {
    "home": {
      "title": "Velkommen til legepladsen",
      "greeting": "Hej, {{name}}!",
      "itemCount_one": "{{count}} element",
      "itemCount_other": "{{count}} elementer"
    },
    "colors": { "baseColors": "Basisfarver", "palette": "{{name}} Palet" }
  }
}
```

---

## Packages

```
expo-localization   device locale detection
i18next             core translation engine
react-i18next       React hooks + Provider
```

---

## Verification

1. Run `npx expo start` and open the playground.
2. Toggle language — all translated strings should switch instantly.
3. Toggle back to EN — strings revert.
4. Check dark mode switch still works alongside language toggle.
5. Change device locale to Danish and cold-launch — app should start in Danish.
6. TypeScript: `t('nonexistent.key')` should show a type error.
