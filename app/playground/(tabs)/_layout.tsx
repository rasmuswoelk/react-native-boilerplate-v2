import { IconSymbol } from "@/app-example/components/ui/IconSymbol";
import { Tabs } from "expo-router";

const PlaygroundLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="typography"
        options={{
          title: "Typography",
          headerTitle: "Typography",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="text.book.closed.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="spacing"
        options={{
          title: "Spacing",
          headerTitle: "Spacing",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="square.grid.3x3.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="colors"
        options={{
          title: "Colors",
          headerTitle: "Colors",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paintpalette.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default PlaygroundLayout;
