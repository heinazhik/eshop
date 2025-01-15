// src/app/api/featured-products/route.ts
import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';
import { Product } from '../../../types';

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM products WHERE featured = true');
    const featuredProducts: Product[] = result.rows;
    return NextResponse.json(featuredProducts);
  } catch (error: unknown) {
    console.error('Error fetching featured products:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new NextResponse(
      JSON.stringify({ error: `Failed to fetch featured products: ${message}` }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
