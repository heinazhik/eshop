import Link from 'next/link';
import { Product } from '@/types';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 bg-secondary-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-bold text-primary-800 mb-2">{product.name}</h3>
        <p className="text-secondary-700 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary-900">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-accent-500 hover:bg-accent-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            View
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
