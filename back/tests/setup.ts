import { closeDatabase, initializeDatabase } from '../src/config/db';
import { config } from 'dotenv';
import { jest } from '@jest/globals';
import { beforeAll, afterAll } from '@jest/globals';
config({ path: '.env.test' });

beforeAll(async () => {
  await initializeDatabase(true); // true for test mode
});

afterAll(async () => {
  await closeDatabase();
});