/** @type {import('jest').Config} */
const config = {
  preset: 'jest-expo',
  setupFiles: ['react-native-unistyles/mocks', './src/unistyles.ts'],
  setupFilesAfterEnv: ['./test/setup.ts', '@testing-library/react-native/matchers'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  // Extends jest-expo's base pattern with extra packages that need transformation
  transformIgnorePatterns: [
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|react-native-unistyles|react-native-worklets|@shopify/react-native-skia|lottie-react-native))',
    '/node_modules/react-native-reanimated/plugin/',
    '/node_modules/@react-native/babel-preset/',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/', '/.expo/', '/app-example/'],
};

module.exports = config;
