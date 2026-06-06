export const db = {
  select: jest.fn(() => ({
    from: jest.fn(() => ({
      orderBy: jest.fn(),
      where: jest.fn(() => ({
        limit: jest.fn(),
      })),
    })),
  })),
};
