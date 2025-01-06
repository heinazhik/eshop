import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { Product } from '../types';

async function getFeaturedProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function Home() {
  const products: Product[] = await getFeaturedProducts();

  return (
    <div>
      <Hero />

      {/* Product Grid */}
      <section className="py-16 px-4 bg-secondary-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.product_id}
                product={{
                  id: product.product_id,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  imageUrl: product.image_url || '/placeholder.jpg',
                  category: product.category,
                  createdAt: new Date(product.created_at)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
