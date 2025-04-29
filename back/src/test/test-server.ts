import { initializeTestDatabase } from "../config/db";
import { config } from 'dotenv';
import pool from '../config/db';
import { beforeAll, afterAll } from '@jest/globals';
// Load environment variables from .env.test file
config({ path: '.env.test' });


beforeAll(async () => {
  await initializeTestDatabase();
});

afterAll(async () => {
  await pool.end();
});