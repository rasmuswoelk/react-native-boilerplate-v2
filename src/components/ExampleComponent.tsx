import { useTheme } from "@/lib/theme/providers/ThemeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ExampleComponent = () => {
  // The theme is now strongly typed as AppTheme
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.brand[300] }]}>
        Primary Text
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
        Secondary Text
      </Text>
      <View
        style={[
          styles.brandContainer,
          { backgroundColor: theme.colors.brand[100] },
        ]}
      >
        <Text style={[styles.brandText, { color: theme.colors.brand[700] }]}>
          Brand Colors Available!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  brandContainer: {
    padding: 12,
    borderRadius: 4,
  },
  brandText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
