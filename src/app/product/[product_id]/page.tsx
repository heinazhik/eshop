// src/app/product/[product_id]/page.tsx
import { db } from '@/lib/db';
import { notFound, useRouter } from 'next/navigation';
import { Product } from 'types';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: { product_id: string };
}

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
              stock_quantity
          FROM
              products
          WHERE
              product_id = $1;
      `;
      const result = await db.query(query, [id]);

      if (result.rows.length === 0) {
         return null
      }

      return result.rows[0] as Product;
  } catch (error) {
      console.error("Error fetching product:", error);
      return null;
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product_id = params.product_id;
  const product = await getProduct(product_id);
  const router = useRouter();
  if (!product) {
    notFound();
  }
  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: product.product_id, quantity: 1 }), // start with a quantity of 1
      });

      if (response.ok) {
        router.push('/cart'); // Redirect to the cart page after successful add to cart
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image_url || '/placeholder.jpg'} alt={product.name} className="w-full h-96 object-contain md:w-1/2" />
        <div className="md:w-1/2">
          <p className="text-green-600 text-2xl mt-2">${product.price.toFixed(2)}</p>
          <p className="mt-4">{product.description}</p>
          <div className="mt-6">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
