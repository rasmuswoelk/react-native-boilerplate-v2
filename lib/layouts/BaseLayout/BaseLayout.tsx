import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/lib/components/Text';

export const BaseLayout = () => {
  return (
    <View>
      <Text>Base layout</Text>
      <Stack />
    </View>
  );
};
