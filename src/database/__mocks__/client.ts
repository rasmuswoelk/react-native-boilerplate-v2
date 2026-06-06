export const db = {
  select: jest.fn(() => ({
    from: jest.fn(() => ({
      orderBy: jest.fn(),
      where: jest.fn(() => ({
        limit: jest.fn(),
      })),
    })),
  })),
  insert: jest.fn(() => ({
    values: jest.fn(() => ({
      returning: jest.fn(),
    })),
  })),
  update: jest.fn(() => ({
    set: jest.fn(() => ({
      where: jest.fn(() => ({
        returning: jest.fn(),
      })),
    })),
  })),
  delete: jest.fn(() => ({
    where: jest.fn(),
  })),
};
