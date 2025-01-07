import React, { useState } from 'react';
import ProductTable from './ProductTable.tsx';
import AddEditProductModal from './AddEditProductModal.tsx';
import Button from '../UI/Button.tsx';
import { Product } from '../../types/index.ts';
import ProductFilter from './ProductFilter.tsx';
import useFetch from '../../hooks/useFetch.ts';

const ProductsPanel: React.FC = () => {
    const { data: products, error, loading } = useFetch<Product[]>('/products');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    if (loading) {
        return <div>Loading ...</div>;
    }
    if (error) {
        return <div>Error loading Products.</div>;
    }

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleProductFilter = (filtered: Product[] | null) => {
        setFilteredProducts(filtered);
    }

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <Button onClick={handleAddProduct}>Add Product</Button>
            </div>

            <ProductFilter products={products} onFilter={handleProductFilter} />
            <ProductTable products={filteredProducts || products || []} onEdit={handleEditProduct} />
            <AddEditProductModal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
        </div>
    );
};

export default ProductsPanel;