import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function connectDatabase() {
  try {
    await pool.getConnection();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// Test database setup
export async function initializeTestDatabase() {
  const adminPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  await adminPool.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
  await adminPool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
  await adminPool.end();

  await pool.query(`
    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    )
  `);
}

export default pool;