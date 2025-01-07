import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal.tsx';
import Input from '../UI/Input.tsx';
import Button from '../UI/Button.tsx';
import { Product } from '../../types/index.js';
import apiFetch from '../../utils/api.ts';

interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const AddEditProductModal: React.FC<AddEditProductModalProps> = ({ isOpen, onClose, product }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (product) {
      setIsEdit(true);
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price.toString());
      setStockQuantity(product.stock_quantity.toString());
      setDescription(product.description);
    } else {
      setIsEdit(false);
      setName('');
      setCategory('');
      setPrice('');
      setStockQuantity('');
      setDescription('');
    }
  }, [product]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const productData = {
      name: name,
      category: category,
      price: parseFloat(price),
      stock_quantity: parseInt(stockQuantity),
      description: description
    };

    try {
      if (isEdit && product) {
        await apiFetch(`/products/${product.product_id}`, { 
          method: 'PUT', 
          body: productData 
        });
        alert('Product updated successfully!');
      } else {
        await apiFetch('/products', { 
          method: 'POST', 
          body: productData 
        });
        alert('Product added successfully!');
      }
      onClose();
    } catch (error: any) {
      alert(error.message || 'Error saving product');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Product' : 'Add Product'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <Input 
            type="text" 
            placeholder="Category" 
            value={category} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            required 
          />
        </div>
        <div>
          <Input 
            type="number" 
            placeholder="Price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div>
          <Input 
            type="number" 
            placeholder="Stock Quantity" 
            value={stockQuantity} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStockQuantity(e.target.value)}
            required 
          />
        </div>
        <div>
          <Input 
            type="text" 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">
            {isEdit ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditProductModal;