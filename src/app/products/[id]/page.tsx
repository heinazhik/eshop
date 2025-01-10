import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Product } from 'types';
import ProductDetailClient from './ProductDetailClient';

// Fetch product data from the database
async function getProduct(id: string): Promise<Product | null> {
  try {
    const query = `
      SELECT
        product_id,
        name,
        description,
        price,
        image_url,
        category,
        created_at,
        stock_quantity,
        featured
      FROM
        products
      WHERE
        product_id = $1;
    `;
    const result = await db.query(query, [parseInt(id, 10)]); // Ensure id is a number

    if (result.rows.length === 0) {
      return null; // Product not found
    }

    return result.rows[0] as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Server component for the product detail page
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  // Validate params.id
  if (!id || isNaN(parseInt(id, 10))) {
    notFound(); // Redirect to 404 if id is undefined or not a number
  }

  // Fetch product data
  const product = await getProduct(id);

  // If product is not found, return a 404 page
  if (!product) {
    notFound();
  }

  // Pass the product data to the client component
  return <ProductDetailClient product={product} />;
}
