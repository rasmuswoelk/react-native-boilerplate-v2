// src/database/client.ts
import { wrapPowerSyncWithDrizzle } from '@powersync/drizzle-driver';
import { OPSqliteOpenFactory } from '@powersync/op-sqlite';
import { PowerSyncDatabase } from '@powersync/react-native';
import { AppSchema } from './powersync';
import * as drizzleSchema from './schema';

export const powerSyncDb = new PowerSyncDatabase({
  schema: AppSchema,
  database: new OPSqliteOpenFactory({ dbFilename: 'mule.db' }),
});

export const db = wrapPowerSyncWithDrizzle(powerSyncDb, { schema: drizzleSchema });
