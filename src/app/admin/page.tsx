'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import DashboardTab from './components/DashboardTab.tsx';
import ProductsPanel from '../../../components/Products/ProductsPanel.tsx';

const AdminPage = () => {
  const searchParams = useSearchParams();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 px-4 py-6">
        <div className="text-xl font-bold mb-6">Admin Panel</div>
        <nav>
          <Link
            href="/admin"
            className="block py-2 hover:bg-gray-300 rounded"
          >
            Dashboard
          </Link>
          <Link
            href="/admin?tab=products"
            className="block py-2 hover:bg-gray-300 rounded"
          >
            Products
          </Link>
          <Link
            href="/admin?tab=customers"
            className="block py-2 hover:bg-gray-300 rounded"
          >
            Customers
          </Link>
          <Link
            href="/admin?tab=orders"
            className="block py-2 hover:bg-gray-300 rounded"
          >
            Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow py-4 px-6">
          <div className="flex justify-between items-center">
            {/* Search Functionality */}
            <div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="border rounded px-3 py-2" 
              />
            </div>
            {/* Notifications and Admin Profile */}
            <div className="flex items-center space-x-4">
              <button className="relative focus:outline-none">
                {/* Notification Icon */}
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.008 6.008 0 00-6-6V3.759c0-.69-.56-1.249-1.248-1.249S9.752 3.07 9.752 3.759V6a6.008 6.008 0 00-6 6v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              {/* Admin Profile Dropdown */}
              <div className="relative">
                <button className="flex items-center focus:outline-none">
                  <span className="mr-2">Admin Name</span>
                  {/* Profile Icon */}
                  <svg 
                    className="h-6 w-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-scroll">
          {!searchParams.get('tab') && <DashboardTab />}
          {searchParams.get('tab') === 'products' && <ProductsPanel />}
          {searchParams.get('tab') === 'customers' && <div>Customers Content</div>}
          {searchParams.get('tab') === 'orders' && <div>Orders Content</div>}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
