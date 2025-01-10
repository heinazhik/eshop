// src/app/page.tsx
import Hero from '../components/Hero.tsx';
import ProductCard from '../components/ProductCard.tsx';
import Footer from '../components/Footer.tsx';
import { Product, ApiResponse } from 'types';
import Navbar from 'components/Navbar';

// Fetch featured products from the API
async function getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    try {
        // Fetch data from the API route
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/featured-products`, 
            { cache: 'no-store' } // Ensure fresh data on every request
        );

        // Check if the response is OK
        if (!res.ok) {
            throw new Error(`Failed to fetch featured products: ${res.statusText}`);
        }

        // Parse the JSON response
        const data = await res.json();

        // Return the data with no error
        return { data, error: null, loading: false };
    } catch (error: any) {
        // Handle errors and return an empty array
        console.error('Error fetching featured products:', error);
        return { data: [], error: "No featured products found", loading: false };
    }
}

// Home page component
export default async function Home() {
    // Fetch featured products
    const { data: products, error, loading } = await getFeaturedProducts();

    // Log the fetched products and errors for debugging
    console.log('Fetched products:', products);
    console.log('Error:', error);

    // Show a loading state while fetching data
    if (loading) {
        return <div>Loading featured products...</div>;
    }

    // Show an error message if fetching fails
    if (error) {
        return <div>Error loading products: {error}</div>;
    }

    // Render the page
    return (
        <div>
            {/* Hero section */}
            <Navbar />
            <Hero />

            {/* Featured Products section */}
            <section className="py-16 px-4 bg-secondary-100">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Map over the products and render a ProductCard for each */}
                        {products?.map((product: Product) => (
                            <ProductCard
                                key={product.product_id}
                                product={{
                                    product_id: product.product_id,
                                    name: product.name,
                                    description: product.description,
                                    price: product.price,
                                    image_url: product.image_url || '/placeholder.jpg',
                                    category: product.category,
                                    created_at: new Date(product.created_at),
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer section */}
            <Footer />
        </div>
    );
}
