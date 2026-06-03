import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Box } from '@/lib/components/Box';
import { Typography } from '@/lib/components/Typography';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => (
    <Box backgroundColor="brand.100" padding="md" borderRadius="md">
      <Typography>Default Box</Typography>
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Box key={size} backgroundColor="brand.200" padding={size} borderRadius="sm">
          <Typography>padding=&quot;{size}&quot;</Typography>
        </Box>
      ))}
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Box backgroundColor="brand.300" padding="md" borderRadius="md">
        <Typography>brand.300</Typography>
      </Box>
      <Box backgroundColor="gray.200" padding="md" borderRadius="md">
        <Typography>gray.200</Typography>
      </Box>
      <Box backgroundColor="green.200" padding="md" borderRadius="md">
        <Typography>green.200</Typography>
      </Box>
      <Box backgroundColor="orange.200" padding="md" borderRadius="md">
        <Typography>orange.200</Typography>
      </Box>
    </View>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((r) => (
        <Box key={r} backgroundColor="brand.200" padding="md" borderRadius={r}>
          <Typography>borderRadius=&quot;{r}&quot;</Typography>
        </Box>
      ))}
    </View>
  ),
};
