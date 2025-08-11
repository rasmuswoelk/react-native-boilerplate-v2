import { Box } from "@/lib/components/Box";
import { createStyles, useStyles } from "@/lib/theme/hooks/useStyles";
import { Text, View } from "react-native";

export const IndexScreen = () => {
  const styles = useStyles(stylesDefinition);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the playground</Text>

      {/* Demonstrating spacing utility usage */}
      <Box marginTop="lg" paddingHorizontal="md" style={styles.demoBox}>
        <Text style={styles.demoText}>
          Box with marginTop="lg" and paddingHorizontal="md"
        </Text>
      </Box>

      <Box marginVertical="md" paddingVertical="sm" style={styles.demoBox}>
        <Text style={styles.demoText}>
          Box with marginVertical="md" and paddingVertical="sm"
        </Text>
      </Box>

      <Box margin="xl" padding="lg" style={styles.demoBox}>
        <Text style={styles.demoText}>
          Box with margin="xl" and padding="lg"
        </Text>
      </Box>
    </View>
  );
};
const stylesDefinition = createStyles(({ theme }) => ({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.brand[200],
  },
  text: {
    color: theme.colors.figure,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.black,
    fontFamily: theme.typography.fontFamily.primary,
  },
  demoBox: {
    backgroundColor: theme.colors.brand[100],
    borderRadius: 8,
  },
  demoText: {
    color: theme.colors.figure,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.primary,
  },
}));
