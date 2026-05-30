import React, { useEffect } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  AnimatedStyle,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export interface FadeInProps extends Omit<ViewProps, 'style'> {
  /**
   * Children to be animated
   */
  children: React.ReactNode;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  duration?: number;

  /**
   * Delay before animation starts in milliseconds
   * @default 0
   */
  delay?: number;

  /**
   * Initial translateY value in pixels (negative for up, positive for down)
   * @default 20
   */
  translateY?: number;

  /**
   * Animation type for translateY movement
   * @default "timing"
   */
  animationType?: 'timing' | 'spring';

  /**
   * Spring configuration (only used when animationType is "spring")
   */
  springConfig?: {
    damping?: number;
    stiffness?: number;
  };

  /**
   * Timing configuration (only used when animationType is "timing")
   */
  timingConfig?: {
    easing?: (value: number) => number;
  };

  /**
   * Whether to trigger the animation automatically on mount
   * @default true
   */
  autoPlay?: boolean;

  /**
   * Trigger value to restart animation (useful for manual control)
   */
  trigger?: boolean | number;

  /**
   * Callback when animation completes
   */
  onAnimationComplete?: () => void;

  /**
   * Custom style to apply to the animated view
   */
  style?: AnimatedStyle<ViewProps['style']>;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 300,
  delay = 0,
  translateY = 20,
  animationType = 'timing',
  springConfig = {
    damping: 15,
    stiffness: 150,
  },
  timingConfig = {
    easing: Easing.out(Easing.cubic),
  },
  autoPlay = true,
  trigger,
  onAnimationComplete,
  style,
  ...rest
}) => {
  const opacity = useSharedValue(0);
  const translateYValue = useSharedValue(translateY);

  const startAnimation = React.useCallback(() => {
    const animationCallback = onAnimationComplete
      ? () => {
          'worklet';
          runOnJS(onAnimationComplete)();
        }
      : undefined;

    // Opacity animation (always uses timing)
    opacity.value = withDelay(delay, withTiming(1, { duration }, animationCallback));

    // TranslateY animation
    if (animationType === 'spring') {
      translateYValue.value = withDelay(delay, withSpring(0, springConfig));
    } else {
      translateYValue.value = withDelay(
        delay,
        withTiming(0, {
          duration,
          easing: timingConfig.easing,
        }),
      );
    }
  }, [
    delay,
    duration,
    animationType,
    springConfig,
    timingConfig,
    onAnimationComplete,
    opacity,
    translateYValue,
  ]);

  const resetAnimation = React.useCallback(() => {
    opacity.value = 0;
    translateYValue.value = translateY;
  }, [opacity, translateYValue, translateY]);

  // Auto-play animation on mount
  useEffect(() => {
    if (autoPlay) {
      startAnimation();
    }
  }, [autoPlay, startAnimation]);

  // Trigger-based animation
  useEffect(() => {
    if (trigger !== undefined && trigger !== false && trigger !== 0) {
      resetAnimation();
      // Small delay to ensure reset completes before starting
      setTimeout(() => {
        startAnimation();
      }, 16); // ~1 frame at 60fps
    }
  }, [trigger, resetAnimation, startAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateYValue.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]} {...rest}>
      {children}
    </Animated.View>
  );
};
