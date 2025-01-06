import { NextResponse } from 'next/server';
import { db } from 'lib/db';

export async function GET() {
  try {
    const products = await db.query('SELECT * FROM products ORDER BY created_at DESC LIMIT 6');
    return NextResponse.json(products.rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}