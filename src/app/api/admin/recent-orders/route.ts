import { NextResponse } from 'next/server.js';
import pool from '../../../../../lib/db.ts';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT
        o.order_id,
        c.name AS customer_name,
        o.created_at,
        o.status,
        o.total_amount
      FROM orders o
      JOIN customers c ON o.customer_id = c.customer_id
      GROUP BY o.order_id, c.name, o.created_at, o.status
      ORDER BY o.created_at DESC
      LIMIT 5
    `);
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return NextResponse.json({ error: 'Failed to fetch recent orders' }, { status: 500 });
  }
}
