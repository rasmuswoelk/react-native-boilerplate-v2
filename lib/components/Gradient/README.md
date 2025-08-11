# Gradient Components

This directory contains gradient components built with React Native Skia for high-performance rendering.

## Components

### `Gradient`

A customizable static gradient component (formerly `RandomGradient`).

**Props:**

- `style?: ViewStyle` - Style for the canvas container
- `width?: number` - Width of the gradient area (default: 256)
- `height?: number` - Height of the gradient area (default: 256)
- `autoGenerate?: boolean` - Whether to automatically generate a new gradient on mount (default: true)
- `colorPalette?: string[]` - Array of possible colors to choose from
- `colorCount?: number` - Number of colors in the gradient 2-4 (default: 2)
- `direction?: GradientDirection` - Direction of the gradient (default: 'random')
- `colors?: string[]` - Custom gradient colors (overrides colorPalette)
- `blendMode?: string` - Blend mode for the gradient (default: 'normal')
- `opacity?: number` - Opacity of the gradient (default: 1)

**Gradient Directions:**

- `horizontal` - Left to right
- `vertical` - Top to bottom
- `diagonal` - Top-left to bottom-right
- `radial` - From center outward
- `random` - Random direction

**Example:**

```tsx
<Gradient
  width={300}
  height={200}
  colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
  direction="diagonal"
  opacity={0.8}
/>
```

### `AnimatedGradient`

An animated gradient component with subtle motion effects using react-native-reanimated.

**Props:**

- All props from `Gradient` except `autoGenerate` and `colorPalette`
- `colors: string[]` - Required array of colors for the gradient
- `speed?: GradientSpeed` - Animation speed: 'slow' | 'medium' | 'fast' (default: 'medium')
- `animationType?: AnimationType` - Type of animation (default: 'shift')
- `paused?: boolean` - Whether to pause the animation (default: false)

**Animation Types:**

- `shift` - Subtle shifting of gradient positions
- `rotate` - Rotating gradient around center
- `breathe` - Gentle breathing/pulsing effect
- `wave` - Wave-like motion
- `pulse` - Pulsing scale effect

**Animation Speeds:**

- `slow` - 8 second duration
- `medium` - 4 second duration
- `fast` - 2 second duration

**Example:**

```tsx
<AnimatedGradient
  width={400}
  height={300}
  colors={["#667eea", "#764ba2", "#f093fb"]}
  direction="diagonal"
  animationType="shift"
  speed="slow"
  opacity={0.9}
/>
```

## Usage Examples

### Static Background Gradient

```tsx
import { Gradient } from "@/lib/components/Gradient";

<Gradient
  width={screenWidth}
  height={screenHeight}
  colors={["#667eea", "#764ba2"]}
  direction="vertical"
  style={{ position: "absolute", inset: 0 }}
/>;
```

### Animated Background

```tsx
import { AnimatedGradient } from "@/lib/components/Gradient";

<AnimatedGradient
  width={screenWidth}
  height={screenHeight}
  colors={["#ff6b6b", "#4ecdc4", "#45b7d1"]}
  direction="diagonal"
  animationType="shift"
  speed="slow"
  style={{ position: "absolute", inset: 0 }}
/>;
```

### Card with Gradient Background

```tsx
<View style={{ borderRadius: 12, overflow: "hidden" }}>
  <AnimatedGradient
    width={300}
    height={200}
    colors={["#43e97b", "#38f9d7"]}
    direction="horizontal"
    animationType="breathe"
    speed="medium"
  />
  <View style={{ position: "absolute", inset: 0, padding: 16 }}>
    {/* Card content */}
  </View>
</View>
```

## Performance Notes

- Components use React Native Skia for optimal performance
- Animations are handled by react-native-reanimated on the UI thread
- Consider using `paused` prop to pause animations when components are off-screen
- For full-screen gradients, match width/height to screen dimensions

## Migration from RandomGradient

The `RandomGradient` component has been renamed to `Gradient` with additional customization options. The old name is still exported for backward compatibility:

```tsx
// Old way (still works)
import { RandomGradient } from "@/lib/components/Gradient";

// New way
import { Gradient } from "@/lib/components/Gradient";
```
