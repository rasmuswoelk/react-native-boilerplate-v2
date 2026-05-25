import { NativeTabs } from "expo-router/unstable-native-tabs";

const PlaygroundLayout = () => {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="typography">
        <NativeTabs.Trigger.Label>Typography</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="text.book.closed.fill" md="text_fields" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="spacing">
        <NativeTabs.Trigger.Label>Spacing</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="square.grid.3x3.fill" md="grid_view" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="colors">
        <NativeTabs.Trigger.Label>Colors</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="paintpalette.fill" md="palette" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="gradients">
        <NativeTabs.Trigger.Label>Gradients</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="rectangle.fill.on.rectangle.angled.fill" md="gradient" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default PlaygroundLayout;
