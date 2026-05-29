import '@/src/unistyles'
import '@/src/i18n'
import { AppLayout } from '@/src/layouts/AppLayout'
import { Stack } from 'expo-router'
import 'react-native-reanimated'

export default function RootLayout() {
  return (
    <AppLayout>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="playground" options={{ headerShown: false }} />
      </Stack>
    </AppLayout>
  )
}
