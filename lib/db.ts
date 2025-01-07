import pg from 'pg';
const { Pool } = pg;

console.log('Database connection config:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD ? '*****' : undefined,
  port: process.env.DB_PORT
});

const dbConfig = {
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'ecommerce_db',
  password: String(process.env.DB_PASSWORD || 'admin123'),
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false
  }
};

console.log('Database connection config:', {
  ...dbConfig,
  password: dbConfig.password ? '*****' : undefined
});

const pool = new Pool(dbConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('Connected to database');
});

interface Category {
  category_id: number;
  name: string;
}

interface BlogPost {
  post_id: number;
  title: string;
}

export const getBlogCategories = async () => {
  const result = await pool.query('SELECT category_id, name FROM Blog_Categories');
  return result.rows.map((row: { name: string }) => row.name);
};

export const getRecentPosts = async () => {
  const result = await pool.query(`
    SELECT post_id, title 
    FROM Blog_Posts 
    ORDER BY published_at DESC 
    LIMIT 5
  `);
  return result.rows;
};

export const db = pool;
export default pool;
