import { Stack } from "expo-router";
import { Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, UnistylesRuntime, useUnistyles } from "react-native-unistyles";

const DarkModeSwitcher = () => {
  const { theme, rt } = useUnistyles();
  const isDarkMode = rt.themeName === "dark";

  const handleValueChange = (value: boolean) => {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(value ? "dark" : "light");
  };

  return (
    <View style={stylesheet.switcher}>
      <Text style={stylesheet.switcherLabel}>Dark mode</Text>
      <Switch
        accessibilityLabel="Toggle dark mode"
        trackColor={{ false: theme.colors.gray[300], true: theme.colors.brand[600] }}
        thumbColor={theme.colors.white}
        ios_backgroundColor={theme.colors.gray[300]}
        value={isDarkMode}
        onValueChange={handleValueChange}
      />
    </View>
  );
};

const PlaygroundLayout = () => {
  const { theme } = useUnistyles();

  return (
    <SafeAreaView
      style={[stylesheet.container, { backgroundColor: theme.colors.background }]}
      edges={["top", "left", "right"]}
    >
      <DarkModeSwitcher />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaView>
  );
};

export default PlaygroundLayout;

const stylesheet = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  switcher: {
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  switcherLabel: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
}));
