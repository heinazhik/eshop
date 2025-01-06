import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT SUM(total_amount) FROM orders');
    client.release();
    return NextResponse.json({ totalSales: result.rows[0]?.sum || 0 });
  } catch (error) {
    console.error('Error fetching total sales:', error);
    return NextResponse.json({ error: 'Failed to fetch total sales' }, { status: 500 });
  }
}
