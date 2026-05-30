import { Stack } from 'expo-router';
import { Pressable, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { useTranslation } from '@/lib/i18n';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isEN = i18n.language === 'en';

  return (
    <View style={stylesheet.langSwitcher}>
      <Pressable onPress={() => i18n.changeLanguage('en')}>
        <Text style={[stylesheet.langOption, isEN && stylesheet.langOptionActive]}>EN</Text>
      </Pressable>
      <Text style={stylesheet.langDivider}>/</Text>
      <Pressable onPress={() => i18n.changeLanguage('da')}>
        <Text style={[stylesheet.langOption, !isEN && stylesheet.langOptionActive]}>DA</Text>
      </Pressable>
    </View>
  );
};

const DarkModeSwitcher = () => {
  const { theme, rt } = useUnistyles();
  const { t } = useTranslation();
  const isDarkMode = rt.themeName === 'dark';

  const handleValueChange = (value: boolean) => {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(value ? 'dark' : 'light');
  };

  return (
    <View style={stylesheet.darkMode}>
      <Text style={stylesheet.label}>{t('common.darkMode')}</Text>
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
      edges={['top', 'left', 'right']}
    >
      <View style={stylesheet.header}>
        <LanguageSwitcher />
        <DarkModeSwitcher />
      </View>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default PlaygroundLayout;

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  langSwitcher: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  langOption: {
    color: theme.colors.gray[400],
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  langOptionActive: {
    color: theme.colors.brand[600],
  },
  langDivider: {
    color: theme.colors.gray[300],
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.md,
  },
  darkMode: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
}));
