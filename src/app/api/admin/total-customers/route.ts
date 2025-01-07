import { NextResponse } from 'next/server.js';
import pool from '../../../../../lib/db.ts';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) AS total_customers FROM customers');
    client.release();
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching total customers:', error);
    return NextResponse.json({ error: 'Failed to fetch total customers' }, { status: 500 });
  }
}
