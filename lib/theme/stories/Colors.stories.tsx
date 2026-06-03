import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Card } from '@/lib/components/Card';
import { Stack } from '@/lib/components/Stack';
import { Typography } from '@/lib/components/Typography';

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <View style={{ alignItems: 'center', minWidth: 80, marginBottom: 8 }}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: color,
        marginBottom: 4,
      }}
    />
    <Typography variant="caption" style={{ textAlign: 'center', fontSize: 11, fontWeight: '600' }}>
      {name}
    </Typography>
    <Typography variant="caption" style={{ textAlign: 'center', fontSize: 10, opacity: 0.6 }}>
      {color}
    </Typography>
  </View>
);

const BaseColors = () => {
  const { theme } = useUnistyles();
  const singles = Object.entries(theme.colors).filter(([, v]) => typeof v !== 'object') as [
    string,
    string,
  ][];

  return (
    <Card title="Base Colors">
      <Stack direction="horizontal" gap="md" style={{ flexWrap: 'wrap' }}>
        {singles.map(([name, color]) => (
          <ColorSwatch key={name} color={color} name={name} />
        ))}
      </Stack>
    </Card>
  );
};

const Palettes = () => {
  const { theme } = useUnistyles();
  const palettes = Object.entries(theme.colors).filter(([, v]) => typeof v === 'object') as [
    string,
    Record<string, string>,
  ][];

  return (
    <Stack direction="vertical" gap="md">
      {palettes.map(([paletteName, palette]) => (
        <Card
          key={paletteName}
          title={`${paletteName.charAt(0).toUpperCase()}${paletteName.slice(1)} palette`}
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
  );
};

const AllColors = () => {
  const { theme } = useUnistyles();
  return (
    <ScrollView style={{ backgroundColor: theme.colors.ground }}>
      <Stack direction="vertical" gap="md">
        <BaseColors />
        <Palettes />
      </Stack>
    </ScrollView>
  );
};

const meta: Meta = {
  title: 'Theme/Colors',
  component: AllColors,
};

export default meta;

type Story = StoryObj;

export const All: Story = { render: () => <AllColors /> };
export const Base: Story = {
  render: () => (
    <ScrollView>
      <BaseColors />
    </ScrollView>
  ),
};
export const ColorPalettes: Story = {
  render: () => (
    <ScrollView>
      <Palettes />
    </ScrollView>
  ),
};
