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
          <Link href="/admin" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 01-1-1h-2a1 1 0 01-1 1v4a1 1 0 001 1m-1-5h10m-11 0a1 1 0 001-1V5a1 1 0 01-1-1H3a1 1 0 01-1 1v3a1 1 0 001 1z" />
            </svg>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/products" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/customers" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20h18M5 19a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-1.333A6.166 6.166 0 005 19z" />
            </svg>
            <span>Customers</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Orders</span>
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
