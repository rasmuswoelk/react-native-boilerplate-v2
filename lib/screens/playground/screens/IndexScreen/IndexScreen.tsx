import { Box } from "@/lib/components/Box";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { View } from "react-native";
import { Text } from "@/lib/components/Text";

export const IndexScreen = () => {
  const { rt } = useUnistyles();

  return (
    <View key={rt.themeName} style={stylesheet.container}>
      <Text style={stylesheet.text}>Welcome to the playground</Text>

      <Box
        marginTop="lg"
        paddingHorizontal="md"
        style={stylesheet.demoBox}
      >
        <Text style={stylesheet.demoText}>
          {`Box with marginTop="lg" and paddingHorizontal="md"`}
        </Text>
      </Box>

      <Box
        marginVertical="md"
        paddingVertical="sm"
        style={stylesheet.demoBox}
      >
        <Text style={stylesheet.demoText}>
          {`Box with marginVertical="md" and paddingVertical="sm"`}
        </Text>
      </Box>

      <Box margin="xl" padding="lg" style={stylesheet.demoBox}>
        <Text style={stylesheet.demoText}>
          {`Box with margin="xl" and padding="lg"`}
        </Text>
      </Box>
    </View>
  );
};

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
  },
  demoBox: {
    backgroundColor: theme.colors.ground,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    borderWidth: StyleSheet.hairlineWidth,
  },
  demoText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.primary,
  },
}));
