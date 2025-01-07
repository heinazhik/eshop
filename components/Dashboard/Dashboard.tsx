import React from 'react';
import KeyMetricsCard from './KeyMetricsCard.tsx';
import RecentOrdersTable from './RecentOrdersTable.tsx';
import DashboardShortcuts from './DashboardShortcuts.tsx';
import useFetch from '../../hooks/useFetch.js';
import { Order, Product, Customer } from '../../types/index.js';

const Dashboard: React.FC = () => {
    const { data: orders, error: ordersError, loading: ordersLoading } = useFetch<Order[]>('/orders');
    const { data: products, error: productsError, loading: productsLoading } = useFetch<Product[]>('/products');
    const { data: customers, error: customersError, loading: customersLoading } = useFetch<Customer[]>('/customers');

    if (ordersLoading || productsLoading || customersLoading) {
        return <div>Loading...</div>;
    }

    if (ordersError || productsError || customersError) {
        return <div>Error loading data.</div>;
    }

    const totalOrders = orders ? orders.length : 0;
    const totalProducts = products ? products.length : 0;
    const totalCustomers = customers ? customers.length : 0;
    const totalSales = orders?.reduce((acc: number, order: Order) => acc + order.total_amount, 0) || 0;
    const recentOrders = orders?.slice(0, 5) || [];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <KeyMetricsCard title="Total Products" value={totalProducts} />
                <KeyMetricsCard title="Total Customers" value={totalCustomers} />
                <KeyMetricsCard title="Total Orders" value={totalOrders} />
                <KeyMetricsCard title="Total Sales" value={totalSales} prefix="$" />
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
                <RecentOrdersTable orders={recentOrders} />
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
                <DashboardShortcuts />
            </div>
        </div>
    );
};

export default Dashboard;