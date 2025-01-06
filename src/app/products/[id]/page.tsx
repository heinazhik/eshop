import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../../../lib/db';

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);
  
  if (isNaN(productId)) {
    return <div className="container mx-auto px-4 py-8">Invalid product ID</div>;
  }

  const product = await getProduct(productId);

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="md:order-2">
          <Image
            src={product.image_url || '/placeholder.jpg'}
            alt={product.name}
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="md:order-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="font-bold text-xl mr-2">${product.price.toFixed(2)}</span>
          </div>
          <Link 
            href="/cart" 
            className="bg-accent-500 hover:bg-accent-700 text-white font-bold py-2 px-6 rounded-full inline-block"
          >
            Add to Cart
          </Link>
          <div className="mt-4 text-sm text-gray-600">
            {product.stock_quantity > 0 ? (
              <span className="text-green-600">In Stock ({product.stock_quantity} available)</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      {/* More Details Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>Category:</div>
          <div>{product.category}</div>
        </div>
      </div>
    </div>
  );
}

async function getProduct(productId: number): Promise<Product | null> {
  try {
    const result = await db.query(
      `SELECT 
        product_id,
        name,
        description,
        price,
        image_url,
        category,
        stock_quantity
      FROM products
      WHERE product_id = $1`,
      [productId]
    );
    
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
