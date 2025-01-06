import { NextResponse } from 'next/server';
import { db as pool } from '../../../../lib/db';

// Assuming a single customer for now and their cart is the latest order with 'Pending' status
const CUSTOMER_ID = 1;
const CART_STATUS = 'Pending';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT
        oi.product_id,
        p.name,
        oi.quantity,
        oi.price
      FROM
        Orders o
      JOIN
        Order_Items oi ON o.order_id = oi.order_id
      JOIN
        Products p ON oi.product_id = p.product_id
      WHERE
        o.customer_id = $1 AND o.status = $2
      `,
      [CUSTOMER_ID, CART_STATUS]
    );
    client.release();
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}
