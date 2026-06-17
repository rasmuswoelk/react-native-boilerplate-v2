import {
  type ExistingInventorySuggestionMatch,
  getLocalizedInventorySuggestions,
  getSuggestionAvailability,
  type SuggestionTranslator,
} from '..';

const passthroughTranslator: SuggestionTranslator = (_key, options) => options.defaultValue;

const suggestions = getLocalizedInventorySuggestions(passthroughTranslator);

describe('getSuggestionAvailability', () => {
  it('marks suggestions as added by source suggestion id', () => {
    const availability = getSuggestionAvailability(suggestions, [
      { sourceSuggestionId: 'passport', name: 'Custom passport name' },
    ]);

    expect(availability.find((suggestion) => suggestion.id === 'passport')?.isAdded).toBe(true);
    expect(availability.find((suggestion) => suggestion.id === 'wallet')?.isAdded).toBe(false);
  });

  it('ignores item names by default', () => {
    const availability = getSuggestionAvailability(suggestions, [{ name: 'Wallet' }]);

    expect(availability.find((suggestion) => suggestion.id === 'wallet')?.isAdded).toBe(false);
  });

  it('can conservatively match existing rows by localized or default names', () => {
    const localizedSuggestions = getLocalizedInventorySuggestions((key, options) =>
      key === 'inventorySuggestions.items.passport' ? 'Pas' : options.defaultValue,
    );
    const availability = getSuggestionAvailability(localizedSuggestions, [{ name: 'pas' }], {
      matchByName: true,
    });

    expect(availability.find((suggestion) => suggestion.id === 'passport')?.isAdded).toBe(true);
  });

  it('handles missing source ids and names', () => {
    const existingItems: ExistingInventorySuggestionMatch[] = [
      { sourceSuggestionId: null, name: null },
      {},
    ];

    expect(() => getSuggestionAvailability(suggestions, existingItems)).not.toThrow();
  });
});
