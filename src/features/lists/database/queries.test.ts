import { db } from '@/src/database/client';
import { createList, deleteList, getListById, updateList } from './queries';

jest.mock('@/src/database/client');
jest.mock('drizzle-orm', () => ({ eq: jest.fn() }));

const now = Date.now();
const mockList = {
  id: 'list-1',
  name: 'Weekend Trip',
  description: null,
  tags: '[]',
  createdAt: now,
  updatedAt: now,
};

describe('packing list queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('createList inserts and returns new record', async () => {
    (db.insert as jest.Mock).mockReturnValueOnce({
      values: jest.fn().mockReturnValueOnce({
        returning: jest.fn().mockResolvedValueOnce([mockList]),
      }),
    });
    const result = await createList({
      id: 'list-1',
      name: 'Weekend Trip',
      tags: '[]',
      createdAt: now,
      updatedAt: now,
    });
    expect(db.insert).toHaveBeenCalled();
    expect(result).toEqual(mockList);
  });

  it('updateList updates and returns updated record', async () => {
    (db.update as jest.Mock).mockReturnValueOnce({
      set: jest.fn().mockReturnValueOnce({
        where: jest.fn().mockReturnValueOnce({
          returning: jest.fn().mockResolvedValueOnce([{ ...mockList, name: 'Updated' }]),
        }),
      }),
    });
    const result = await updateList('list-1', { name: 'Updated', updatedAt: now });
    expect(result.name).toBe('Updated');
  });

  it('deleteList removes the record', async () => {
    (db.delete as jest.Mock).mockReturnValueOnce({
      where: jest.fn().mockResolvedValueOnce(undefined),
    });
    await deleteList('list-1');
    expect(db.delete).toHaveBeenCalled();
  });

  it('getListById returns null when not found', async () => {
    (db.select as jest.Mock).mockReturnValueOnce({
      from: jest.fn().mockReturnValueOnce({
        where: jest.fn().mockResolvedValueOnce([]),
      }),
    });
    const result = await getListById('not-found');
    expect(result).toBeNull();
  });
});
