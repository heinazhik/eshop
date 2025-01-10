import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

const CUSTOMER_ID = 1; // Use a dynamic way to identify user later
const CART_STATUS = 'Pending';

export async function POST(request: Request) {
  const { product_id, quantity } = await request.json();

  try {
    // Validate product_id and quantity
    if (!product_id || !quantity) {
      return NextResponse.json({ error: 'Product ID and quantity are required' }, { status: 400 });
    }

    // Check if a pending order exists for the current user
    const pendingOrderQuery = `
      SELECT order_id FROM orders 
      WHERE customer_id = $1 
      AND status = $2 
      LIMIT 1;
    `;
    const pendingOrderResult = await db.query(pendingOrderQuery, [CUSTOMER_ID, CART_STATUS]);

    let orderId;

    if (pendingOrderResult.rows.length > 0) {
      // Use the existing pending order
      orderId = pendingOrderResult.rows[0].order_id;

      // Check if the product is already in the cart
      const existingItemQuery = `
        SELECT order_item_id 
        FROM order_items 
        WHERE order_id = $1 
        AND product_id = $2;
      `;
      const existingItemResult = await db.query(existingItemQuery, [orderId, product_id]);

      if (existingItemResult.rows.length > 0) {
        // Update the quantity of the existing item
        const orderItemId = existingItemResult.rows[0].order_item_id;
        const updateOrderItemQuery = `
          UPDATE order_items
          SET quantity = quantity + $1
          WHERE order_item_id = $2;
        `;
        await db.query(updateOrderItemQuery, [quantity, orderItemId]);
      } else {
        // Add the product to the cart
        const productPriceQuery = `
          SELECT price 
          FROM products 
          WHERE product_id = $1;
        `;
        const priceResult = await db.query(productPriceQuery, [product_id]);
        const price = priceResult.rows[0]?.price;

        if (!price) {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const insertOrderItemQuery = `
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES ($1, $2, $3, $4);
        `;
        await db.query(insertOrderItemQuery, [orderId, product_id, quantity, price]);
      }
    } else {
      // Create a new pending order
      const createOrderQuery = `
        INSERT INTO orders (customer_id, status, total_amount, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING order_id;
      `;
      const createOrderResult = await db.query(createOrderQuery, [CUSTOMER_ID, CART_STATUS, 0]);
      orderId = createOrderResult.rows[0].order_id;

      // Add the product to the new order
      const productPriceQuery = `
        SELECT price 
        FROM products 
        WHERE product_id = $1;
      `;
      const priceResult = await db.query(productPriceQuery, [product_id]);
      const price = priceResult.rows[0]?.price;

      if (!price) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      const insertOrderItemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4);
      `;
      await db.query(insertOrderItemQuery, [orderId, product_id, quantity, price]);
    }

    // Fetch the updated cart items
    const updatedCartItems = await fetchCartItems(CUSTOMER_ID, CART_STATUS);
    return NextResponse.json({ data: updatedCartItems });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
}

// Helper function to fetch updated cart items
async function fetchCartItems(customer_id: number, cart_status: string) {
  const result = await db.query(
    `
    SELECT
      oi.product_id,
      p.name,
      oi.quantity,
      oi.price,
      p.image_url
    FROM
      orders o
    JOIN
      order_items oi ON o.order_id = oi.order_id
    JOIN
      products p ON oi.product_id = p.product_id
    WHERE
      o.customer_id = $1 
      AND o.status = $2;
    `,
    [customer_id, cart_status]
  );
  return result.rows;
}
