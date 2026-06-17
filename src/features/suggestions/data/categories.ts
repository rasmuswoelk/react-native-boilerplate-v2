import type { SuggestionCategory } from '../types';

export const suggestionCategories = [
  {
    id: 'essentials',
    name: 'Essentials',
    icon: { set: 'MaterialCommunityIcons', name: 'star-outline' },
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: { set: 'MaterialCommunityIcons', name: 'tshirt-crew-outline' },
  },
  {
    id: 'footwear',
    name: 'Footwear',
    icon: { set: 'MaterialCommunityIcons', name: 'shoe-sneaker' },
  },
  {
    id: 'toiletries',
    name: 'Toiletries',
    icon: { set: 'MaterialCommunityIcons', name: 'toothbrush' },
  },
  {
    id: 'health',
    name: 'Health',
    icon: { set: 'MaterialCommunityIcons', name: 'medical-bag' },
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: { set: 'MaterialCommunityIcons', name: 'laptop' },
  },
  {
    id: 'travel_gear',
    name: 'Travel Gear',
    icon: { set: 'MaterialCommunityIcons', name: 'bag-suitcase-outline' },
  },
  {
    id: 'weather_gear',
    name: 'Weather Gear',
    icon: { set: 'MaterialCommunityIcons', name: 'weather-partly-cloudy' },
  },
  {
    id: 'activities',
    name: 'Activities',
    icon: { set: 'MaterialCommunityIcons', name: 'swim' },
  },
  {
    id: 'food_drink',
    name: 'Food & Drink',
    icon: { set: 'MaterialCommunityIcons', name: 'silverware-fork-knife' },
  },
  {
    id: 'baby_kids',
    name: 'Baby & Kids',
    icon: { set: 'MaterialCommunityIcons', name: 'baby-face-outline' },
  },
  {
    id: 'pets',
    name: 'Pets',
    icon: { set: 'MaterialCommunityIcons', name: 'paw-outline' },
  },
  {
    id: 'work',
    name: 'Work',
    icon: { set: 'MaterialCommunityIcons', name: 'briefcase-outline' },
  },
  {
    id: 'safety',
    name: 'Safety',
    icon: { set: 'MaterialCommunityIcons', name: 'shield-check-outline' },
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    icon: { set: 'MaterialCommunityIcons', name: 'dots-horizontal' },
  },
] as const satisfies readonly SuggestionCategory[];
