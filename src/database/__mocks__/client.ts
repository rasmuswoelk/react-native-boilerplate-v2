const deleteMock = jest.fn(() => ({
  where: jest.fn(),
}));

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
  delete: deleteMock,
  transaction: jest.fn(async (fn: (tx: typeof db) => Promise<void>) => {
    await fn(db);
  }),
};
