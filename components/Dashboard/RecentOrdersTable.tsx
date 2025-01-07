import React from 'react';
import { Order } from '../../types/index.js';
import { formatDate } from '../common.js';

interface RecentOrdersTableProps {
  orders: Order[];
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Order ID</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Date</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Status</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{order.order_id}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{formatDate(order.created_at)}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{order.status}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">${order.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;