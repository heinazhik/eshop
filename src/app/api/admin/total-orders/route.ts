import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) AS total_orders FROM orders');
    client.release();
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching total orders:', error);
    return NextResponse.json({ error: 'Failed to fetch total orders' }, { status: 500 });
  }
}
