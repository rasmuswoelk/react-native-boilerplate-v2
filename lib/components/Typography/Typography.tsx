import { useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Box, BoxProps } from '@/lib/components/Box';
import {
  omitSpacingProps,
  SpacingProps,
  useGetSpacingStylesByComponentProps,
} from '@/lib/theme/utils/createSpacingProps';
import { getLineHeight } from '@/lib/theme/utils/getLineHeight';
import { fontMapper } from '@/src/theme/fonts';
import type { AppTheme } from '@/src/unistyles';

export type TypographyProps = Omit<BoxProps, 'as'> &
  SpacingProps &
  TextProps & {
    lineHeight?: keyof AppTheme['typography']['lineHeight'] | number;
    variant?: keyof AppTheme['typography']['variant'];
    fontFamily?: keyof AppTheme['typography']['fontFamily'];
    fontWeight?: keyof AppTheme['typography']['fontWeight'];
    fontSize?: keyof AppTheme['typography']['fontSize'] | number;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    fontStyle?: 'normal' | 'italic';
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
  fontStyle = 'normal',
  letterSpacing,
  ...props
}: TypographyProps) => {
  const { theme } = useUnistyles();
  const textProps = omitSpacingProps(props);
  const spacingStyles = useGetSpacingStylesByComponentProps(props) as TextStyle;

  const fontFamilyValue = useMemo(() => {
    if (!fontFamily) {
      return undefined;
    }

    const mappedFontFamily =
      fontMapper[fontFamily ?? 'primary']?.[fontWeight ?? 'regular']?.[fontStyle ?? 'normal'];

    return mappedFontFamily ?? fontFamily;
  }, [fontFamily, fontWeight, fontStyle]);

  const fontSizeValue = useMemo(() => {
    if (!fontSize && !variant) {
      return undefined;
    }

    if (typeof fontSize === 'number') {
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

    const lhValue =
      typeof lineHeight === 'number' ? lineHeight : theme.typography.lineHeight[lineHeight];

    return getLineHeight(fontSizeValue, lhValue);
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
    ],
  );

  return <Box color="figure" as={Text} {...textProps} style={styles as StyleProp<TextStyle>} />;
};
