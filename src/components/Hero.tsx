import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-primary-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-800 mb-6">
          Discover the Latest Trends
        </h1>
        <p className="text-lg sm:text-xl text-secondary-700 mb-10">
          Explore our curated collection of high-quality products.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
