import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const categoryPath = resolve(root, 'src/features/suggestions/data/categories.ts');
const inventoryPaths = [
  resolve(root, 'src/features/suggestions/data/inventory-item-suggestions.ts'),
];

function read(path) {
  if (!existsSync(path)) {
    throw new Error(`Missing suggestions file: ${path}`);
  }

  return readFileSync(path, 'utf8');
}

function readIds(text) {
  return [...text.matchAll(/id:\s*'([^']+)'/g)].map((match) => match[1]);
}

function readInventoryRecords(text) {
  const records = [];
  const objectPattern = /\{[\s\S]*?id:\s*'[^']+'[\s\S]*?\},/g;

  for (const objectMatch of text.matchAll(objectPattern)) {
    const objectText = objectMatch[0];
    const idMatch = objectText.match(/id:\s*'([^']+)'/);
    const categoryMatch = objectText.match(/categoryId:\s*'([^']+)'/);
    const nameMatch = objectText.match(/name:\s*(['"])(.*?)\1/);
    const weightMatch = objectText.match(/estimatedWeightGrams:\s*(\d+)/);

    if (!idMatch || !categoryMatch || !nameMatch || !weightMatch) {
      throw new Error(`Invalid inventory suggestion record: ${objectText}`);
    }

    records.push({
      id: idMatch[1],
      categoryId: categoryMatch[1],
      name: nameMatch[2],
      estimatedWeightGrams: Number(weightMatch[1]),
    });
  }

  return records;
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
}

const categoryText = read(categoryPath);
const categoryIds = readIds(categoryText);
const duplicateCategoryIds = findDuplicates(categoryIds);

if (duplicateCategoryIds.length > 0) {
  throw new Error(`Duplicate suggestion category IDs: ${duplicateCategoryIds.join(', ')}`);
}

const categoryIdSet = new Set(categoryIds);
const records = inventoryPaths.flatMap((path) => readInventoryRecords(read(path)));
const inventoryIds = records.map((record) => record.id);
const duplicateInventoryIds = findDuplicates(inventoryIds);

if (duplicateInventoryIds.length > 0) {
  throw new Error(`Duplicate inventory suggestion IDs: ${duplicateInventoryIds.join(', ')}`);
}

const unknownCategories = records.filter((record) => !categoryIdSet.has(record.categoryId));

if (unknownCategories.length > 0) {
  throw new Error(
    `Inventory suggestions reference unknown categories: ${unknownCategories
      .map((record) => `${record.id} -> ${record.categoryId}`)
      .join(', ')}`,
  );
}

const invalidRecords = records.filter(
  (record) => record.name.trim() === '' || record.estimatedWeightGrams <= 0,
);

if (invalidRecords.length > 0) {
  throw new Error(
    `Inventory suggestions with invalid names or weights: ${invalidRecords
      .map((record) => record.id)
      .join(', ')}`,
  );
}

console.log(
  `Verified ${categoryIds.length} suggestion categories and ${records.length} inventory item suggestions.`,
);
