import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) FROM customers');
    client.release();
    return NextResponse.json({ totalCustomers: result.rows[0]?.count || 0 });
  } catch (error) {
    console.error('Error fetching total customers:', error);
    return NextResponse.json({ error: 'Failed to fetch total customers' }, { status: 500 });
  }
}
