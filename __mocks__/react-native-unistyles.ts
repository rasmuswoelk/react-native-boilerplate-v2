import { vi } from 'vitest'
import { mockTheme } from '../test/mocks/theme'

export const StyleSheet = {
  create: (stylesOrFn: any) =>
    typeof stylesOrFn === 'function' ? stylesOrFn(mockTheme) : stylesOrFn,
  hairlineWidth: 0.5,
}

export const useUnistyles = () => ({
  theme: mockTheme,
  rt: { themeName: 'light' as const },
})

export const UnistylesRuntime = {
  setTheme: vi.fn(),
  setAdaptiveThemes: vi.fn(),
  themeName: 'light',
}
