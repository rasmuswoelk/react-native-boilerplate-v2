import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'android', 'ios', '.expo', 'app-example'],
    coverage: {
      provider: 'v8',
      include: ['lib/**'],
      exclude: ['lib/**/*.d.ts', 'lib/**/__tests__/**'],
    },
  },
})
