import React, { useEffect, useState, useCallback } from "react";
import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { ViewStyle } from "react-native";

type GradientDirection =
  | "horizontal"
  | "vertical"
  | "diagonal"
  | "radial"
  | "random";
type GradientSpeed = "slow" | "medium" | "fast";

interface GradientProps {
  /**
   * Style for the canvas container
   */
  style?: ViewStyle;
  /**
   * Width of the gradient area
   * @default 256
   */
  width?: number;
  /**
   * Height of the gradient area
   * @default 256
   */
  height?: number;
  /**
   * Whether to automatically generate a new gradient on mount
   * @default true
   */
  autoGenerate?: boolean;
  /**
   * Array of possible colors to choose from for the gradient
   * If not provided, uses a predefined set of vibrant colors
   */
  colorPalette?: string[];
  /**
   * Number of colors in the gradient (2-4)
   * @default 2
   */
  colorCount?: number;
  /**
   * Direction of the gradient
   * @default 'random'
   */
  direction?: GradientDirection;
  /**
   * Animation speed (if using AnimatedGradient)
   * @default 'medium'
   */
  speed?: GradientSpeed;
  /**
   * Custom gradient colors (overrides colorPalette)
   */
  colors?: string[];
  /**
   * Blend mode for the gradient
   * @default 'normal'
   */
  blendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten";
  /**
   * Opacity of the gradient
   * @default 1
   */
  opacity?: number;
}

const DEFAULT_COLOR_PALETTE = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
  "#F7DC6F", // Light Yellow
  "#BB8FCE", // Light Purple
  "#85C1E9", // Light Blue
  "#F8C471", // Orange
  "#82E0AA", // Light Green
];

export const Gradient: React.FC<GradientProps> = ({
  style = { flex: 1 },
  width = 256,
  height = 256,
  autoGenerate = true,
  colorPalette = DEFAULT_COLOR_PALETTE,
  colorCount = 2,
  direction = "random",
  speed = "medium",
  colors,
  blendMode = "normal",
  opacity = 1,
}) => {
  const [gradientConfig, setGradientConfig] = useState({
    colors: DEFAULT_COLOR_PALETTE.slice(0, 2), // Start with default colors to avoid blank state
    start: vec(0, 0),
    end: vec(width, height),
  });

  const getDirectionVectors = useCallback(
    (dir: GradientDirection) => {
      switch (dir) {
        case "horizontal":
          return { start: vec(0, height / 2), end: vec(width, height / 2) };
        case "vertical":
          return { start: vec(width / 2, 0), end: vec(width / 2, height) };
        case "diagonal":
          return { start: vec(0, 0), end: vec(width, height) };
        case "radial":
          return {
            start: vec(width / 2, height / 2),
            end: vec(width, height / 2),
          };
        case "random":
        default:
          const startX = Math.random() * width;
          const startY = Math.random() * height;
          const endX = Math.random() * width;
          const endY = Math.random() * height;
          return { start: vec(startX, startY), end: vec(endX, endY) };
      }
    },
    [width, height]
  );

  const generateGradient = useCallback(() => {
    // Use custom colors if provided, otherwise use palette
    let selectedColors: string[];

    if (colors && colors.length >= 2) {
      selectedColors = colors;
    } else {
      // Ensure colorCount is between 2 and 4
      const safeColorCount = Math.max(2, Math.min(4, colorCount));
      // Select random colors from palette
      const shuffled = [...colorPalette].sort(() => 0.5 - Math.random());
      selectedColors = shuffled.slice(0, safeColorCount);
    }

    // Get direction vectors
    const vectors = getDirectionVectors(direction);

    setGradientConfig({
      colors: selectedColors,
      start: vectors.start,
      end: vectors.end,
    });
  }, [
    width,
    height,
    colorPalette,
    colorCount,
    colors,
    direction,
    getDirectionVectors,
  ]);

  useEffect(() => {
    if (autoGenerate) {
      generateGradient();
    }
  }, [autoGenerate, generateGradient]);

  // Debug logging for development
  useEffect(() => {
    console.log("Gradient config:", {
      colors: gradientConfig.colors,
      start: gradientConfig.start,
      end: gradientConfig.end,
      width,
      height,
      direction,
      blendMode,
      opacity,
    });
  }, [gradientConfig, width, height, direction, blendMode, opacity]);

  // Fallback if no colors are available
  if (gradientConfig.colors.length === 0) {
    return (
      <Canvas style={style}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={["#FF6B6B", "#4ECDC4"]}
          />
        </Rect>
      </Canvas>
    );
  }

  return (
    <Canvas style={[style, { opacity }]}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={gradientConfig.start}
          end={gradientConfig.end}
          colors={gradientConfig.colors}
        />
      </Rect>
    </Canvas>
  );
};

// Export regenerate function for external use
Gradient.displayName = "Gradient";

// Export the component with the old name for backward compatibility
export const RandomGradient = Gradient;
