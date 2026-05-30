import React from 'react'
import { vi } from 'vitest'

const makeNativeComponent = (name: string) => {
  const Component = React.forwardRef<any, any>(({ children, ...props }, ref) =>
    React.createElement(name, { ...props, ref }, children)
  )
  Component.displayName = name
  return Component
}

export const View = makeNativeComponent('View')
export const Text = makeNativeComponent('Text')
export const ScrollView = makeNativeComponent('ScrollView')
export const Pressable = makeNativeComponent('Pressable')
export const Switch = makeNativeComponent('Switch')
export const TouchableOpacity = makeNativeComponent('TouchableOpacity')
export const Image = makeNativeComponent('Image')

export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T): T => styles,
  hairlineWidth: 0.5,
  flatten: (style: any) => style,
}

export const PixelRatio = {
  roundToNearestPixel: (value: number) => Math.round(value),
  get: () => 2,
  getFontScale: () => 1,
}

export const Platform = {
  OS: 'ios' as const,
  select: (obj: Record<string, any>) => obj.ios ?? obj.default,
}

export const Animated = {
  View: makeNativeComponent('Animated.View'),
  Text: makeNativeComponent('Animated.Text'),
  Value: vi.fn().mockImplementation(() => ({
    setValue: vi.fn(),
    interpolate: vi.fn(),
  })),
  timing: vi.fn(() => ({ start: vi.fn() })),
  spring: vi.fn(() => ({ start: vi.fn() })),
  createAnimatedComponent: (Component: any) => Component,
}

export const useColorScheme = vi.fn(() => 'light')
export const useWindowDimensions = vi.fn(() => ({ width: 375, height: 812 }))
