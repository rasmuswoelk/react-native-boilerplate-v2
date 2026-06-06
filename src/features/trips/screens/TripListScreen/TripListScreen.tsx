import { StyleSheet, Text, View } from 'react-native';

export function TripListScreen() {
  return (
    <View style={styles.container}>
      <Text>Trips</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
