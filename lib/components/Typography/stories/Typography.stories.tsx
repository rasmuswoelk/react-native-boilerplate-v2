import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'body', 'paragraph', 'caption', 'label'],
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox',
    variant: 'body',
  },
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      {(['h1', 'h2', 'h3', 'h4', 'h5', 'body', 'paragraph', 'caption', 'label'] as const).map(
        (variant) => (
          <Typography key={variant} variant={variant}>
            {variant} — The quick brown fox
          </Typography>
        ),
      )}
    </View>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      {(['light', 'regular', 'medium', 'bold', 'black'] as const).map((weight) => (
        <Typography key={weight} fontWeight={weight} fontSize="md">
          {weight} — The quick brown fox
        </Typography>
      ))}
    </View>
  ),
};

export const FontSizes: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((size) => (
        <Typography key={size} fontSize={size}>
          {size} — The quick brown fox
        </Typography>
      ))}
    </View>
  ),
};

export const Alignment: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      {(['left', 'center', 'right'] as const).map((align) => (
        <Typography key={align} textAlign={align}>
          {align} aligned text — The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </View>
  ),
};
