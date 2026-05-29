import { Box } from "@/lib/components/Box";
import { Container } from "@/lib/components/Container";
import { Typography } from "@/lib/components/Typography";
import { AnimatedWidthBar } from "@/lib/components/AnimatedWidthBar";
import { FadeIn, FadeInProps } from "@/lib/components/FadeIn";
import { useUnistyles } from "react-native-unistyles";
import { ScrollView } from "react-native";
import { Card } from "@/lib/components/Card";
import { useTranslation } from "@/lib/i18n";

const fadeInProps: Partial<FadeInProps> = {
  delay: 50,
  duration: 200,
  animationType: "spring",
  springConfig: { damping: 15 },
  translateY: 20,
};

const SpacingItem = ({
  spacingKey,
  value,
  index,
  theme,
}: {
  spacingKey: string;
  value: number;
  index: number;
  theme: any;
}) => {
  return (
    <FadeIn {...fadeInProps}>
      <Box marginBottom="md">
        <Typography variant="caption" marginBottom="xs">
          {spacingKey}: {value}px
        </Typography>
        <AnimatedWidthBar
          width={value}
          backgroundColor={theme.colors.primary}
          borderRadius={theme.borderRadius.xs}
          delay={100 + index * 50}
        />
      </Box>
    </FadeIn>
  );
};

export const SpacingScreen = () => {
  const { theme } = useUnistyles();
  const { t } = useTranslation();

  return (
    <ScrollView style={{ backgroundColor: theme.colors.ground }}>
      <Container paddingTop="lg">
        <Card title={t('playground.spacing.values')}>
          <FadeIn>
            {Object.entries(theme.spacing).map(([key, value], index) => (
              <SpacingItem
                key={key}
                spacingKey={key}
                value={value}
                index={index}
                theme={theme}
              />
            ))}
          </FadeIn>
        </Card>

        <FadeIn {...fadeInProps}>
          <Box paddingBottom="lg">
            <Typography variant="body" fontWeight="black" marginBottom="sm">
              {t('playground.spacing.marginExamples')}
            </Typography>
            <Box style={{ backgroundColor: theme.colors.brand[200] }} padding="md" marginBottom="md">
              <Typography variant="caption" marginBottom="xs">
                {`marginBottom="xs" (4px)`}
              </Typography>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm" marginBottom="xs">
                <Typography variant="caption">Content</Typography>
              </Box>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm">
                <Typography variant="caption">Content</Typography>
              </Box>
            </Box>

            <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="md" marginBottom="md">
              <Typography variant="caption" marginBottom="xs">
                {`marginBottom="sm" (8px)`}
              </Typography>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm" marginBottom="sm">
                <Typography variant="caption">Content</Typography>
              </Box>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm">
                <Typography variant="caption">Content</Typography>
              </Box>
            </Box>

            <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="md" marginBottom="md">
              <Typography variant="caption" marginBottom="xs">
                {`marginBottom="md" (16px)`}
              </Typography>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm" marginBottom="md">
                <Typography variant="caption">Content</Typography>
              </Box>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm">
                <Typography variant="caption">Content</Typography>
              </Box>
            </Box>

            <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="md" marginBottom="md">
              <Typography variant="caption" marginBottom="xs">
                {`marginBottom="lg" (24px)`}
              </Typography>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm" marginBottom="lg">
                <Typography variant="caption">Content</Typography>
              </Box>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm">
                <Typography variant="caption">Content</Typography>
              </Box>
            </Box>
          </Box>
        </FadeIn>

        <FadeIn {...fadeInProps}>
          <Box paddingBottom="lg">
            <Typography variant="body" fontWeight="black" marginBottom="sm">
              {t('playground.spacing.paddingExamples')}
            </Typography>
            <Box style={{ backgroundColor: theme.colors.gray[200] }} marginBottom="md">
              <Typography variant="caption">{`padding="xs" (4px)`}</Typography>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="xs">
                <Typography variant="caption">Padded content</Typography>
              </Box>
            </Box>
            <Box style={{ backgroundColor: theme.colors.gray[200] }} marginBottom="md">
              <Typography variant="caption">{`padding="sm" (8px)`}</Typography>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm">
                <Typography variant="caption">Padded content</Typography>
              </Box>
            </Box>
            <Box style={{ backgroundColor: theme.colors.gray[200] }} marginBottom="md">
              <Typography variant="caption">{`padding="md" (16px)`}</Typography>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="md">
                <Typography variant="caption">Padded content</Typography>
              </Box>
            </Box>
            <Box style={{ backgroundColor: theme.colors.gray[200] }} marginBottom="md">
              <Typography variant="caption">{`padding="lg" (24px)`}</Typography>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="lg">
                <Typography variant="caption">Padded content</Typography>
              </Box>
            </Box>
            <Box style={{ backgroundColor: theme.colors.gray[200] }} marginBottom="md">
              <Typography variant="caption">{`padding="xl" (32px)`}</Typography>
              <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="xl">
                <Typography variant="caption">Padded content</Typography>
              </Box>
            </Box>
          </Box>
        </FadeIn>
      </Container>
    </ScrollView>
  );
};
