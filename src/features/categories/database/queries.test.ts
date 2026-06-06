jest.mock('@/src/database/client', () => {
  const mockReturning = jest.fn();
  const mockWhere = jest.fn(() => ({ returning: mockReturning }));
  const mockSet = jest.fn(() => ({ where: mockWhere }));
  const mockValues = jest.fn(() => ({ returning: mockReturning }));
  const mockInsert = jest.fn(() => ({ values: mockValues }));
  const mockUpdate = jest.fn(() => ({ set: mockSet }));
  const mockDelete = jest.fn(() => ({ where: mockWhere }));
  const mockLimit = jest.fn(() => ({ where: mockWhere }));
  const mockFrom = jest.fn(() => ({ where: mockWhere, limit: mockLimit }));
  const mockSelect = jest.fn(() => ({ from: mockFrom }));

  return {
    db: {
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
      select: mockSelect,
    },
    mockReturning,
    mockWhere,
    mockSet,
    mockValues,
    mockInsert,
    mockUpdate,
    mockDelete,
    mockSelect,
  };
});

jest.mock('drizzle-orm', () => ({ eq: jest.fn() }));

import { createCategory, deleteCategory, getCategoryById, updateCategory } from './queries';
import * as clientModule from '@/src/database/client';

const mockClient = clientModule as any;
const mockReturning = mockClient.mockReturning;
const mockWhere = mockClient.mockWhere;
const mockSet = mockClient.mockSet;
const mockValues = mockClient.mockValues;
const mockInsert = mockClient.mockInsert;
const mockUpdate = mockClient.mockUpdate;
const mockDelete = mockClient.mockDelete;
const mockSelect = mockClient.mockSelect;

const now = Date.now();
const mockCategory = { id: 'cat-1', name: 'Clothing', icon: null, createdAt: now, updatedAt: now };

describe('category queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('createCategory inserts and returns the new record', async () => {
    mockReturning.mockResolvedValueOnce([mockCategory]);
    const result = await createCategory({ id: 'cat-1', name: 'Clothing', createdAt: now, updatedAt: now });
    expect(mockInsert).toHaveBeenCalled();
    expect(result).toEqual(mockCategory);
  });

  it('updateCategory updates and returns the updated record', async () => {
    mockReturning.mockResolvedValueOnce([{ ...mockCategory, name: 'Updated' }]);
    const result = await updateCategory('cat-1', { name: 'Updated', updatedAt: now });
    expect(mockUpdate).toHaveBeenCalled();
    expect(result.name).toBe('Updated');
  });

  it('deleteCategory removes the record', async () => {
    mockWhere.mockResolvedValueOnce(undefined);
    await deleteCategory('cat-1');
    expect(mockDelete).toHaveBeenCalled();
  });

  it('getCategoryById returns null when not found', async () => {
    mockWhere.mockResolvedValueOnce([]);
    const result = await getCategoryById('not-found');
    expect(result).toBeNull();
  });

  it('getCategoryById returns the category when found', async () => {
    mockWhere.mockResolvedValueOnce([mockCategory]);
    const result = await getCategoryById('cat-1');
    expect(result).toEqual(mockCategory);
  });
});
