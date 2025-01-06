import { NextResponse } from 'next/server';
import pool from '../../../../../lib/db';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return new NextResponse('Product ID is required', { status: 400 });
    }

    const numericProductId = parseInt(productId, 10);

    if (isNaN(numericProductId)) {
      return new NextResponse('Invalid product ID', { status: 400 });
    }

    await pool.query('DELETE FROM order_items WHERE product_id = $1', [numericProductId]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
