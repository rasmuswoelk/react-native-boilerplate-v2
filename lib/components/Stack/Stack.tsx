import { useTheme } from "@/lib/theme/hooks/useTheme";
import {
  omitSpacingProps,
  SpacingProps,
  useGetSpacingStylesByComponentProps,
} from "@/lib/theme/utils/createSpacingProps";
import { SpacingKeyType } from "@/lib/theme/variables/spacing";
import { useMemo } from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

export type StackProps = ViewProps &
  SpacingProps & {
    direction?: "vertical" | "horizontal";
    gap?: SpacingKeyType;
  };

export const Stack = ({
  children,
  direction = "vertical",
  gap = "md",
  style,
  ...rest
}: StackProps) => {
  const { theme } = useTheme();
  const viewProps = useMemo(() => omitSpacingProps(rest), [rest]);
  const spacingStyles = useGetSpacingStylesByComponentProps(rest);

  const gapValue = useMemo(() => {
    if (!gap) {
      return undefined;
    }
    return theme.spacing[gap];
  }, [gap, theme.spacing]);

  const styles: StyleProp<ViewStyle> = useMemo(
    () => [
      {
        flexDirection: direction === "horizontal" ? "row" : "column",
        gap: gapValue,
      },
      spacingStyles,
      style,
    ],
    [direction, gapValue, spacingStyles, style]
  );

  return (
    <View {...viewProps} style={styles}>
      {children}
    </View>
  );
};
