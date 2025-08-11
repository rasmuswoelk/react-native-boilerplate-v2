// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "app-example/**/*"],
  },
  {
    files: ["lib/**/*.{ts,tsx}", "app/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "unused-imports": require("eslint-plugin-unused-imports"),
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-unused-vars": "off", // Turn off the base rule as it can report incorrect errors
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "no-console": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
]);
