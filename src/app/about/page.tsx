import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Our Story
        </h2>
        <p className="mt-4 text-gray-500">
          Welcome to eShop, where quality meets convenience. We believe in providing
          our customers with exceptional products and a seamless shopping experience.
        </p>
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
          <p className="mt-2 text-gray-500">
            At eShop, our mission is to empower individuals through access to premium
            goods. We strive to create a platform that not only offers a wide array
            of products but also fosters a community of informed and satisfied shoppers.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900">Our Values</h3>
          <ul className="mt-2 space-y-4">
            <li className="text-gray-500">
              <strong>Integrity:</strong> We operate with transparency and honesty in all
              our dealings.
            </li>
            <li className="text-gray-500">
              <strong>Quality:</strong> We are committed to offering products that meet the
              highest standards.
            </li>
            <li className="text-gray-500">
              <strong>Customer Focus:</strong> Our customers are at the heart of everything we
              do. We listen, adapt, and strive to exceed expectations.
            </li>
            <li className="text-gray-500">
              <strong>Innovation:</strong> We continuously seek new ways to improve our
              services and product offerings.
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900">Meet the Team</h3>
          <p className="mt-2 text-gray-500">
            We are a passionate team of individuals dedicated to bringing you the
            best online shopping experience. From our product curators to our
            customer service representatives, each member plays a vital role in making
            eShop what it is.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900">Join Our Journey</h3>
          <p className="mt-2 text-gray-500">
            We invite you to explore our collection and become a part of the eShop
            family. Together, we can create a future of seamless and satisfying
            online shopping.
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
