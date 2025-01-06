import { NextResponse } from 'next/server';
import { db } from 'lib/db';
import fs from 'node:fs';
import path from 'node:path';

export async function POST() {
  try {
    const migrationDir = path.join(process.cwd(), 'lib/migrations');
    const migrationFiles = fs.readdirSync(migrationDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of migrationFiles) {
      const filePath = path.join(migrationDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      console.log(`Running migration: ${file}`);
      await db.query(sql);
      console.log(`Migration ${file} completed successfully`);
    }

    return NextResponse.json(
      { message: 'Migrations completed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json(
      { message: 'Migration failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}