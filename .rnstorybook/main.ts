import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['../lib/**/*.stories.?(ts|tsx)', '../app/**/*.stories.?(ts|tsx)'],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
    '@storybook/addon-ondevice-backgrounds',
  ],
};

export default main;
