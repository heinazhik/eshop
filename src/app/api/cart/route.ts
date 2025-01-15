import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth';

async function getCurrentUserId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id;
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
    console.error('Error fetching cart items:', error instanceof Error ? error.message : error);
    return NextResponse.json({ 
      error: 'Failed to fetch cart items',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
