import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { product_id, quantity } = await request.json();

  try {
    // Update the quantity of the item in the cart
    const query = `
      UPDATE order_items
      SET quantity = $1
      WHERE product_id = $2
      AND order_id = (SELECT order_id FROM orders WHERE status = 'pending' LIMIT 1);
    `;
    await db.query(query, [quantity, product_id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 });
  }
}
