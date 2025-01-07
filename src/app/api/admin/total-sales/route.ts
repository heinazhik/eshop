import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT SUM(oi.quantity * p.price) AS total_sales
      FROM order_items oi
      JOIN products p ON oi.product_id = p.product_id
    `);
    client.release();
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching total sales:', error);
    return NextResponse.json({ error: 'Failed to fetch total sales' }, { status: 500 });
  }
}
