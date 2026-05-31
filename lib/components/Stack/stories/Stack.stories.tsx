import type { Meta, StoryObj } from '@storybook/react-native';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Components/Stack',
  component: Stack,
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

const Item = ({ label }: { label: string }) => (
  <Box backgroundColor="brand.200" p="sm" borderRadius="sm">
    <Typography>{label}</Typography>
  </Box>
);

export const Vertical: Story = {
  render: () => (
    <Stack direction="vertical" gap="md">
      <Item label="Item 1" />
      <Item label="Item 2" />
      <Item label="Item 3" />
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Item label="A" />
      <Item label="B" />
      <Item label="C" />
    </Stack>
  ),
};

export const GapSizes: Story = {
  render: () => (
    <Stack direction="vertical" gap="xl">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <Box key={gap}>
          <Typography variant="caption" mb="xs">
            gap=&quot;{gap}&quot;
          </Typography>
          <Stack direction="horizontal" gap={gap}>
            <Item label="A" />
            <Item label="B" />
            <Item label="C" />
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};
