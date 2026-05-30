import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import React, { useCallback, useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import { GradientProps, GradientSpeed } from './Gradient';

export type AnimationType = 'shift' | 'rotate' | 'breathe' | 'wave' | 'pulse';

export interface AnimatedGradientProps
  extends Omit<GradientProps, 'autoGenerate' | 'colorPalette' | 'colorCount' | 'blendMode'> {
  /**
   * Array of colors for the gradient (required for animated gradient)
   */
  colors: string[];
  /**
   * Type of animation
   * @default 'shift'
   */
  animationType?: AnimationType;
  /**
   * Whether to pause the animation
   * @default false
   */
  paused?: boolean;
}

const DEFAULT_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

const getAnimationDuration = (speed: GradientSpeed): number => {
  switch (speed) {
    case 'slow':
      return 8000;
    case 'medium':
      return 4000;
    case 'fast':
      return 2000;
    default:
      return 4000;
  }
};

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  style = { flex: 1 },
  width = 256,
  height = 256,
  colors = DEFAULT_COLORS,
  direction = 'diagonal',
  speed = 'medium',
  animationType = 'shift',
  opacity = 1,
  paused = false,
}) => {
  const getBaseDirectionVectors = useCallback((): {
    start: ReturnType<typeof vec>;
    end: ReturnType<typeof vec>;
  } => {
    switch (direction) {
      case 'horizontal':
        return { start: vec(0, height / 2), end: vec(width, height / 2) };
      case 'vertical':
        return { start: vec(width / 2, 0), end: vec(width / 2, height) };
      case 'diagonal':
        return { start: vec(0, 0), end: vec(width, height) };
      case 'radial':
        return {
          start: vec(width / 2, height / 2),
          end: vec(width, height / 2),
        };
      case 'random':
      default:
        return {
          start: vec(width * 0.2, height * 0.2),
          end: vec(width * 0.8, height * 0.8),
        };
    }
  }, [direction, width, height]);

  const [gradientVectors, setGradientVectors] = useState(() => {
    const baseVectors = getBaseDirectionVectors();
    return {
      start: baseVectors.start,
      end: baseVectors.end,
    };
  });

  const duration = getAnimationDuration(speed);

  // Animation loop to update gradient vectors
  useEffect(() => {
    if (paused) return;

    const startTime = Date.now();

    const interval = setInterval(() => {
      const baseVectors = getBaseDirectionVectors();
      const elapsed = Date.now() - startTime;
      const time = (elapsed / duration) * 2 * Math.PI; // Convert to radians for smooth sin/cos
      const progress = (Math.sin(time) + 1) / 2; // Oscillate between 0 and 1

      let startX = baseVectors.start.x;
      let startY = baseVectors.start.y;
      let endX = baseVectors.end.x;
      let endY = baseVectors.end.y;

      switch (animationType) {
        case 'shift':
          const offsetX = (progress - 0.5) * width * 0.2;
          const offsetY = (progress - 0.5) * height * 0.2;
          startX += offsetX;
          startY += offsetY;
          endX += offsetX;
          endY += offsetY;
          break;

        case 'wave':
          const waveOffsetX = Math.sin(time) * width * 0.05;
          const waveOffsetY = Math.cos(time * 0.7) * height * 0.05;
          startX += waveOffsetX;
          startY += waveOffsetY;
          endX -= waveOffsetX;
          endY -= waveOffsetY;
          break;

        case 'rotate':
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) * 0.4;
          const angle = time * 0.5; // Slower rotation

          startX = centerX + Math.cos(angle) * radius;
          startY = centerY + Math.sin(angle) * radius;
          endX = centerX - Math.cos(angle) * radius;
          endY = centerY - Math.sin(angle) * radius;
          break;

        case 'breathe':
        case 'pulse':
          const scale = 1 + Math.sin(time) * 0.1;
          const centerXBreathe = width / 2;
          const centerYBreathe = height / 2;

          startX = centerXBreathe + (baseVectors.start.x - centerXBreathe) * scale;
          startY = centerYBreathe + (baseVectors.start.y - centerYBreathe) * scale;
          endX = centerXBreathe + (baseVectors.end.x - centerXBreathe) * scale;
          endY = centerYBreathe + (baseVectors.end.y - centerYBreathe) * scale;
          break;
      }

      setGradientVectors({
        start: vec(startX, startY),
        end: vec(endX, endY),
      });
    }, 33); // ~30fps for smoother animation without excessive updates

    return () => clearInterval(interval);
  }, [paused, animationType, duration, width, height, getBaseDirectionVectors]);

  return (
    <Animated.View style={[style, { opacity }]}>
      <Canvas style={{ width, height }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient start={gradientVectors.start} end={gradientVectors.end} colors={colors} />
        </Rect>
      </Canvas>
    </Animated.View>
  );
};

AnimatedGradient.displayName = 'AnimatedGradient';
