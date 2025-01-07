import React, { useState, useEffect } from 'react';
import { Product } from '../../types/index.js';
import Input from '../UI/Input.tsx';
import { Option } from '../../types/index.js';

interface ProductFilterProps {
  products: Product[];
  onFilter: (filtered: Product[] | null) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products, onFilter }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (products) {
      const categories = [...new Set(products.map(product => product.category))];
      setCategoryOptions(categories.map(category => ({
        label: category,
        value: category
      })));
    }
  }, [products]);

  useEffect(() => {
    if (products) {
      let filtered = products;
      
      if (nameFilter) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }
      
      if (categoryFilter) {
        filtered = filtered.filter(product => 
          product.category === categoryFilter
        );
      }
      
      onFilter(filtered.length > 0 ? filtered : null);
    } else {
      onFilter(null);
    }
  }, [nameFilter, categoryFilter, products, onFilter]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex-1">
        <Input 
          type="text" 
          placeholder="Filter by name" 
          value={nameFilter} 
          onChange={handleNameChange} 
        />
      </div>
      <div className="flex-1">
        <select
          className="border rounded p-2 w-full bg-[var(--card-light)] text-[var(--text-light)] dark:bg-[var(--card-dark)] dark:text-[var(--text-dark)]"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="">Filter by Category</option>
          {categoryOptions?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;