import React from 'react';

const makeNativeComponent = (name: string) => {
  const Component = React.forwardRef<any, any>(({ children, ...props }, ref) =>
    React.createElement(name, { ...props, ref }, children),
  );
  Component.displayName = name;
  return Component;
};

export const View = makeNativeComponent('View');
export const Text = makeNativeComponent('Text');
export const ScrollView = makeNativeComponent('ScrollView');
export const Pressable = makeNativeComponent('Pressable');
export const Switch = makeNativeComponent('Switch');
export const TouchableOpacity = makeNativeComponent('TouchableOpacity');
export const Image = makeNativeComponent('Image');

const flattenStyle = (style: any): Record<string, any> | null => {
  if (style == null) return null;
  if (Array.isArray(style)) {
    return style.reduce(
      (acc: Record<string, any>, s: any) => ({
        ...acc,
        ...(flattenStyle(s) ?? {}),
      }),
      {},
    );
  }
  return style;
};

export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T): T => styles,
  hairlineWidth: 0.5,
  flatten: flattenStyle,
};

export const PixelRatio = {
  roundToNearestPixel: (value: number) => Math.round(value),
  get: () => 2,
  getFontScale: () => 1,
};

export const Platform = {
  OS: 'ios' as const,
  select: (obj: Record<string, any>) => obj.ios ?? obj.default,
};

export const Animated = {
  View: makeNativeComponent('Animated.View'),
  Text: makeNativeComponent('Animated.Text'),
  Value: jest.fn().mockImplementation(() => ({
    setValue: jest.fn(),
    interpolate: jest.fn(),
  })),
  timing: jest.fn(() => ({ start: jest.fn() })),
  spring: jest.fn(() => ({ start: jest.fn() })),
  createAnimatedComponent: (Component: any) => Component,
};

export const useColorScheme = jest.fn(() => 'light');
export const useWindowDimensions = jest.fn(() => ({ width: 375, height: 812 }));

export const TurboModuleRegistry = {
  get: () => null,
  getEnforcing: (name: string) => {
    throw new Error(`TurboModule '${name}' could not be found`);
  },
};
