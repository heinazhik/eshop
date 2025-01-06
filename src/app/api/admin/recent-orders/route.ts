import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT
        o.order_id,
        u.name AS customer_name,
        o.created_at,
        os.status,
        SUM(oi.quantity * p.price) AS total_amount
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      JOIN order_statuses os ON o.order_status_id = os.order_status_id
      GROUP BY o.order_id, u.name, o.created_at, os.status
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
