import type { InventorySuggestionAvailability, LocalizedInventoryItemSuggestion } from '../types';

export type ExistingInventorySuggestionMatch = {
  name?: string | null;
  sourceSuggestionId?: string | null;
};

export type SuggestionAvailabilityOptions = {
  matchByName?: boolean;
};

function normalizeName(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function getSuggestionAvailability(
  suggestions: readonly LocalizedInventoryItemSuggestion[],
  existingItems: readonly ExistingInventorySuggestionMatch[],
  options: SuggestionAvailabilityOptions = {},
): InventorySuggestionAvailability[] {
  const addedSourceIds = new Set(
    existingItems
      .map((item) => item.sourceSuggestionId)
      .filter((sourceSuggestionId): sourceSuggestionId is string => Boolean(sourceSuggestionId)),
  );
  const addedNames = options.matchByName
    ? new Set(
        existingItems
          .map((item) => item.name)
          .filter((name): name is string => Boolean(name))
          .map(normalizeName),
      )
    : null;

  return suggestions.map((suggestion) => ({
    ...suggestion,
    isAdded:
      addedSourceIds.has(suggestion.id) ||
      Boolean(addedNames?.has(normalizeName(suggestion.name))) ||
      Boolean(addedNames?.has(normalizeName(suggestion.defaultName))),
  }));
}
