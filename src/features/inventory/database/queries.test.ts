jest.mock('@/src/database/client');
jest.mock('drizzle-orm', () => ({ eq: jest.fn() }));

import { db } from '@/src/database/client';
import {
  createInventoryItem,
  deleteInventoryItem,
  getInventoryItemById,
  updateInventoryItem,
} from './queries';

const now = Date.now();
const mockItem = {
  id: 'item-1',
  categoryId: null,
  name: 'Passport',
  description: null,
  weightGrams: null,
  quantity: 1,
  notes: null,
  tags: '[]',
  createdAt: now,
  updatedAt: now,
};

describe('inventory item queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('createInventoryItem inserts and returns new record', async () => {
    const mockReturning = jest.fn().mockResolvedValueOnce([mockItem]);
    const mockValues = jest.fn(() => ({ returning: mockReturning }));
    (db.insert as jest.Mock).mockReturnValueOnce({ values: mockValues });

    const result = await createInventoryItem({ id: 'item-1', name: 'Passport', tags: '[]', quantity: 1, createdAt: now, updatedAt: now });
    expect(db.insert).toHaveBeenCalled();
    expect(result).toEqual(mockItem);
  });

  it('updateInventoryItem updates and returns updated record', async () => {
    const updatedMockItem = { ...mockItem, name: 'Updated Passport' };
    const mockReturning = jest.fn().mockResolvedValueOnce([updatedMockItem]);
    const mockWhere = jest.fn(() => ({ returning: mockReturning }));
    const mockSet = jest.fn(() => ({ where: mockWhere }));
    (db.update as jest.Mock).mockReturnValueOnce({ set: mockSet });

    const result = await updateInventoryItem('item-1', { name: 'Updated Passport', updatedAt: now });
    expect(result.name).toBe('Updated Passport');
  });

  it('deleteInventoryItem removes the record', async () => {
    const mockWhere = jest.fn().mockResolvedValueOnce(undefined);
    (db.delete as jest.Mock).mockReturnValueOnce({ where: mockWhere });

    await deleteInventoryItem('item-1');
    expect(db.delete).toHaveBeenCalled();
  });

  it('getInventoryItemById returns null when not found', async () => {
    const mockWhere = jest.fn().mockResolvedValueOnce([]);
    const mockFrom = jest.fn(() => ({ where: mockWhere }));
    (db.select as jest.Mock).mockReturnValueOnce({ from: mockFrom });

    const result = await getInventoryItemById('not-found');
    expect(result).toBeNull();
  });
});
