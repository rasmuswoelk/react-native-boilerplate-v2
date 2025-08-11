import { Box, BoxProps } from "@/lib/components/Box";
import { useTheme } from "@/lib/theme/hooks/useTheme";
import {
  omitSpacingProps,
  SpacingProps,
  useGetSpacingStylesByComponentProps,
} from "@/lib/theme/utils/createSpacingProps";
import { getLineHeight } from "@/lib/theme/utils/getLineHeight";
import { useMemo } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

export type TypographyProps = Omit<BoxProps, "as"> &
  SpacingProps &
  TextProps & {
    lineHeight?: keyof Theme.AppTheme["typography"]["lineHeight"] | number;
    variant?: keyof Theme.AppTheme["typography"]["variant"];
    fontFamily?: keyof Theme.AppTheme["typography"]["fontFamily"];
    fontWeight?: keyof Theme.AppTheme["typography"]["fontWeight"];
    fontSize?: keyof Theme.AppTheme["typography"]["fontSize"] | number;
    textAlign?: "left" | "center" | "right" | "justify";
    fontStyle?: "normal" | "italic";
    letterSpacing?: number;
  };

export const Typography = ({
  variant,
  fontFamily,
  fontWeight,
  style,
  lineHeight,
  fontSize,
  textAlign,
  fontStyle = "normal",
  letterSpacing,
  ...props
}: TypographyProps) => {
  const { theme, fontMapper } = useTheme();
  const textProps = useMemo(() => omitSpacingProps(props), [props]);
  const spacingStyles = useGetSpacingStylesByComponentProps(props) as TextStyle;

  const fontFamilyValue = useMemo(() => {
    if (!fontFamily) {
      return undefined;
    }

    // Map font style, weight, and family to the correct font
    // Note: We do this because fonts are defined by font weight and style,
    // and we want to be able to use the correct font for the correct variant.
    if (fontMapper) {
      const mappedFontFamily =
        fontMapper[fontFamily ?? "primary"]?.[fontWeight ?? "regular"]?.[
          fontStyle ?? "normal"
        ];

      if (mappedFontFamily) {
        return mappedFontFamily;
      }
    }

    return fontFamily;
  }, [fontFamily, fontMapper, fontWeight, fontStyle]);

  const fontSizeValue = useMemo(() => {
    if (!fontSize && !variant) {
      return undefined;
    }

    if (typeof fontSize === "number") {
      return fontSize;
    }

    if (fontSize) {
      return theme.typography.fontSize[fontSize];
    }

    if (variant) {
      return theme.typography.variant[variant].fontSize;
    }

    return theme.typography.variant.body.fontSize;
  }, [fontSize, theme, variant]);

  const lineHeightValue = useMemo(() => {
    if (!lineHeight || !fontSizeValue) {
      return undefined;
    }

    const lineHeightValue =
      typeof lineHeight === "number"
        ? lineHeight
        : theme.typography.lineHeight[lineHeight];

    return getLineHeight(fontSizeValue, lineHeightValue);
  }, [lineHeight, theme, fontSizeValue]);

  const styles = useMemo(
    () =>
      [
        fontFamilyValue && { fontFamily: fontFamilyValue },
        variant && theme.typography.variant[variant],
        fontSizeValue && { fontSize: fontSizeValue },
        fontWeight && { fontWeight: theme.typography.fontWeight[fontWeight] },
        lineHeightValue && { lineHeight: lineHeightValue },
        textAlign && { textAlign },
        fontStyle && { fontStyle },
        letterSpacing && { letterSpacing },
        spacingStyles,
        style,
      ].filter(Boolean),
    [
      variant,
      fontWeight,
      spacingStyles,
      style,
      theme,
      fontSizeValue,
      lineHeightValue,
      fontFamilyValue,
      textAlign,
      fontStyle,
      letterSpacing,
    ]
  );

  return (
    <Box
      color="figure"
      as={Text}
      {...textProps}
      style={styles as StyleProp<TextStyle>}
    />
  );
};
