import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#F1F3F6] dark:bg-[#181818] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2C2C2C] dark:text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/about" 
                className="text-[#2C2C2C] dark:text-white hover:text-[#4CAF50] transition-colors"
                aria-label="About Us"
              >
                About
              </Link>
              <Link 
                href="/privacy" 
                className="text-[#2C2C2C] dark:text-white hover:text-[#4CAF50] transition-colors"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-[#2C2C2C] dark:text-white hover:text-[#4CAF50] transition-colors"
                aria-label="Terms of Service"
              >
                Terms of Service
              </Link>
              <Link 
                href="/contact" 
                className="text-[#2C2C2C] dark:text-white hover:text-[#4CAF50] transition-colors"
                aria-label="Contact Us"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2C2C2C] dark:text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2C2C2C] dark:text-white hover:text-[#4CAF50] transition-colors"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2C2C2C] dark:text-white hover:text-[#4CAF50] transition-colors"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#2C2C2C] dark:text-white hover:text-[#4CAF50] transition-colors"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2C2C2C] dark:text-white">Newsletter</h3>
            <div className="flex flex-col space-y-4">
              <p className="text-[#2C2C2C] dark:text-white">
                Subscribe to our newsletter for updates and offers
              </p>
              <Link
                href="/newsletter"
                className="bg-[#4CAF50] text-white px-6 py-2 rounded-md hover:bg-[#45a049] transition-colors text-center"
                aria-label="Go to newsletter page"
              >
                Manage Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-sm text-[#2C2C2C] dark:text-white">
            &copy; {new Date().getFullYear()} eShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
