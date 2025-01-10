import React from 'react';
import { Customer } from '../../types/index.js';
import { formatDate } from '../common.js';

interface CustomerTableProps {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ 
  customers, 
  onSelect,
  sortField,
  sortOrder,
  onSort,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
        <thead>
          <tr>
            <th 
              className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('customer_id')}
            >
              ID {sortField === 'customer_id' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('name')}
            >
              Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('email')}
            >
              Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('phone')}
            >
              Phone {sortField === 'phone' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('registration_date')}
            >
              Registration Date {sortField === 'registration_date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('newsletter_opt_in')}
            >
              Newsletter {sortField === 'newsletter_opt_in' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('subscription_status')}
            >
              Subscription {sortField === 'subscription_status' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
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
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded">
            {currentPage}
          </span>
          <button
            className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
