import ProductCard from '../../components/ProductCard';

const products = [
  {
    id: 1,
    name: 'Stylish T-Shirt',
    description: 'Comfortable and trendy t-shirt for everyday wear.',
    price: 29.99,
    imageUrl: '/placeholder.jpg',
    category: 'apparel',
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Modern Laptop',
    description: 'High-performance laptop for work and entertainment.',
    price: 1299.99,
    imageUrl: '/placeholder.jpg',
    category: 'electronics',
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'Cozy Sweater',
    description: 'Warm and soft sweater for chilly days.',
    price: 49.99,
    imageUrl: '/placeholder.jpg',
    category: 'apparel',
    createdAt: new Date(),
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    description: 'Immersive sound experience with these wireless headphones.',
    price: 199.99,
    imageUrl: '/placeholder.jpg',
    category: 'electronics',
    createdAt: new Date(),
  },
];

const ProductsPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-6">
        Shop Our Products
      </h1>
      <p className="text-gray-500 mb-8">
        Browse our collection of high-quality products.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
