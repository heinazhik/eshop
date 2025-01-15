import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getToken } from '@/utils/auth';

export async function DELETE(request: Request) {
  const customerId = await getToken();

  if (!customerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { productId } = await request.json();

    if (!productId || typeof productId !== 'number') {
      return NextResponse.json(
        { error: 'Valid numeric Product ID is required' },
        { status: 400 }
      );
    }

    // Verify product exists
    const productCheck = await db.query(
      `SELECT product_id FROM products WHERE product_id = $1`,
      [productId]
    );
    
    if (productCheck.rowCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Remove the item from the cart
    const query = `
      DELETE FROM order_items
      WHERE product_id = $1
      AND order_id = (
        SELECT order_id 
        FROM orders 
        WHERE customer_id = $2 
          AND status = 'pending' 
        LIMIT 1
      )
      RETURNING *;
    `;
    
    const result = await db.query(query, [productId, customerId]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      removedItem: result.rows[0]
    });
  } catch (error) {
    console.error('Error removing cart item:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { 
        error: 'Failed to remove cart item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
