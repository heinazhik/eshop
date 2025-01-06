import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-footer-light dark:bg-footer-dark py-8">
      <div className="container mx-auto text-center">
        <nav className="flex justify-center space-x-6 mb-4">
          <Link href="/about" className="text-primary-accent hover:text-secondary-accent transition-colors">
            About
          </Link>
          <Link href="/privacy" className="text-primary-accent hover:text-secondary-accent transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-primary-accent hover:text-secondary-accent transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-primary-accent hover:text-secondary-accent transition-colors">
            Contact
          </Link>
        </nav>
        <p className="text-sm text-text-light dark:text-text-dark">
          &copy; {new Date().getFullYear()} eShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
