import { useTheme } from "@/lib/theme/hooks/useTheme";
import {
  omitSpacingProps,
  SpacingProps,
  useGetSpacingStylesByComponentProps,
} from "@/lib/theme/utils/createSpacingProps";
import { spacing } from "@/lib/theme/variables/spacing";
import { useMemo } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

export type BoxProps = ViewProps &
  SpacingProps & {
    gutter?: keyof typeof spacing | boolean;
  };

export const Box = ({ children, gutter, style, ...rest }: BoxProps) => {
  const { theme } = useTheme();
  const viewProps = useMemo(() => omitSpacingProps(rest), [rest]);
  const spacingStyles = useGetSpacingStylesByComponentProps(rest);

  const gutterValue = useMemo(() => {
    if (gutter === true) {
      return theme.spacing.gutter;
    }

    if (!gutter) {
      return undefined;
    }

    return theme.spacing[gutter];
  }, [gutter, theme.spacing]);

  const styles: StyleProp<ViewStyle> = useMemo(
    () => [
      {
        paddingHorizontal: gutterValue,
      },
      spacingStyles,
      style,
    ],
    [gutterValue, spacingStyles, style]
  );

  return (
    <View {...viewProps} style={styles}>
      {children}
    </View>
  );
};
