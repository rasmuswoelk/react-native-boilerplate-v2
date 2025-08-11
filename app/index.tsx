import { Container } from "@/lib/components/Container";
import { Typography } from "@/lib/components/Typography";
import { useTheme } from "@/lib/theme/hooks/useTheme";
import { router } from "expo-router";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";
import { AnimatedGradient } from "@/lib/components/Gradient";
import { getLineHeight } from "@/lib/theme/utils/getLineHeight";

export const GradientBackground = () => {
  const { width, height } = useWindowDimensions();

  return (
    <AnimatedGradient
      width={width}
      height={height}
      style={{ flex: 1, position: "absolute", inset: 0 }}
      colors={["#ff1c73", "#4b69a2"]}
      direction="random"
      animationType="shift"
      speed="slow"
    />
  );
};

export default function Index() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.brand[600] }}>
      <GradientBackground />
      <Container
        gutter="lg"
        paddingVertical="lg"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <Typography
            color="white"
            style={{
              textAlign: "left",
              fontSize: theme.typography.fontSize["5xl"],
              lineHeight: getLineHeight(
                theme.typography.fontSize["5xl"],
                theme.typography.lineHeight.md
              ),
            }}
            variant="h1"
            fontWeight="black"
            marginBottom="sm"
          >
            <Text>Welcome to{"\n"}</Text>
            <Text
              style={{
                fontStyle: "italic",
              }}
            >
              the boilerplate
            </Text>
          </Typography>
        </View>
        <View style={{ marginTop: "auto", width: "100%" }}>
          <Pressable
            style={{
              backgroundColor: theme.colors.white,
              paddingHorizontal: theme.spacing.lg,
              height: 56,
              borderRadius: 50,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.push("/playground")}
          >
            <Typography
              color="gray.700"
              variant="paragraph"
              fontWeight="bold"
              style={{ textAlign: "center", letterSpacing: 0.45 }}
            >
              Go to playground
            </Typography>
          </Pressable>
        </View>
      </Container>
    </SafeAreaView>
  );
}
