import React, { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../Global/ThemeContext.jsx';

const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`w-64 bg-[var(--card-${theme})] p-4 border-r border-gray-200 dark:border-gray-700`}>
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/admin" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin?tab=products" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Products
          </Link>
        </li>
        <li>
          <Link href="/admin?tab=customers" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Customers
          </Link>
        </li>
        <li>
          <Link href="/admin?tab=logistics" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Logistics Partners
          </Link>
        </li>
        <li>
          <Link href="/admin?tab=orders" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Orders
          </Link>
        </li>
        <li>
          <Link href="/admin?tab=reports" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            Sales Reports
          </Link>
        </li>
      </ul>
      <div className="mt-6 border-t border-gray-300 dark:border-gray-600 pt-4">
        <button
          onClick={toggleTheme}
          className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;