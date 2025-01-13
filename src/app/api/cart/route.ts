import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth'; // Import the auth utility

// Helper function to get the current user ID
async function getCurrentUserId() {
  const session = await auth();
  return session?.user?.id; // Adjust based on your actual session structure
}

export async function GET() {
  const customerId = await getCurrentUserId();

  if (!customerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch cart items for the current user
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
        oi.order_id = (SELECT order_id FROM orders WHERE customer_id = $1 AND status = 'pending' LIMIT 1);
    `;
    const result = await db.query(query, [customerId]);
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}
