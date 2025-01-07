import React from 'react';
import { Product } from '../../types/index.js';
import Button from '../UI/Button.tsx';
import { formatDate } from '../common.ts';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Name</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Category</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Price</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Stock</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Created At</th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{product.product_id}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{product.name}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{product.category}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">${product.price}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{product.stock_quantity}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{formatDate(product.created_at)}</td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                <Button size="sm" onClick={() => onEdit(product)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;