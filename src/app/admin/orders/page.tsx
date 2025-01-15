'use client';

import React, { useState, useCallback, useMemo } from 'react';
import OrderTable from '../../../components/Orders/OrderTable.tsx';
import OrderDetails from '../../../components/Orders/OrderDetails.tsx';
import OrderFilter from '../../../components/Orders/OrderFilter.tsx';
import useFetch from '../../../hooks/useFetch.ts';
import { Order } from '../../../types.js';

const OrdersPanel: React.FC = () => {
  const { data: orders, error, loading } = useFetch<Order[]>('/api/orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<Order[] | null>(null);

  const handleSelectOrder = useCallback((order: Order) => {
    setSelectedOrder(order);
  }, []);

  const handleFilter = useCallback((filtered: Order[] | null) => {
    setFilteredOrders(filtered);
  }, []);

  const ordersToDisplay = useMemo(() => {
    return filteredOrders !== null ? filteredOrders : orders;
  }, [filteredOrders, orders]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error loading orders.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <OrderFilter orders={orders || []} onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="overflow-x-auto">
          {ordersToDisplay && ordersToDisplay.length > 0 ? (
            <OrderTable orders={ordersToDisplay} onSelect={handleSelectOrder} />
          ) : (
            <p>No orders found.</p>
          )}
        </div>
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </div>
    </div>
  );
};

export default OrdersPanel;
