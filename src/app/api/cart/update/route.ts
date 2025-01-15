import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getToken } from '@/utils/auth';

export async function POST(request: Request) {
  const customerId = await getToken();

  if (!customerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { product_id, quantity } = await request.json();

    if (!product_id || typeof product_id !== 'number' || !quantity) {
      return NextResponse.json(
        { error: 'Valid numeric Product ID and quantity are required' },
        { status: 400 }
      );
    }

    if (typeof quantity !== 'number' || quantity < 1 || quantity > 100) {
      return NextResponse.json(
        { error: 'Quantity must be a number between 1 and 100' },
        { status: 400 }
      );
    }

    // Verify product exists
    const productCheck = await db.query(
      `SELECT product_id FROM products WHERE product_id = $1`,
      [product_id]
    );
    
    if (productCheck.rowCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update the quantity of the item in the cart
    const query = `
      UPDATE order_items
      SET quantity = $1
      WHERE product_id = $2
      AND order_id = (
        SELECT order_id 
        FROM orders 
        WHERE customer_id = $3 
          AND status = 'pending' 
        LIMIT 1
      )
      RETURNING *;
    `;
    
    const result = await db.query(query, [quantity, product_id, customerId]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating cart item:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { 
        error: 'Failed to update cart item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
