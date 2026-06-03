import '@/src/theme/theme';
import '@/src/i18n';
import { Stack } from 'expo-router';
import { AppLayout } from '@/src/layouts/AppLayout';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <AppLayout>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="playground" options={{ headerShown: false }} />
        <Stack.Screen name="storybook" options={{ title: 'Storybook' }} />
      </Stack>
    </AppLayout>
  );
}
