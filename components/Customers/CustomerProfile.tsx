import React from 'react';
import { Customer, Order } from '../../types/index.js';
import useFetch from '../../hooks/useFetch.js';
import { formatDate } from '../common.js';

interface CustomerProfileProps {
  customer: Customer;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ customer }) => {
  const { data: customerOrders, error, loading } = useFetch<Order[]>(
    `/orders?customer_id=${customer.customer_id}`
  );

  if (loading) {
    return <div>Loading order history...</div>;
  }
  if (error) {
    return <div>Error loading order history.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Customer Profile</h3>
      <p>
        <span className="font-semibold">Name:</span> {customer.name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {customer.email}
      </p>
      {customer.phone && (
        <p>
          <span className="font-semibold">Phone:</span> {customer.phone}
        </p>
      )}
      <p>
        <span className="font-semibold">Registration Date:</span> {formatDate(customer.registration_date)}
      </p>
      <p>
        <span className="font-semibold">Newsletter Opt-In:</span> {customer.newsletter_opt_in ? 'Yes' : 'No'}
      </p>
      <p>
        <span className="font-semibold">Subscription Status:</span> {customer.subscription_status}
      </p>

      <h4 className="text-lg font-semibold mt-4 mb-2">Order History</h4>
      {customerOrders && customerOrders.length > 0 ? (
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
              {customerOrders.map((order: Order) => (
                <tr key={order.order_id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{order.order_id}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{order.status}</td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">${order.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No order history found for this customer.</p>
      )}
    </div>
  );
};

export default CustomerProfile;
