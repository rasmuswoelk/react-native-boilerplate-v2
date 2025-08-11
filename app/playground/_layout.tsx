import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PlaygroundLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaView>
  );
};

export default PlaygroundLayout;
