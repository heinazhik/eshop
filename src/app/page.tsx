import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Product Grid */}
      <section className="py-16 px-4 bg-secondary-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard product={{ id: 1, name: 'Example Product', description: 'This is an example product.', price: 99.99, imageUrl: '/placeholder.jpg', category: 'example', createdAt: new Date() }} />
            <ProductCard product={{ id: 2, name: 'Another Product', description: 'This is another example product.', price: 199.99, imageUrl: '/placeholder.jpg', category: 'example', createdAt: new Date() }} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
