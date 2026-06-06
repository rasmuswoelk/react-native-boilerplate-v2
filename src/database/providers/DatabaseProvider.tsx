// src/database/providers/DatabaseProvider.tsx

import { PowerSyncContext } from '@powersync/react-native';
import { ReactNode, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { db, powerSyncDb } from '../client';
import { DatabaseContext } from './DatabaseContext';

type Props = { children: ReactNode };

export function DatabaseProvider({ children }: Props) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    powerSyncDb
      .init()
      .then(() => setReady(true))
      .catch((e: unknown) => setError(e instanceof Error ? e : new Error(String(e))));
  }, []);

  if (error) {
    return (
      <View>
        <Text>Database failed to initialize: {error.message}</Text>
      </View>
    );
  }

  if (!ready) return null;

  return (
    <PowerSyncContext.Provider value={powerSyncDb}>
      <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
    </PowerSyncContext.Provider>
  );
}
