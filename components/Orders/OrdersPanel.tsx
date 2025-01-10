'use client';

import React, { useState } from 'react';
import OrderTable from './OrderTable';
import OrderDetails from './OrderDetails';
import OrderFilter from './OrderFilter';
import { Order } from '../../types';
import useFetch from '../../hooks/useFetch';

const OrdersPanel: React.FC = () => {
  const { data: orders, error, loading } = useFetch<Order[]>('/api/orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<Order[] | null>(null);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error loading orders.</div>;
  }

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleFilterOrders = (filtered: Order[] | null) => {
    setFilteredOrders(filtered);
  };

  const ordersToDisplay = filteredOrders !== null ? filteredOrders : orders;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <OrderFilter orders={orders || []} onFilter={handleFilterOrders} />
      {selectedOrder ? (
        <OrderDetails order={selectedOrder} />
      ) : ordersToDisplay ? (
        <OrderTable orders={ordersToDisplay} onSelect={handleSelectOrder} />
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPanel;
