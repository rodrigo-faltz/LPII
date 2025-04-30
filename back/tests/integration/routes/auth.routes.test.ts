// tests/integration/routes/auth.routes.test.ts
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { beforeAll, afterAll, beforeEach, afterEach, describe, it } from '@jest/globals';
import request from 'supertest';

// 1. Load test environment FIRST
dotenv.config({ path: '.env.test' });

// 2. Import app and pool AFTER environment is configured
import app from '../../../src/app';
import pool from '../../../src/config/db';
import expect from 'expect';

describe("Auth Routes Integration Tests", () => {
  let connection: mysql.PoolConnection;

  // Verify environment
  console.log('Using DB:', process.env.DB_NAME); // Add this to debug

  beforeAll(async () => {
    // 3. Verify test database connection
    connection = await pool.getConnection();
    await connection.query('CREATE TABLE IF NOT EXISTS test_users LIKE users');
  });

  beforeEach(async () => {
    await connection.beginTransaction();
  });

  afterEach(async () => {
    await connection.rollback();
  });

  afterAll(async () => {
    await connection.query('DROP TABLE IF EXISTS test_users');
    connection.release();
    await pool.end();
  });

  it("should register user in test environment", async () => {
    const randomString = Math.random().toString(36).substring(2, 12);
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: `testuser_${randomString}`,
        password: "Test@123",
        email: `test_${randomString}@example.com`
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});