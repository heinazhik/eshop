import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';

// Placeholder cart ID - replace with actual user's cart ID
const CART_ID = 1;

export async function POST(request: Request) {
  try {
    const { product_id, quantity } = await request.json();
    const client = await pool.connect();
    await client.query(
      'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3',
      [quantity, CART_ID, product_id]
    );
    client.release();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating item quantity in cart:', error);
    return NextResponse.json({ error: 'Failed to update item quantity in cart' }, { status: 500 });
  }
}
