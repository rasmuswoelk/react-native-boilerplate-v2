jest.mock('expo-localization');

import { createI18n } from '../createI18n';

const resources = {
  en: {
    translation: {
      greeting: 'Hello',
      items: '{{count}} item',
      items_other: '{{count}} items',
    },
  },
  da: {
    translation: {
      greeting: 'Hej',
      items: '{{count}} element',
      items_other: '{{count}} elementer',
    },
  },
};

type TestKey = keyof (typeof resources)['en']['translation'];
type TestI18n = Omit<ReturnType<typeof createI18n>, 't'> & {
  t(key: TestKey): string;
};

describe('createI18n', () => {
  let i18n: TestI18n;

  beforeAll(() => {
    i18n = createI18n(resources) as unknown as TestI18n;
  });

  it('returns an initialized i18next instance', () => {
    expect(i18n.isInitialized).toBe(true);
  });

  it('starts with the device locale returned by expo-localization (mocked to "en")', () => {
    expect(i18n.language).toBe('en');
  });

  it('translates a key in the active language', () => {
    expect(i18n.t('greeting')).toBe('Hello');
  });

  it('switches language at runtime', async () => {
    await i18n.changeLanguage('da');
    expect(i18n.t('greeting')).toBe('Hej');
    await i18n.changeLanguage('en');
  });

  it('falls back to fallbackLng for an unknown language', async () => {
    await i18n.changeLanguage('fr');
    expect(i18n.t('greeting')).toBe('Hello'); // 'en' is fallbackLng
    await i18n.changeLanguage('en');
  });

  it('returns the already-initialized instance on a second call (double-init guard)', () => {
    const second = createI18n(resources);
    expect(second).toBe(i18n);
  });
});
