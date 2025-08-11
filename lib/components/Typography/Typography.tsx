import { useTheme } from "@/lib/theme/hooks/useTheme";
import {
  omitSpacingProps,
  SpacingProps,
  useGetSpacingStylesByComponentProps,
} from "@/lib/theme/utils/createSpacingProps";
import { typography } from "@/lib/theme/variables/typography";
import { useMemo } from "react";
import { Text, TextProps, TextStyle } from "react-native";

export type TypographyProps = TextProps &
  SpacingProps & {
    variant?: keyof typeof typography.variant;
    fontWeight?: keyof typeof typography.fontWeight;
  };

export const Typography = ({
  variant = "body",
  fontWeight,
  style,
  ...props
}: TypographyProps) => {
  const { theme } = useTheme();
  const textProps = useMemo(() => omitSpacingProps(props), [props]);
  const spacingStyles = useGetSpacingStylesByComponentProps(props) as TextStyle;

  const styles = useMemo(
    () =>
      [
        { color: theme.colors.figure },
        variant && theme.typography.variant[variant],
        fontWeight && { fontWeight: theme.typography.fontWeight[fontWeight] },
        spacingStyles,
        style,
      ].filter(Boolean),
    [variant, fontWeight, style]
  );

  return <Text {...textProps} style={styles} />;
};
