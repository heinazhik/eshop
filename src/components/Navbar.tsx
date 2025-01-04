import Link from 'next/link';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="bg-primary-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-white">
          eShop
        </Link>
        <div className="flex space-x-4">
          <Link href="/about" className="text-white hover:text-accent-100 ml-4">
            About
          </Link>
          <Link href="/blog" className="text-white hover:text-accent-100 ml-4">
            Blog
          </Link>
          <Link href="/cart" className="text-white hover:text-accent-100">
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
          <Link href="/login" className="text-white hover:text-accent-100">
            <UserCircleIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
