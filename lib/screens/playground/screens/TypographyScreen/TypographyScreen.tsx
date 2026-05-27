import { Card } from '@/lib/components/Card'
import { Container } from '@/lib/components/Container'
import { FadeIn } from '@/lib/components/FadeIn'
import { Stack } from '@/lib/components/Stack'
import { Typography } from '@/lib/components/Typography'
import { useUnistyles } from 'react-native-unistyles'
import { getLineHeight } from '@/lib/theme/utils/getLineHeight'
import { ScrollView } from 'react-native'

const MAP_VARIANT_TO_TEXT = {
  paragraph:
    'Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

export const TypographyScreen = () => {
  const { theme } = useUnistyles()

  return (
    <ScrollView>
      <Container paddingBottom="lg">
        <Stack direction="vertical" gap="md">
          <Card title="Variants">
            <FadeIn>
              {Object.entries(theme.typography.variant).map(([key]) => (
                <Typography
                  key={key}
                  variant={key as keyof typeof theme.typography.variant}
                  marginBottom="sm"
                >
                  {MAP_VARIANT_TO_TEXT[key as keyof typeof MAP_VARIANT_TO_TEXT] || key}
                </Typography>
              ))}
            </FadeIn>
          </Card>
          <Card title="Font sizes">
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
          <Card title="Font weights">
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
  )
}
