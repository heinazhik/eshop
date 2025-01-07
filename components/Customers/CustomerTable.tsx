import React from 'react';
import { Customer } from '../../types/index.ts';
import { formatDate } from '../common.ts';

interface CustomerTableProps {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onSelect }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Name</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Email</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Phone</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Registration Date</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Newsletter</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Subscription</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.customer_id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onSelect(customer)}
            >
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{customer.customer_id}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{customer.name}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{customer.email}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{customer.phone}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                {formatDate(customer.registration_date)}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                {customer.newsletter_opt_in ? 'Yes' : 'No'}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                {customer.subscription_status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;