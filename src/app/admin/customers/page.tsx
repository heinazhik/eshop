"use client";

import React, { useState, useEffect } from 'react';
import CustomerTable from '../../../../components/Customers/CustomerTable.tsx';
import CustomerProfile from '../../../../components/Customers/CustomerProfile.tsx';
import CustomerFilter from '../../../../components/Customers/CustomerFilter.tsx';
import { Customer } from 'types';
import useFetch from '../../../../hooks/useFetch.ts';
import Button from '../../../../components/UI/Button.tsx';
import { useRouter } from 'next/navigation';
import Pagination from '../../../../components/UI/Pagination.tsx';

interface CustomersResponse {
  data: Customer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const CustomersPanel: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('registration_date');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  
  const { data, error, loading } = useFetch<CustomersResponse>(
    `/api/customers?page=${page}&search=${search}&sort=${sort}&order=${order}`
  );
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const router = useRouter();

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1);
  };

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(field);
      setOrder('desc');
    }
    setPage(1);
  };

  const handleGoBack = () => {
    setSelectedCustomer(null);
  };

  if (loading) {
    return <div>Loading customers...</div>;
  }

  if (error) {
    return <div>Error loading customers.</div>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Customers</h2>
        <Button onClick={() => router.push('/admin')}>Back to Dashboard</Button>
      </div>
      
      <CustomerFilter 
        onSearch={handleSearch}
        onSort={handleSort}
        sortField={sort}
        sortOrder={order}
      />
      
      {selectedCustomer ? (
        <div>
          <div className="mb-4">
            <Button onClick={handleGoBack}>Back to Customer List</Button>
          </div>
          <CustomerProfile customer={selectedCustomer} />
        </div>
      ) : (
        <>
          <CustomerTable 
            customers={data?.data || []} 
            onSelect={handleSelectCustomer}
            sortField={sort}
            sortOrder={order}
            onSort={handleSort}
          />
          
          {data?.pagination && (
            <div className="mt-4">
              <Pagination
                currentPage={data.pagination.page}
                totalPages={data.pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomersPanel;
