import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch cart items for the current user (assuming customer_id = 1 for now)
    const query = `
      SELECT
        oi.order_item_id,
        oi.product_id,
        p.name,
        p.price,
        oi.quantity,
        p.image_url
      FROM
        order_items oi
      JOIN
        products p ON oi.product_id = p.product_id
      WHERE
        oi.order_id = (SELECT order_id FROM orders WHERE status = 'pending' LIMIT 1);
    `;
    const result = await db.query(query);
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}
