import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useTranslation } from "@/lib/i18n";

const PlaygroundLayout = () => {
  const { t, i18n } = useTranslation();

  return (
    <NativeTabs key={i18n.language}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{t('playground.tabs.home')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="typography">
        <NativeTabs.Trigger.Label>{t('playground.tabs.typography')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="text.book.closed.fill" md="text_fields" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="spacing">
        <NativeTabs.Trigger.Label>{t('playground.tabs.spacing')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="square.grid.3x3.fill" md="grid_view" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="colors">
        <NativeTabs.Trigger.Label>{t('playground.tabs.colors')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="paintpalette.fill" md="palette" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="gradients">
        <NativeTabs.Trigger.Label>{t('playground.tabs.gradients')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="rectangle.fill.on.rectangle.angled.fill" md="gradient" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default PlaygroundLayout;
