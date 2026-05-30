import { Tabs } from 'expo-router';
import { IconSymbol } from '@/app-example/components/ui/IconSymbol';

export const PlaygroundLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="typography"
        options={{
          title: 'Typography',
          headerTitle: 'Typography',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="text.book.closed.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
