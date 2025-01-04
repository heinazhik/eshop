import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [sortBy, setSortBy] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    let updatedProducts = products;

    if (selectedCategories.length > 0) {
      updatedProducts = products.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (sortBy === 'price-asc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      updatedProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredProducts(updatedProducts);
  }, [products, sortBy, selectedCategories]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-text">Products</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="form-checkbox h-4 w-4 text-accent"
                />
                <span className="text-text">{category}</span>
              </label>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary text-text border border-gray-600 rounded-md px-3 py-2"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
