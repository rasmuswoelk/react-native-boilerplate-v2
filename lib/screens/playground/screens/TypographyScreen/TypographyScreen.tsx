import { ScrollView } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Card } from '@/lib/components/Card';
import { Container } from '@/lib/components/Container';
import { FadeIn } from '@/lib/components/FadeIn';
import { Stack } from '@/lib/components/Stack';
import { Typography } from '@/lib/components/Typography';
import { useTranslation } from '@/lib/i18n';
import { getLineHeight } from '@/lib/theme/utils/getLineHeight';

export const TypographyScreen = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();

  const variantText: Record<string, string> = {
    paragraph: t('playground.typography.paragraph'),
  };

  return (
    <ScrollView style={{ backgroundColor: theme.colors.ground }}>
      <Container paddingBottom="lg" paddingTop="lg" backgroundColor="ground">
        <Stack direction="vertical" gap="md">
          <Card title={t('playground.typography.variants')}>
            <FadeIn>
              {Object.entries(theme.typography.variant).map(([key]) => (
                <Typography
                  key={key}
                  variant={key as keyof typeof theme.typography.variant}
                  marginBottom="sm"
                >
                  {variantText[key] ?? key}
                </Typography>
              ))}
            </FadeIn>
          </Card>
          <Card title={t('playground.typography.fontSizes')}>
            <FadeIn>
              <Stack>
                {Object.entries(theme.typography.fontSize).map(([key, value]) => (
                  <Typography
                    key={key}
                    style={{
                      fontSize: value,
                      lineHeight: getLineHeight(value, theme.typography.lineHeight.md),
                    }}
                  >
                    {key} ({value})
                  </Typography>
                ))}
              </Stack>
            </FadeIn>
          </Card>
          <Card title={t('playground.typography.fontWeights')}>
            <Stack direction="vertical" gap="md">
              {Object.entries(theme.typography.fontWeight).map(([key, value]) => (
                <Typography
                  key={key}
                  variant="body"
                  fontWeight={key as keyof typeof theme.typography.fontWeight}
                >
                  {key} ({value})
                </Typography>
              ))}
            </Stack>
          </Card>
        </Stack>
      </Container>
    </ScrollView>
  );
};
