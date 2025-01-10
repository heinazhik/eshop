import React, { useState } from 'react';
import { Order } from '../../types/index.js';
import { formatDate } from '../common.js';
import Button from '../UI/Button.js';
import apiFetch from '../../utils/api.js';

interface OrderTableProps {
  orders: Order[];
  onSelect: (order: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onSelect }) => {
  const [statusUpdates, setStatusUpdates] = useState<{[key: number]: string}>({});

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await apiFetch(`/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      setStatusUpdates(prev => ({...prev, [orderId]: newStatus}));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };
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
            <tr 
              key={order.order_id} 
              className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onSelect(order)}
            >
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{order.order_id}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{formatDate(order.created_at)}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                <select
                  value={statusUpdates[order.order_id] || order.status}
                  onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                  className="border rounded p-2 bg-[var(--card-light)] text-[var(--text-light)] dark:bg-[var(--card-dark)] dark:text-[var(--text-dark)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">${order.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
