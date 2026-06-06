// src/database/providers/DatabaseContext.ts
import { createContext, useContext } from 'react';
import type { db } from '../client';

type DrizzleDb = typeof db;

export const DatabaseContext = createContext<DrizzleDb | null>(null);

export function useDatabase(): DrizzleDb {
  const context = useContext(DatabaseContext);
  if (!context) throw new Error('useDatabase must be used within DatabaseProvider');
  return context;
}
