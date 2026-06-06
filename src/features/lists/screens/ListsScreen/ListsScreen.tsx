import { StyleSheet, Text, View } from 'react-native';

export function ListsScreen() {
  return (
    <View style={styles.container}>
      <Text>Lists</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
