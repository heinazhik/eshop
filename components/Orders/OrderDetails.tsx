import React, { useState } from 'react';
import { Order, OrderItem } from '../../types';
import useFetch from '../../hooks/useFetch';
import { Button } from '../UI/Button';
import apiFetch from '../../utils/api';
import { formatDate } from '../common';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const { data: orderItems, error, loading } = useFetch<OrderItem[]>(
    `/order-items?order_id=${order.order_id}`
  );
  const [status, setStatus] = useState(order.status);

  const handleChangeStatus = async () => {
    try {
      await apiFetch(`/orders/${order.order_id}`, { method: 'PUT', body: { status } });
      alert('Order status updated successfully');
    } catch (error: any) {
      alert(error.message || 'Error updating order status.');
    }
  };

  if (loading) {
    return <div>Loading Order Items...</div>;
  }
  if (error) {
    return <div>Error loading order items</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Order Details</h3>
      <p>
        <span className="font-semibold">Order ID:</span> {order.order_id}
      </p>
      <p>
        <span className="font-semibold">Order Date:</span> {formatDate(order.created_at)}
      </p>
      {order.customer_id && (
        <p>
          <span className="font-semibold">Customer ID:</span> {order.customer_id}
        </p>
      )}
      <div className="flex gap-2">
        <label className="font-semibold" htmlFor="status">
          Status:
        </label>
        <select
          className="border rounded p-2 bg-[var(--card-light)] text-[var(--text-light)] dark:bg-[var(--card-dark)] dark:text-[var(--text-dark)]"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <Button size="sm" onClick={handleChangeStatus}>
          Update Status
        </Button>
      </div>

      <p>
        <span className="font-semibold">Total Amount:</span> ${order.total_amount}
      </p>

      <h4 className="text-lg font-semibold mt-4 mb-2">Order Items</h4>
      {orderItems && orderItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Item ID</th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Product ID</th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Quantity</th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.order_item_id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{item.order_item_id}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{item.product_id}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{item.quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No items found for this order.</p>
      )}
    </div>
  );
};

export default OrderDetails;
