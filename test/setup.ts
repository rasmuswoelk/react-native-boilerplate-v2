(global as any).IS_REACT_ACT_ENVIRONMENT = true;

beforeAll(() => {
  const originalError = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('react-test-renderer is deprecated'))
      return;
    originalError(...args);
  };
});

afterEach(() => {
  jest.clearAllMocks();
});
