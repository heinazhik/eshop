import React from 'react';
import CustomerTable from './CustomerTable.jsx';
import CustomerFilter from './CustomerFilter.jsx';
import CustomerProfile from './CustomerProfile.jsx';
import { Customer } from '../../src/types.js';

interface CustomersPanelProps {
  customers: Customer[];
}

const CustomersPanel: React.FC<CustomersPanelProps> = ({ customers }) => {
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
  const [filteredCustomers, setFilteredCustomers] = React.useState<Customer[] | null>(null);
  const [sortField, setSortField] = React.useState('customer_id');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedCustomers = React.useMemo(() => {
    const customersToSort = filteredCustomers || customers;
    return [...customersToSort].sort((a, b) => {
      const aValue = a[sortField as keyof Customer];
      const bValue = b[sortField as keyof Customer];
      
      if (aValue === bValue) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc'
        ? aValue < bValue ? -1 : 1
        : aValue > bValue ? -1 : 1;
    });
  }, [filteredCustomers, customers, sortField, sortOrder]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4">
      <div>
        <CustomerFilter customers={customers} onFilter={setFilteredCustomers} />
        <CustomerTable
          customers={currentItems}
          onSelect={handleSelectCustomer}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={sortedCustomers.length}
          onPageChange={setCurrentPage}
        />
      </div>
      {selectedCustomer && (
        <CustomerProfile customer={selectedCustomer} />
      )}
    </div>
  );
};

export default CustomersPanel;
