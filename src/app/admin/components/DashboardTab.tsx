'use client';

import React, { useState, useEffect } from 'react';

interface RecentOrder {
  order_id: number;
  customer_name: string;
  created_at: string;
  status: string;
  total_amount: number;
}

const DashboardTab = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await fetch('/api/admin/total-products');
        const data = await response.json();
        setTotalProducts(data.totalProducts);
      } catch (error) {
        console.error('Error fetching total products:', error);
      }
    };

    const fetchTotalCustomers = async () => {
      try {
        const response = await fetch('/api/admin/total-customers');
        const data = await response.json();
        setTotalCustomers(data.totalCustomers);
      } catch (error) {
        console.error('Error fetching total customers:', error);
      }
    };

    const fetchTotalOrders = async () => {
      try {
        const response = await fetch('/api/admin/total-orders');
        const data = await response.json();
        setTotalOrders(data.totalOrders);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    const fetchTotalSales = async () => {
      try {
        const response = await fetch('/api/admin/total-sales');
        const data = await response.json();
        setTotalSales(data.totalSales);
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    };

    const fetchRecentOrders = async () => {
      try {
        const response = await fetch('/api/admin/recent-orders');
        const data = await response.json();
        setRecentOrders(data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchTotalProducts();
    fetchTotalCustomers();
    fetchTotalOrders();
    fetchTotalSales();
    fetchRecentOrders();
  }, []);

  return (
    <div>
      {/* Welcome Message */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold">Welcome to the Admin Panel</h2>
        <p>Here's a quick overview of your store.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <a href="/app/products" className="bg-white rounded shadow p-4 block">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Products</h3>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </a>
        <a href="/app/admin/customers" className="bg-white rounded shadow p-4 block">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Customers</h3>
          <p className="text-2xl font-bold">{totalCustomers}</p>
        </a>
        <a href="/app/admin/orders" className="bg-white rounded shadow p-4 block">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Orders</h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </a>
        <a href="/app/admin/sales-reports" className="bg-white rounded shadow p-4 block">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Sales</h3>
          <p className="text-2xl font-bold">${totalSales}</p>
        </a>
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
              {recentOrders.map((order) => (
                <tr key={order.order_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.order_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.customer_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${Number(order.total_amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Shortcuts</h3>
        <div className="space-x-4">
          <a href="/app/admin/products" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Product
          </a>
          <a href="/app/admin/orders" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            View Orders
          </a>
          <a href="/app/admin/reports" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Generate Reports
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
