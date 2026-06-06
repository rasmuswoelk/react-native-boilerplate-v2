import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Typography } from '@/lib/components/Typography';

export function TripListScreen() {
  return (
    <View style={styles.container}>
      <Typography variant="h1">Trips</Typography>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
}));
