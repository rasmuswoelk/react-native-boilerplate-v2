// src/database/providers/DatabaseProvider.test.tsx
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import * as databaseClient from '@/src/database/client';
import { DatabaseProvider } from './DatabaseProvider';

jest.mock('@/src/database/client', () => ({
  powerSyncDb: {
    init: jest.fn().mockResolvedValue(undefined),
  },
  db: {},
}));

jest.mock('@/src/database/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@powersync/react-native', () => ({
  PowerSyncContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}));

describe('DatabaseProvider', () => {
  it('renders children once database is ready', async () => {
    const { getByText } = render(
      <DatabaseProvider>
        <Text>ready</Text>
      </DatabaseProvider>,
    );
    await waitFor(() => expect(getByText('ready')).toBeTruthy());
  });

  it('renders error message when init fails', async () => {
    jest.mocked(databaseClient.powerSyncDb.init).mockRejectedValueOnce(new Error('DB failed'));

    const { getByText } = render(
      <DatabaseProvider>
        <Text>ready</Text>
      </DatabaseProvider>,
    );
    await waitFor(() => expect(getByText(/Database failed to initialize: DB failed/)).toBeTruthy());
  });
});
