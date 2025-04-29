import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create connection to the database
export async function createConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

export async function connectDatabase() {
  createConnection().catch((err) => {
    console.error("Fatal: Database connection failed", err);
    process.exit(1);
  });

  try {
    await pool.getConnection();

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

// Test database setup
export async function initializeTestDatabase() {
  const adminPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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

export interface QueryResult<T = any> {
  affectedRows?: number;
  insertId?: number;
  rows: T[];
}

export default pool;
