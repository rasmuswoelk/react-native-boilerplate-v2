import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type SuggestionCategoryId =
  | 'essentials'
  | 'clothing'
  | 'footwear'
  | 'toiletries'
  | 'health'
  | 'electronics'
  | 'travel_gear'
  | 'weather_gear'
  | 'activities'
  | 'food_drink'
  | 'baby_kids'
  | 'pets'
  | 'work'
  | 'safety'
  | 'miscellaneous';

export type SuggestionCategoryIcon = {
  set: 'MaterialCommunityIcons';
  name: keyof typeof MaterialCommunityIcons.glyphMap;
};

export type SuggestionCategory = {
  id: SuggestionCategoryId;
  name: string;
  icon: SuggestionCategoryIcon;
};

export type InventoryItemSuggestion = {
  id: string;
  categoryId: SuggestionCategoryId;
  name: string;
  estimatedWeightGrams: number;
};

export type LocalizedSuggestionCategory = Omit<SuggestionCategory, 'name'> & {
  name: string;
  defaultName: string;
  translationKey: string;
};

export type LocalizedInventoryItemSuggestion = Omit<InventoryItemSuggestion, 'name'> & {
  name: string;
  defaultName: string;
  translationKey: string;
};

export type InventoryItemSuggestionGroup = {
  category: LocalizedSuggestionCategory;
  suggestions: LocalizedInventoryItemSuggestion[];
};

export type InventorySuggestionAvailability = LocalizedInventoryItemSuggestion & {
  isAdded: boolean;
};
