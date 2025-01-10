import React from 'react';
import Button from '../UI/Button.jsx';
import Link from 'next/link';

const DashboardShortcuts: React.FC = () => {
  return (
    <div className="space-x-4">
      <Link href="/admin?tab=products">
        <Button>Add Product</Button>
      </Link>
      <Link href="/admin?tab=orders">
        <Button>View Orders</Button>
      </Link>
      <Link href="/admin?tab=reports">
        <Button>Generate Reports</Button>
      </Link>
    </div>
  );
};

export default DashboardShortcuts;
