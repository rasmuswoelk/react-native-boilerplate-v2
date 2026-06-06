// src/database/powersync.ts
import { DrizzleAppSchema } from '@powersync/drizzle-driver';
import * as drizzleSchema from './schema';

export const AppSchema = new DrizzleAppSchema(drizzleSchema);
