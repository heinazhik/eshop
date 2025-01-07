import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
console.log('Loading environment variables from:', envPath);
dotenv.config({ path: envPath });

console.log('Environment variables:', {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD ? '*****' : undefined,
  DB_PORT: process.env.DB_PORT
});

import { db } from '../db.js';
import fs from 'fs';

async function runMigrations() {
  try {
    const migrationDir = new URL('.', import.meta.url).pathname;
    const migrationFiles = fs.readdirSync(migrationDir)
      .filter((file: string) => file.endsWith('.sql'))
      .sort();

    for (const file of migrationFiles) {
      const filePath = path.join(migrationDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      console.log(`Running migration: ${file}`);
      try {
        await db.query(sql);
        console.log(`Migration ${file} completed successfully`);
      } catch (error: any) {
        if (error.code === '42P07') { // Table already exists
          console.log(`Migration ${file} skipped (table already exists)`);
          continue;
        }
        throw error;
      }
    }
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

runMigrations();