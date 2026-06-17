import {
  getLocalizedInventorySuggestionGroups,
  getLocalizedInventorySuggestions,
  getLocalizedSuggestionCategories,
  inventoryItemSuggestions,
  type SuggestionTranslator,
  suggestionCategories,
} from '..';

function createTranslator(translations: Record<string, string>): SuggestionTranslator {
  return (key, options) => translations[key] ?? options.defaultValue;
}

describe('localized inventory suggestions', () => {
  it('localizes inventory item names with fallback metadata', () => {
    const suggestions = getLocalizedInventorySuggestions(
      createTranslator({ 'inventorySuggestions.items.passport': 'Pas' }),
    );
    const passport = suggestions.find((suggestion) => suggestion.id === 'passport');

    expect(passport).toEqual(
      expect.objectContaining({
        id: 'passport',
        name: 'Pas',
        defaultName: 'Passport',
        translationKey: 'inventorySuggestions.items.passport',
      }),
    );
  });

  it('falls back to catalog item names when translations are missing', () => {
    const suggestions = getLocalizedInventorySuggestions(createTranslator({}));
    const wallet = suggestions.find((suggestion) => suggestion.id === 'wallet');

    expect(wallet?.name).toBe('Wallet');
    expect(wallet?.defaultName).toBe('Wallet');
  });

  it('localizes category names with fallback metadata', () => {
    const categories = getLocalizedSuggestionCategories(
      createTranslator({ 'inventorySuggestions.categories.essentials': 'Vigtige ting' }),
    );
    const essentials = categories.find((category) => category.id === 'essentials');

    expect(essentials).toEqual(
      expect.objectContaining({
        id: 'essentials',
        name: 'Vigtige ting',
        defaultName: 'Essentials',
        translationKey: 'inventorySuggestions.categories.essentials',
      }),
    );
  });

  it('groups localized suggestions in category order', () => {
    const groups = getLocalizedInventorySuggestionGroups(createTranslator({}));

    expect(groups).toHaveLength(suggestionCategories.length);
    expect(groups.map((group) => group.category.id)).toEqual(
      suggestionCategories.map((category) => category.id),
    );
    expect(groups.flatMap((group) => group.suggestions)).toHaveLength(
      inventoryItemSuggestions.length,
    );
    expect(
      groups[0]?.suggestions.every((suggestion) => suggestion.categoryId === 'essentials'),
    ).toBe(true);
  });
});
