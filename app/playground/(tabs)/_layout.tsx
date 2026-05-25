import { IconSymbol } from "@/app-example/components/ui/IconSymbol";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import TabBarBackground from "../components/TabBarBackground";

const PlaygroundLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
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
      <Tabs.Screen
        name="gradients"
        options={{
          title: "Gradients",
          headerTitle: "Gradients",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="rectangle.fill.on.rectangle.angled.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default PlaygroundLayout;
