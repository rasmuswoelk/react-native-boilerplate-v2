import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorybookUI } from '@storybook/react-native';

export default function StorybookScreen() {
  return <StorybookUI storage={AsyncStorage} />;
}
