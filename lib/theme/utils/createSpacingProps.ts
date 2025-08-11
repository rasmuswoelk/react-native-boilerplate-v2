import omit from "lodash/omit";
import pick from "lodash/pick";
import { useMemo } from "react";
import { ViewStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { SpacingKeyType, SpacingType } from "../variables/spacing";

// Define all possible spacing style properties
const spacingStyleProperties = [
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginHorizontal",
  "marginVertical",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingHorizontal",
  "paddingVertical",
];

type SpacingStyleProperty = (typeof spacingStyleProperties)[number];

// Create spacing props type that allows all spacing properties with spacing keys as values
export type SpacingProps = {
  margin?: SpacingKeyType;
  marginTop?: SpacingKeyType;
  marginRight?: SpacingKeyType;
  marginBottom?: SpacingKeyType;
  marginLeft?: SpacingKeyType;
  marginHorizontal?: SpacingKeyType;
  marginVertical?: SpacingKeyType;
  padding?: SpacingKeyType;
  paddingTop?: SpacingKeyType;
  paddingRight?: SpacingKeyType;
  paddingBottom?: SpacingKeyType;
  paddingLeft?: SpacingKeyType;
  paddingHorizontal?: SpacingKeyType;
  paddingVertical?: SpacingKeyType;
};

// Utility function to create spacing styles from spacing props
export const createSpacingStyles = (
  props: SpacingProps,
  spacing: SpacingType
): Partial<ViewStyle> => {
  const styles: Partial<ViewStyle> = {};

  Object.entries(props).forEach(([property, spacingKey]) => {
    if (spacingKey && spacingKey in spacing) {
      const styleProperty = property as SpacingStyleProperty;
      (styles as any)[styleProperty] = spacing[spacingKey];
    }
  });

  return styles;
};

export const getSpacingPropertiesByComponentProps = (
  props: Record<string, unknown>
): SpacingProps => {
  return pick(props, spacingStyleProperties) as SpacingProps;
};

export const omitSpacingProps = (
  props: Record<string, unknown>
): Record<string, unknown> => {
  return omit(props, spacingStyleProperties);
};

export const useGetSpacingStylesByComponentProps = (
  props: Record<string, unknown>
): Partial<ViewStyle> => {
  const { theme } = useTheme();
  return useMemo(() => {
    const spacingProps = getSpacingPropertiesByComponentProps(props);
    return createSpacingStyles(spacingProps, theme.spacing);
  }, [props, theme.spacing]);
};
