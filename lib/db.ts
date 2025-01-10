import pg from 'pg';
const { Pool } = pg;

// Create a new connection pool
const pool = new Pool({
  user: 'admin', // Explicitly use admin user
  host: process.env.DB_HOST,
  database: process.env.DB_NAME || 'ecommerce_db',
  password: 'admin123', // Explicit password from .env
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Export query method for running queries
export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params)
};

// Export the pool for transactions
export const getPool = () => pool;
