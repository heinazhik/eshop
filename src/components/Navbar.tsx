import Link from 'next/link';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="bg-background-light dark:bg-background-dark p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-text-light dark:text-text-dark hover:text-primary-accent transition-colors">
          eShop
        </Link>
        <div className="flex space-x-6">
          <Link href="/about" className="text-text-light dark:text-text-dark hover:text-primary-accent transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-text-light dark:text-text-dark hover:text-primary-accent transition-colors">
            Blog
          </Link>
          <Link href="/cart" className="text-text-light dark:text-text-dark hover:text-primary-accent transition-colors">
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
          <Link href="/login" className="text-text-light dark:text-text-dark hover:text-primary-accent transition-colors">
            <UserCircleIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
