import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { AnimatedWidthBar } from '@/lib/components/AnimatedWidthBar';
import { Box } from '@/lib/components/Box';
import { Card } from '@/lib/components/Card';
import { FadeIn } from '@/lib/components/FadeIn';
import { Stack } from '@/lib/components/Stack';
import { Typography } from '@/lib/components/Typography';

const fadeIn = { delay: 50, duration: 200, animationType: 'spring' as const, translateY: 20 };

const Scale = () => {
  const { theme } = useUnistyles();
  return (
    <Card title="Spacing scale">
      <FadeIn>
        {Object.entries(theme.spacing).map(([key, value], index) => (
          <FadeIn key={key} {...fadeIn}>
            <Box marginBottom="md">
              <Typography variant="caption" marginBottom="xs">
                {key}: {value}px
              </Typography>
              <AnimatedWidthBar
                width={value}
                backgroundColor={theme.colors.primary}
                borderRadius={theme.borderRadius.xs}
                delay={100 + index * 50}
              />
            </Box>
          </FadeIn>
        ))}
      </FadeIn>
    </Card>
  );
};

const MarginExamples = () => {
  const { theme } = useUnistyles();
  const steps = [
    { label: 'xs', value: theme.spacing.xs },
    { label: 'sm', value: theme.spacing.sm },
    { label: 'md', value: theme.spacing.md },
    { label: 'lg', value: theme.spacing.lg },
  ] as const;

  return (
    <Stack direction="vertical" gap="md">
      {steps.map(({ label }) => (
        <Box key={label} style={{ backgroundColor: theme.colors.brand[200] }} padding="md">
          <Typography variant="caption" marginBottom="xs">
            {`marginBottom="${label}"`}
          </Typography>
          <Box
            style={{ backgroundColor: theme.colors.gray[200] }}
            padding="sm"
            marginBottom={label}
          >
            <Typography variant="caption">Content</Typography>
          </Box>
          <Box style={{ backgroundColor: theme.colors.gray[200] }} padding="sm">
            <Typography variant="caption">Content</Typography>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

const PaddingExamples = () => {
  const { theme } = useUnistyles();
  const steps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <Stack direction="vertical" gap="sm">
      {steps.map((key) => (
        <Box key={key} style={{ backgroundColor: theme.colors.gray[200] }} marginBottom="sm">
          <Typography variant="caption">{`padding="${key}" (${theme.spacing[key]}px)`}</Typography>
          <Box style={{ backgroundColor: theme.colors.brand[100] }} padding={key}>
            <Typography variant="caption">Padded content</Typography>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

const AllSpacing = () => {
  const { theme } = useUnistyles();
  return (
    <ScrollView style={{ backgroundColor: theme.colors.ground }}>
      <Box padding="md">
        <Stack direction="vertical" gap="md">
          <Scale />
          <Card title="Margin examples">
            <MarginExamples />
          </Card>
          <Card title="Padding examples">
            <PaddingExamples />
          </Card>
        </Stack>
      </Box>
    </ScrollView>
  );
};

const meta: Meta = {
  title: 'Theme/Spacing',
  component: AllSpacing,
};

export default meta;

type Story = StoryObj;

export const All: Story = { render: () => <AllSpacing /> };
export const SpacingScale: Story = {
  render: () => (
    <Box padding="md">
      <Scale />
    </Box>
  ),
};
export const Margin: Story = {
  render: () => (
    <Box padding="md">
      <MarginExamples />
    </Box>
  ),
};
export const Padding: Story = {
  render: () => (
    <Box padding="md">
      <PaddingExamples />
    </Box>
  ),
};
