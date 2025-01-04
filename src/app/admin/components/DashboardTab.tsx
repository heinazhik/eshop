import React from 'react';

const DashboardTab = () => {
  return (
    <div>
      {/* Welcome Message */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold">Welcome to the Admin Panel</h2>
        <p>Here's a quick overview of your store.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Products</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Customers</h3>
          <p className="text-2xl font-bold">85</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Orders</h3>
          <p className="text-2xl font-bold">53</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Sales</h3>
          <p className="text-2xl font-bold">$12,500</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">#1001</td>
                <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap">2023-12-19</td>
                <td className="px-6 py-4 whitespace-nowrap">Shipped</td>
                <td className="px-6 py-4 whitespace-nowrap">$45.00</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">#1002</td>
                <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                <td className="px-6 py-4 whitespace-nowrap">2023-12-18</td>
                <td className="px-6 py-4 whitespace-nowrap">Processing</td>
                <td className="px-6 py-4 whitespace-nowrap">$78.00</td>
              </tr>
              {/* More orders */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Shortcuts</h3>
        <div className="space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View Orders</button>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Generate Reports</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
