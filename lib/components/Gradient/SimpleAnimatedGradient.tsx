import React, { useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";

interface SimpleAnimatedGradientProps {
  style?: ViewStyle;
  width?: number;
  height?: number;
  colors: string[];
}

export const SimpleAnimatedGradient: React.FC<SimpleAnimatedGradientProps> = ({
  style = { flex: 1 },
  width = 256,
  height = 256,
  colors,
}) => {
  const [animationValue, setAnimationValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationValue((prev) => (prev + 0.02) % (Math.PI * 2));
    }, 50); // 20fps for smooth animation

    return () => clearInterval(interval);
  }, []);

  // Simple side-to-side movement
  const offset = Math.sin(animationValue) * 50;
  const startX = width / 4 + offset;
  const endX = (3 * width) / 4 + offset;

  return (
    <Canvas style={style}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(startX, 0)}
          end={vec(endX, height)}
          colors={colors}
        />
      </Rect>
    </Canvas>
  );
};

SimpleAnimatedGradient.displayName = "SimpleAnimatedGradient";
