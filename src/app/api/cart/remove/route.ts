import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const { productId } =  await request.json();

  try {
    // Remove the item from the cart
    const query = `
      DELETE FROM order_items
      WHERE product_id = $1
      AND order_id = (SELECT order_id FROM orders WHERE status = 'pending' LIMIT 1);
    `;
    await db.query(query, [productId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove cart item' }, { status: 500 });
  }
}
