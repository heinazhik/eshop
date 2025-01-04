import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><Link href="/">Home</Link></li>
              <li className="mb-2"><Link href="/products">Products</Link></li>
              <li className="mb-2"><Link href="/about">About Us</Link></li>
              <li className="mb-2"><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="https://www.facebook.com/profile.php?id=579913220" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li className="mb-2"><a href="https://x.com/3capsconsulting" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li className="mb-2"><a href="https://www.instagram.com/jess_lyh/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><Link href="/terms">Terms of Service</Link></li>
              <li className="mb-2"><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <Link href="/newsletter" className="text-gray-600 mb-4 hover:text-gray-500">
                Subscribe to our newsletter for updates and special offers.
              </Link>
              <form>
              <input type="email" placeholder="Your email" className="border rounded-md py-2 px-3 w-full mb-2" />
              <button className="bg-accent-500 hover:bg-accent-700 text-white py-2 px-4 rounded-md">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
