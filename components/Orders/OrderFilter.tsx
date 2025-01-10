import React, { useState, useEffect } from 'react';
import { Order } from '../../types';
import { Input } from '../UI/Input';

interface OrderFilterProps {
  orders: Order[];
  onFilter: (filtered: Order[] | null) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({ orders, onFilter }) => {
  const [customerIdFilter, setCustomerIdFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [statusOptions, setStatusOptions] = useState<string[]>([]);

  useEffect(() => {
    if (orders) {
      const statuses = [...new Set(orders.map((order) => order.status))];
      setStatusOptions(statuses);
    }
  }, [orders]);

  useEffect(() => {
    if (orders) {
      let filtered = orders;
      if (customerIdFilter) {
        filtered = filtered.filter((order) =>
          order.customer_id?.toString().includes(customerIdFilter)
        );
      }
      if (statusFilter) {
        filtered = filtered.filter((order) => order.status === statusFilter);
      }
      onFilter(filtered.length > 0 ? filtered : null);
    } else {
      onFilter(null);
    }
  }, [customerIdFilter, statusFilter, orders, onFilter]);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Filter by customer ID"
          value={customerIdFilter}
          onChange={(e) => setCustomerIdFilter(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <select
          className="border rounded p-2 w-full bg-[var(--card-light)] text-[var(--text-light)] dark:bg-[var(--card-dark)] dark:text-[var(--text-dark)]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderFilter;
