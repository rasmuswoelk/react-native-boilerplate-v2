import { useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "@/lib/components/Container";
import { FadeIn } from "@/lib/components/FadeIn";
import { AnimatedGradient } from "@/lib/components/Gradient";
import { LottieView } from "@/lib/components/LottieView";
import { Typography } from "@/lib/components/Typography";
import animation from "@/src/assets/animations/3d-shape-animation.json";

export const GradientBackground = () => {
  const { width, height } = useWindowDimensions();

  return (
    <AnimatedGradient
      width={width}
      height={height}
      style={{ flex: 1, position: "absolute", inset: 0, zIndex: -1 }}
      colors={["#0e1a4e", "#08142a"]}
      direction="random"
      animationType="shift"
      speed="slow"
    />
  );
};

const Animation = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  return (
    <View
      style={{
        height: "100%",
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <FadeIn delay={100} duration={800}>
        <LottieView
          source={animation}
          autoPlay
          loop
          style={{ width: windowWidth * 1.8, height: windowHeight * 0.62 }}
        />
      </FadeIn>
    </View>
  );
};

export default function Index() {
  return (
    <>
      <SafeAreaView style={{ flex: 1, zIndex: 10, position: "relative" }}>
        <Container
          gutter="lg"
          paddingTop="3xl"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FadeIn
            delay={1200}
            translateY={-20}
            duration={650}
            style={{ width: "100%" }}
          >
            <Typography
              color="white"
              fontSize="5xl"
              lineHeight={1.2}
              marginBottom="sm"
            >
              <Typography fontWeight="regular" color="white">
                Let's start{"\n"}
              </Typography>
              <Typography fontWeight="black" color="white" fontStyle="italic">
                building.
              </Typography>
            </Typography>
          </FadeIn>
        </Container>
      </SafeAreaView>
      <GradientBackground />
      <Animation />
    </>
  );
}
