import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          backgroundColor: "#000",
          padding: 12,
          borderRadius: 10,
        }}
        onPress={() => router.push("/playground")}
      >
        <Text style={{ color: "#fff" }}>Go to playground</Text>
      </Pressable>
    </View>
  );
}
