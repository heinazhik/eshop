import { db } from 'lib/db';
import { notFound } from 'next/navigation';
import { Product } from '@/types';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image_url || '/placeholder.jpg',
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

// Fetch product data from the database with caching
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
    
    const result = await db.query(query, [parseInt(id, 10)]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product data');
  }
}

// Server component for the product detail page
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Validate params.id
  if (!id || isNaN(parseInt(id, 10))) {
    notFound();
  }

  let product: Product | null = null;
  
  try {
    product = await getProduct(id);
  } catch (error) {
    console.error('Error:', error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetailClient product={product} />
    </>
  );
}

export const revalidate = 3600; // Revalidate data every hour
