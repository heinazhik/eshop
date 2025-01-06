import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
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
  const result = await pool.query<Category>('SELECT category_id, name FROM Blog_Categories');
  return result.rows.map((row: Category) => row.name);
};

export const getRecentPosts = async () => {
  const result = await pool.query<BlogPost>(`
    SELECT post_id, title 
    FROM Blog_Posts 
    ORDER BY published_at DESC 
    LIMIT 5
  `);
  return result.rows;
};

export const db = pool;
