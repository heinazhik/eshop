'use client';

import React, { useState } from 'react';

// Import Dashboard Tab Component
import DashboardTab from './components/DashboardTab';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 px-4 py-6">
        <div className="text-xl font-bold mb-6">Admin Panel</div>
        <nav>
          <a
            href="#"
            className={`block py-2 hover:bg-gray-300 rounded ${activeTab === 'dashboard' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </a>
          <a
            href="#"
            className={`block py-2 hover:bg-gray-300 rounded ${activeTab === 'products' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTabClick('products')}
          >
            Products
          </a>
          <a
            href="#"
            className={`block py-2 hover:bg-gray-300 rounded ${activeTab === 'customers' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTabClick('customers')}
          >
            Customers
          </a>
          <a
            href="#"
            className={`block py-2 hover:bg-gray-300 rounded ${activeTab === 'logistics' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTabClick('logistics')}
          >
            Logistics Partners
          </a>
          <a
            href="#"
            className={`block py-2 hover:bg-gray-300 rounded ${activeTab === 'orders' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTabClick('orders')}
          >
            Orders
          </a>
          <a
            href="#"
            className={`block py-2 hover:bg-gray-300 rounded ${activeTab === 'reports' ? 'bg-gray-300' : ''}`}
            onClick={() => handleTabClick('reports')}
          >
            Sales Reports
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow py-4 px-6">
          <div className="flex justify-between items-center">
            {/* Search Functionality */}
            <div>
              <input type="text" placeholder="Search..." className="border rounded px-3 py-2" />
            </div>
            {/* Notifications and Admin Profile */}
            <div className="flex items-center space-x-4">
              <button className="relative focus:outline-none">
                {/* Notification Icon */}
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.008 6.008 0 00-6-6V3.759c0-.69-.56-1.249-1.248-1.249S9.752 3.07 9.752 3.759V6a6.008 6.008 0 00-6 6v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>
              {/* Admin Profile Dropdown */}
              <div className="relative">
                <button className="flex items-center focus:outline-none">
                  <span className="mr-2">Admin Name</span>
                  {/* Profile Icon */}
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                {/* Profile Dropdown */}
                {/* Add dropdown menu here */}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-scroll">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'products' && <div>Products Tab Content</div>}
          {activeTab === 'customers' && <div>Customers Tab Content</div>}
          {activeTab === 'logistics' && <div>Logistics Partners Tab Content</div>}
          {activeTab === 'orders' && <div>Orders Tab Content</div>}
          {activeTab === 'reports' && <div>Sales Reports Tab Content</div>}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
