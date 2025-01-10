"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from 'types';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();

  // Handle "Add to Cart" button click
  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: product.product_id, quantity: 1 }),
      });

      if (response.ok) {
        router.push('/cart'); // Redirect to the cart page
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Convert price to a number if it's a string
  const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Image
          src={product.image_url || '/placeholder.jpg'}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-96 object-contain md:w-1/2"
        />
        <div className="md:w-1/2">
          <p className="text-green-600 text-2xl mt-2">${price?.toFixed(2)}</p>
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
