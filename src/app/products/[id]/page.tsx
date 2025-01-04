import Image from 'next/image';
import Link from 'next/link';

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="md:order-2">
          <Image
            src="/placeholder.jpg"
            alt="Product Image"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="md:order-1">
          <h1 className="text-3xl font-bold mb-4">Awesome Product Title</h1>
          <p className="text-gray-700 mb-6">
            This is a detailed description of the product. It can span multiple lines and provide all the necessary information for the customer.
          </p>
          <div className="flex items-center mb-4">
            <span className="font-bold text-xl mr-2">$99.99</span>
            <span className="text-gray-500 line-through">$129.99</span>
          </div>
          <Link href="/cart" className="bg-accent-500 hover:bg-accent-700 text-white font-bold py-2 px-6 rounded-full inline-block">
            Add to Cart
          </Link>
        </div>
      </div>

      {/* More Details Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <p className="text-gray-700">
          More detailed information about the product can be placed here. This could include specifications, materials, care instructions, etc.
        </p>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="border p-4 rounded-md mb-4">
          <div className="font-bold">John Doe</div>
          <div className="text-sm text-gray-600">May 20, 2023</div>
          <p className="mt-2">Great product! I love it.</p>
        </div>
        <div className="border p-4 rounded-md">
          <div className="font-bold">Jane Smith</div>
          <div className="text-sm text-gray-600">April 15, 2023</div>
          <p className="mt-2">Highly recommended!</p>
        </div>
      </div>
    </div>
  );
}
