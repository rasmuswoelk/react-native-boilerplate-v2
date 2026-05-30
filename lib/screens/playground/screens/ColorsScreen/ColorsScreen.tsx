import { FC } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Box } from '@/lib/components/Box';
import { Card } from '@/lib/components/Card';
import { Container } from '@/lib/components/Container';
import { Stack } from '@/lib/components/Stack';
import { Typography } from '@/lib/components/Typography';
import { useTranslation } from '@/lib/i18n';

const ColorSwatch: FC<{ color: string; name: string }> = ({ color, name }) => {
  return (
    <Box style={stylesheet.colorSwatchContainer}>
      <Box style={[stylesheet.colorSwatch, { backgroundColor: color }]} />
      <Typography variant="caption" style={stylesheet.colorName} numberOfLines={1}>
        {name}
      </Typography>
      <Typography variant="caption" style={stylesheet.colorValue} numberOfLines={1}>
        {color}
      </Typography>
    </Box>
  );
};

export const ColorsScreen = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();

  const singleColors = Object.entries(theme.colors).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'object') return acc;
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const colorPalettes = Object.entries(theme.colors).reduce(
    (acc, [key, value]) => {
      if (typeof value !== 'object') return acc;
      acc[key] = value;
      return acc;
    },
    {} as Record<string, Record<string, string>>,
  );

  return (
    <ScrollView style={{ backgroundColor: theme.colors.ground }}>
      <Container paddingBottom="lg" paddingTop="lg">
        <Stack direction="vertical" gap="md">
          <Card title={t('playground.colors.baseColors')}>
            <Stack direction="horizontal" gap="md" style={{ flexWrap: 'wrap' }}>
              {Object.entries(singleColors).map(([name, color]) => (
                <ColorSwatch key={name} color={color} name={name} />
              ))}
            </Stack>
          </Card>

          {Object.entries(colorPalettes).map(([paletteName, palette]) => (
            <Card
              key={paletteName}
              title={t('playground.colors.palette', {
                name: paletteName.charAt(0).toUpperCase() + paletteName.slice(1),
              })}
            >
              <Stack direction="horizontal" gap="sm" style={{ flexWrap: 'wrap' }}>
                {Object.entries(palette).map(([shade, color]) => (
                  <ColorSwatch
                    key={`${paletteName}-${shade}`}
                    color={color}
                    name={`${paletteName}.${shade}`}
                  />
                ))}
              </Stack>
            </Card>
          ))}
        </Stack>
      </Container>
    </ScrollView>
  );
};

const stylesheet = StyleSheet.create((theme) => ({
  colorSwatchContainer: {
    alignItems: 'center',
    minWidth: 80,
    marginBottom: theme.spacing.sm,
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  colorSwatchBorder: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
  },
  colorName: {
    textAlign: 'center',
    color: theme.colors.gray[700],
    fontWeight: '600',
    fontSize: 12,
  },
  colorValue: {
    textAlign: 'center',
    color: theme.colors.gray[500],
    fontSize: 10,
  },
}));
