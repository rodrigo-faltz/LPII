// tests/integration/routes/auth.routes.test.ts
import request from 'supertest';
import app from '../../../src/index';
import pool from '../../../src/config/db';
import mysql from 'mysql2/promise';
import { beforeAll, afterAll } from '@jest/globals';
import dotenv from 'dotenv';
import { describe } from '@jest/globals';
import { beforeEach, afterEach, it, expect } from '@jest/globals';
dotenv.config({ path: '.env.test' });

describe('Auth Routes Integration Tests', () => {
  let connection: mysql.PoolConnection;

  beforeAll(async () => {
    connection = await pool.getConnection();
  });

  beforeEach(async () => {
    await connection.beginTransaction();
  });

  afterEach(async () => {
    await connection.rollback();
  });

  afterAll(async () => {
    connection.release();
    await pool.end();
  });

  it('should register user in isolated environment', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: Math.random().toString(36).substring(2, 12),
        password: 'Test@123',
        email: `test${Math.random().toString(36).substring(2, 12)}@example.com`
      });

    expect(response.status).toBe(201);
    
  });
});