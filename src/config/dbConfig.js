/**
 * Database Configuration
 * MySQL Connection Settings for AI Study Hub
 */

import mysql from 'mysql2/promise';

export const dbConfig = {
  host: 'describing-nat-orded-rehab.trycloudflare.com',
  port: 3306,
  user: 'root',
  password: '12345',
  database: 'Ai-study-hub',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

/**
 * Create MySQL Connection
 */
export async function createDatabaseConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected successfully');
    return connection;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
}

/**
 * Create Connection Pool (recommended for production)
 */
export function createDatabasePool() {
  try {
    const pool = mysql.createPool(dbConfig);
    console.log('✅ Database pool created successfully');
    return pool;
  } catch (error) {
    console.error('❌ Database pool creation failed:', error.message);
    throw error;
  }
}
