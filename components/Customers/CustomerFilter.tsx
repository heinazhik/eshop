import React, { useState, useEffect } from 'react';
import { Customer } from '../../src/types.js';
import Input from '../UI/Input.tsx';

interface CustomerFilterProps {
  customers: Customer[];
  onFilter: (filtered: Customer[] | null) => void;
}

const CustomerFilter: React.FC<CustomerFilterProps> = ({ customers, onFilter }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState('');
  const [subscriptionOptions, setSubscriptionOptions] = useState<string[]>([]);

  useEffect(() => {
    if (customers) {
      const statuses = [...new Set(customers.map((customer) => customer.subscription_status))];
      setSubscriptionOptions(statuses);
    }
  }, [customers]);

  useEffect(() => {
    if (customers) {
      let filtered = customers;
      if (nameFilter) {
        filtered = filtered.filter((customer) =>
          customer.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }
      if (emailFilter) {
        filtered = filtered.filter((customer) =>
          customer.email.toLowerCase().includes(emailFilter.toLowerCase())
        );
      }
      if (subscriptionFilter) {
        filtered = filtered.filter((customer) => customer.subscription_status === subscriptionFilter);
      }
      onFilter(filtered.length > 0 ? filtered : null);
    } else {
      onFilter(null);
    }
  }, [nameFilter, emailFilter, subscriptionFilter, customers, onFilter]);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameFilter(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Filter by email"
          value={emailFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailFilter(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <select
          className="border rounded p-2 w-full bg-[var(--card-light)] text-[var(--text-light)] dark:bg-[var(--card-dark)] dark:text-[var(--text-dark)]"
          value={subscriptionFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSubscriptionFilter(e.target.value)}
          aria-label="Filter by Subscription Status"
        >
          <option value="">Filter by Subscription Status</option>
          {subscriptionOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomerFilter;
