jest.mock('@/src/database/client');
jest.mock('drizzle-orm');

import {
  createTrip,
  createTripLocation,
  deleteTrip,
  deleteTripLocation,
  getTripById,
  updateTrip,
  updateTripLocation,
} from './queries';
import { db } from '@/src/database/client';
import { eq } from 'drizzle-orm';

const mockReturning = jest.fn() as any;
const mockWhere = jest.fn(() => ({ returning: mockReturning })) as any;
const mockSet = jest.fn(() => ({ where: mockWhere })) as any;
const mockValues = jest.fn(() => ({ returning: mockReturning })) as any;
const mockInsert = jest.fn(() => ({ values: mockValues })) as any;
const mockUpdate = jest.fn(() => ({ set: mockSet })) as any;
const mockDelete = jest.fn(() => ({ where: mockWhere })) as any;
const mockFrom = jest.fn(() => ({ where: mockWhere })) as any;
const mockSelect = jest.fn(() => ({ from: mockFrom })) as any;

(db as any).insert = mockInsert;
(db as any).update = mockUpdate;
(db as any).delete = mockDelete;
(db as any).select = mockSelect;
(eq as jest.Mock).mockImplementation(jest.fn());

const now = Date.now();
const mockTrip = {
  id: 'trip-1',
  name: 'Tokyo Trip',
  destination: 'Tokyo',
  startDate: now,
  endDate: now,
  tripType: null,
  status: 'upcoming' as const,
  notes: null,
  createdAt: now,
  updatedAt: now,
};

describe('trip queries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('createTrip inserts and returns new record', async () => {
    mockReturning.mockResolvedValueOnce([mockTrip]);
    const result = await createTrip({ id: 'trip-1', name: 'Tokyo Trip', status: 'upcoming', createdAt: now, updatedAt: now });
    expect(mockInsert).toHaveBeenCalled();
    expect(result).toEqual(mockTrip);
  });

  it('updateTrip updates and returns updated record', async () => {
    mockReturning.mockResolvedValueOnce([{ ...mockTrip, status: 'active' }]);
    const result = await updateTrip('trip-1', { status: 'active', updatedAt: now });
    expect(result.status).toBe('active');
  });

  it('deleteTrip removes the record', async () => {
    mockWhere.mockResolvedValueOnce(null);
    await deleteTrip('trip-1');
    expect(mockDelete).toHaveBeenCalled();
  });

  it('getTripById returns null when not found', async () => {
    mockWhere.mockResolvedValueOnce([]);
    const result = await getTripById('not-found');
    expect(result).toBeNull();
  });

  it('createTripLocation inserts and returns new record', async () => {
    const mockLocation = { id: 'loc-1', tripId: 'trip-1', name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, arrival: null, departure: null, sortOrder: 0, notes: null, createdAt: now, updatedAt: now };
    mockReturning.mockResolvedValueOnce([mockLocation]);
    const result = await createTripLocation({ id: 'loc-1', tripId: 'trip-1', name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, sortOrder: 0, createdAt: now, updatedAt: now });
    expect(result).toEqual(mockLocation);
  });
});
