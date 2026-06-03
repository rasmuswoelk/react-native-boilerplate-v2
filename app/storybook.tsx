import { lazy, Suspense } from 'react';
import { View } from 'react-native';

const StorybookUI = lazy(async () => {
  const { view } = await import('../.rnstorybook/storybook.requires');
  const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
  const Root = view?.getStorybookUI?.({ storage: AsyncStorage }) ?? (() => null);
  return { default: Root };
});

export default function StorybookScreen() {
  if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED !== 'true') return null;
  return (
    <Suspense fallback={<View style={{ flex: 1 }} />}>
      <StorybookUI />
    </Suspense>
  );
}
