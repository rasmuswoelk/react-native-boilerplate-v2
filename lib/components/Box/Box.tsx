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
import {
  StyleProp,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Text } from "@/lib/components/Text";

type BoxBaseProps = {
  color?: ColorPath;
  backgroundColor?: ColorPath;
  borderRadius?: BorderRadiusPath;
};

type BoxAsViewProps = ViewProps &
  SpacingProps &
  BoxBaseProps & {
    as?: typeof View;
    style?: StyleProp<ViewStyle>;
  };

type BoxAsTextProps = TextProps &
  SpacingProps &
  BoxBaseProps & {
    as: typeof Text;
    style?: StyleProp<TextStyle>;
  };

export type BoxProps = BoxAsViewProps | BoxAsTextProps;

export const Box = (props: BoxProps) => {
  const {
    children,
    color,
    backgroundColor,
    borderRadius,
    style,
    as: Component = View,
    ...rest
  } = props;

  const { theme } = useTheme();
  const componentProps = useMemo(
    () =>
      omit(rest, [
        ...spacingStyleProperties,
        "color",
        "backgroundColor",
        "borderRadius",
        "as",
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

  const styles = useMemo(
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

  if (Component === Text) {
    return (
      <Text
        {...(componentProps as TextProps)}
        style={styles as StyleProp<TextStyle>}
      >
        {children}
      </Text>
    );
  }

  return (
    <View
      {...(componentProps as ViewProps)}
      style={styles as StyleProp<ViewStyle>}
    >
      {children}
    </View>
  );
};
