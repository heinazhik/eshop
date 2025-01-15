import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getToken } from '@/utils/auth';

export async function POST(req: Request) {
  const customerId = await getToken();

  if (!customerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { product_id, quantity } = await req.json();

    if (!product_id || typeof product_id !== 'number' || !quantity) {
      return NextResponse.json(
        { error: 'Valid numeric Product ID and quantity are required' },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be a positive number' },
        { status: 400 }
      );
    }

    // Check for existing pending order
    const pendingOrder = await db.query(
      `SELECT order_id FROM orders 
       WHERE customer_id = $1 AND status = 'pending' 
       LIMIT 1`,
      [customerId]
    );

    let orderId;
    if (pendingOrder.rows.length > 0) {
      orderId = pendingOrder.rows[0].order_id;
    } else {
      // Create new pending order
      const newOrder = await db.query(
        `INSERT INTO orders 
         (customer_id, total_amount, status, created_at)
         VALUES ($1, 0, 'pending', NOW())
         RETURNING order_id`,
        [customerId]
      );
      orderId = newOrder.rows[0].order_id;
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

    // Add item to order
    const result = await db.query(
      `INSERT INTO order_items 
       (order_id, product_id, quantity, price)
       VALUES ($1, $2, $3, 
         (SELECT price FROM products WHERE product_id = $2))
       RETURNING *`,
      [orderId, product_id, quantity]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding to cart:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { 
        error: 'Could not add item to cart',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
