import materialCommunityIconsGlyphMap from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';
import { inventoryItemSuggestions, suggestionCategories } from '..';

describe('suggestions catalog', () => {
  it('uses unique category ids', () => {
    const ids = suggestionCategories.map((category) => category.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses valid Expo MaterialCommunityIcons category icons', () => {
    for (const category of suggestionCategories) {
      expect(category.icon.set).toBe('MaterialCommunityIcons');
      expect(category.icon.name in materialCommunityIconsGlyphMap).toBe(true);
    }
  });

  it('uses unique inventory item suggestion ids', () => {
    const ids = inventoryItemSuggestions.map((suggestion) => suggestion.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only references known categories', () => {
    const categoryIds = new Set(suggestionCategories.map((category) => category.id));

    for (const suggestion of inventoryItemSuggestions) {
      expect(categoryIds.has(suggestion.categoryId)).toBe(true);
    }
  });

  it('has display names and positive estimated weights', () => {
    for (const suggestion of inventoryItemSuggestions) {
      expect(suggestion.name.trim()).not.toBe('');
      expect(suggestion.estimatedWeightGrams).toBeGreaterThan(0);
    }
  });
});
