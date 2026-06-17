export { suggestionCategories } from './data/categories';
export { inventoryItemSuggestions } from './data/inventory-item-suggestions';
export type {
  InventoryItemSuggestion,
  InventoryItemSuggestionGroup,
  InventorySuggestionAvailability,
  LocalizedInventoryItemSuggestion,
  LocalizedSuggestionCategory,
  SuggestionCategory,
  SuggestionCategoryIcon,
  SuggestionCategoryId,
} from './types';
export type { SuggestionTranslator } from './utils/get-localized-inventory-suggestions';
export {
  getLocalizedInventorySuggestionGroups,
  getLocalizedInventorySuggestions,
  getLocalizedSuggestionCategories,
} from './utils/get-localized-inventory-suggestions';
export {
  type ExistingInventorySuggestionMatch,
  getSuggestionAvailability,
  type SuggestionAvailabilityOptions,
} from './utils/get-suggestion-availability';
