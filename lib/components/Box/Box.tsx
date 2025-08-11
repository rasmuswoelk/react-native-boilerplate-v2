import { useTheme } from "@/lib/theme/hooks/useTheme";
import {
  BorderRadiusPath,
  ColorPath,
  getBorderRadiusFromPath,
  getColorFromPath,
} from "@/lib/theme/utils/colorTypes";
import {
  SpacingProps,
  spacingStyleProperties,
  useGetSpacingStylesByComponentProps,
} from "@/lib/theme/utils/createSpacingProps";
import omit from "lodash/omit";
import { useMemo } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

export type BoxProps = ViewProps &
  SpacingProps & {
    color?: ColorPath;
    backgroundColor?: ColorPath;
    borderRadius?: BorderRadiusPath;
  };

export const Box = ({
  children,
  color,
  backgroundColor,
  borderRadius,
  style,
  ...rest
}: BoxProps) => {
  const { theme } = useTheme();
  const viewProps = useMemo(
    () =>
      omit(rest, [
        ...spacingStyleProperties,
        "color",
        "backgroundColor",
        "borderRadius",
      ]),
    [rest]
  );
  const spacingStyles = useGetSpacingStylesByComponentProps(rest);

  const resolvedColor = useMemo(() => {
    return color ? getColorFromPath(theme.colors, color) : undefined;
  }, [color, theme.colors]);

  const resolvedBackgroundColor = useMemo(() => {
    return backgroundColor
      ? getColorFromPath(theme.colors, backgroundColor)
      : undefined;
  }, [backgroundColor, theme.colors]);

  const resolvedBorderRadius = useMemo(() => {
    return borderRadius
      ? getBorderRadiusFromPath(theme.borderRadius, borderRadius)
      : undefined;
  }, [borderRadius, theme.borderRadius]);

  console.log(resolvedColor, resolvedBackgroundColor);

  const styles: StyleProp<ViewStyle> = useMemo(
    () => [
      {
        ...(resolvedColor && { color: resolvedColor }),
        ...(resolvedBackgroundColor && {
          backgroundColor: resolvedBackgroundColor,
        }),
        ...(resolvedBorderRadius && { borderRadius: resolvedBorderRadius }),
      },
      spacingStyles,
      style,
    ],
    [
      resolvedColor,
      resolvedBackgroundColor,
      resolvedBorderRadius,
      spacingStyles,
      style,
    ]
  );

  return (
    <View {...viewProps} style={styles}>
      {children}
    </View>
  );
};
