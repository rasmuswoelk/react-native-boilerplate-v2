import { suggestionCategories } from '../data/categories';
import { inventoryItemSuggestions } from '../data/inventory-item-suggestions';
import type {
  InventoryItemSuggestion,
  InventoryItemSuggestionGroup,
  LocalizedInventoryItemSuggestion,
  LocalizedSuggestionCategory,
  SuggestionCategory,
  SuggestionCategoryId,
} from '../types';

export type SuggestionTranslator = (key: string, options: { defaultValue: string }) => string;

const categoryTranslationKey = (categoryId: SuggestionCategoryId) =>
  `inventorySuggestions.categories.${categoryId}`;

const itemTranslationKey = (suggestionId: InventoryItemSuggestion['id']) =>
  `inventorySuggestions.items.${suggestionId}`;

function translateWithFallback(t: SuggestionTranslator, key: string, defaultValue: string): string {
  const translated = t(key, { defaultValue });
  return translated === key ? defaultValue : translated;
}

function localizeCategory(
  category: SuggestionCategory,
  t: SuggestionTranslator,
): LocalizedSuggestionCategory {
  const translationKey = categoryTranslationKey(category.id);

  return {
    ...category,
    name: translateWithFallback(t, translationKey, category.name),
    defaultName: category.name,
    translationKey,
  };
}

function localizeSuggestion(
  suggestion: InventoryItemSuggestion,
  t: SuggestionTranslator,
): LocalizedInventoryItemSuggestion {
  const translationKey = itemTranslationKey(suggestion.id);

  return {
    ...suggestion,
    name: translateWithFallback(t, translationKey, suggestion.name),
    defaultName: suggestion.name,
    translationKey,
  };
}

export function getLocalizedInventorySuggestions(
  t: SuggestionTranslator,
): LocalizedInventoryItemSuggestion[] {
  return inventoryItemSuggestions.map((suggestion) => localizeSuggestion(suggestion, t));
}

export function getLocalizedSuggestionCategories(
  t: SuggestionTranslator,
): LocalizedSuggestionCategory[] {
  return suggestionCategories.map((category) => localizeCategory(category, t));
}

export function getLocalizedInventorySuggestionGroups(
  t: SuggestionTranslator,
): InventoryItemSuggestionGroup[] {
  const suggestionsByCategory = new Map<SuggestionCategoryId, LocalizedInventoryItemSuggestion[]>();

  for (const suggestion of inventoryItemSuggestions) {
    const localizedSuggestion = localizeSuggestion(suggestion, t);
    const suggestions = suggestionsByCategory.get(suggestion.categoryId) ?? [];
    suggestions.push(localizedSuggestion);
    suggestionsByCategory.set(suggestion.categoryId, suggestions);
  }

  return suggestionCategories.map((category) => ({
    category: localizeCategory(category, t),
    suggestions: suggestionsByCategory.get(category.id) ?? [],
  }));
}
