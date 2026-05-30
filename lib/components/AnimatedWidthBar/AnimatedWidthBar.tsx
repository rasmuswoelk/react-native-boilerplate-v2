import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export interface AnimatedWidthBarProps {
  width: number;
  height?: number;
  backgroundColor: string;
  borderRadius: number;
  delay?: number;
  duration?: number;
  springConfig?: {
    damping?: number;
    stiffness?: number;
  };
}

export const AnimatedWidthBar = ({
  width,
  height = 20,
  backgroundColor,
  borderRadius,
  delay = 0,
  duration = 300,
  springConfig = { damping: 20, stiffness: 100 },
}: AnimatedWidthBarProps) => {
  const animatedWidth = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration }));
    animatedWidth.value = withDelay(
      delay + 100,
      withSpring(width, {
        damping: springConfig.damping,
        stiffness: springConfig.stiffness,
      }),
    );
  }, [
    width,
    delay,
    duration,
    springConfig.damping,
    springConfig.stiffness,
    animatedWidth,
    opacity,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: animatedWidth.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          height,
          backgroundColor,
          borderRadius,
        },
        animatedStyle,
      ]}
    />
  );
};
