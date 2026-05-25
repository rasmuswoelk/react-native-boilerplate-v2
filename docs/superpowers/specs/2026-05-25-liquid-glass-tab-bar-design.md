# iOS Liquid Glass Tab Bar — Playground

**Date:** 2026-05-25  
**Scope:** Playground tab layout only (`app/playground/(tabs)/_layout.tsx`)

## Summary

Update the playground's bottom tab bar to use the iOS liquid glass material on iOS, with an opaque fallback on Android/web. Uses the platform-split file pattern already established in `app-example/components/ui/`.

## Files

### New: `app/playground/components/TabBarBackground.ios.tsx`
Renders a `BlurView` from `expo-blur` with:
- `tint="systemChromeMaterial"` — system chrome material that automatically adapts to the iOS theme and matches the native liquid glass tab bar appearance on iOS 26
- `intensity={100}`
- `style={StyleSheet.absoluteFill}` — fills the tab bar background

### New: `app/playground/components/TabBarBackground.tsx`
Shim for Android and web. Exports `undefined` so React Navigation falls back to the default opaque tab bar. No visual change on non-iOS platforms.

### Modified: `app/playground/(tabs)/_layout.tsx`
- Import `TabBarBackground` from `../components/TabBarBackground`
- Import `Platform` from `react-native`
- Add `tabBarBackground: TabBarBackground` to `screenOptions` (passed as a component reference; React Navigation renders it, and `undefined` on Android is a no-op)
- Add `tabBarStyle: Platform.select({ ios: { position: 'absolute' }, default: {} })` — on iOS, `position: 'absolute'` lets content scroll behind the tab bar and reveals the blur; on Android/web, no change

## Data Flow

React Navigation renders tab bar → calls `tabBarBackground` for the backdrop → on iOS, `BlurView` draws behind the tab icons using the system chrome material → on Android/web, `tabBarBackground` is `undefined` and nothing changes.

## Out of Scope

- Root app layout (`app/_layout.tsx`) — unchanged
- `AppLayout` — unchanged
- Any non-playground screens — unchanged
- Custom glass styling (gradients, borders, floating shape) — not in this iteration
