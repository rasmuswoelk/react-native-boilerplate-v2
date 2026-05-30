import { afterEach, beforeAll, vi } from 'vitest'

// react-test-renderer requires this to silence the act() environment warning
;(global as any).IS_REACT_ACT_ENVIRONMENT = true

beforeAll(() => {
  const originalError = console.error.bind(console)
  console.error = (...args: unknown[]) => {
    // react-test-renderer is deprecated in React 19 but still functional
    if (typeof args[0] === 'string' && args[0].includes('react-test-renderer is deprecated')) return
    originalError(...args)
  }
})

afterEach(() => {
  vi.clearAllMocks()
})
