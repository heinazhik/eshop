import Link from 'next/link';
import { formatCurrency } from '../../lib/utils';
import { Product } from '../types';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    createdAt: Date;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg shadow-md overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
          <Link href={`/products/${product.id}`} className="hover:text-primary-accent transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-secondary-accent font-bold mb-4">{formatCurrency(product.price)}</p>
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-accent hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-accent transition-colors"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
