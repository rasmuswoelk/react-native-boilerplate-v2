import { Container } from "@/lib/components/Container";
import { Typography } from "@/lib/components/Typography";
import { useTheme } from "@/lib/theme/hooks/useTheme";
import { router } from "expo-router";
import { Pressable, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { AnimatedGradient } from "@/lib/components/Gradient";

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
        paddingTop="3xl"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <Typography
            color="white"
            fontSize="5xl"
            lineHeight={1.2}
            marginBottom="sm"
          >
            <Typography fontWeight="black" color="white">
              Welcome to{"\n"}
            </Typography>
            <Typography fontWeight="regular" color="white" fontStyle="italic">
              the boilerplate
            </Typography>
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
              fontSize="lg"
              lineHeight={1.35}
              fontWeight="bold"
              fontFamily="primary"
              textAlign="center"
              letterSpacing={0.4}
              color="gray.800"
            >
              Enter the playground
            </Typography>
          </Pressable>
        </View>
      </Container>
    </SafeAreaView>
  );
}
