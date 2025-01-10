import React from 'react';
import Link from 'next/link';
import { Product } from 'types'; // Changed from '../types.js' to '../types'

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Ensure price is a number before using toFixed
  const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

  return (
    <Link href={`/products/${product.product_id}`} key={product.product_id}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={product.image_url || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600">${price.toFixed(2)}</p>
          {/* You can add more details here if needed */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
