'use client';

import React, { useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product Name 1', quantity: 1, price: 99.99 },
    { id: 2, name: 'Product Name 2', quantity: 2, price: 49.99 },
  ]);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="bg-white">
      {/* Header Section */}
      <header className="bg-gray-100 py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Company Logo */}
          <div className="text-xl font-bold">Company Logo</div>
          {/* Search Bar */}
          <div className="flex-grow mx-4">
            <input type="text" placeholder="Search products..." className="w-full px-4 py-2 border rounded" />
          </div>
          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-blue-500">Home</a>
            <a href="#" className="hover:text-blue-500">Shop</a>
            <a href="#" className="hover:text-blue-500">Categories</a>
          </nav>
          {/* Cart Icon */}
          <div className="relative">
            <a href="#" className="hover:text-blue-500">
              Cart <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full px-2 text-xs">2</span>
            </a>
          </div>
          {/* User Account Icon */}
          <div>
            <a href="#" className="hover:text-blue-500">Account</a>
          </div>
        </div>
      </header>

      <div className="container mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Summary Section - Left Column */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center mb-4 p-4 border rounded">
              <img src="/placeholder.jpg" alt={item.name} className="h-16 w-16 mr-4" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex items-center">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                </div>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
                <button onClick={() => handleRemove(item.id)} className="text-red-600">Remove</button>
                <button className="ml-2 text-gray-600">Save for later</button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Section - Right Column */}
        <div className="lg:col-span-1">
          <div className="bg-gray-100 p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Cost</span>
              <span>Calculated</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Taxes</span>
              <span>Calculated</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Promo code" className="px-4 py-2 border rounded mr-2" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
            </div>
            <p className="mb-4">Estimated Delivery Date: December 25, 2023</p>
            <div>
              <h3 className="font-semibold mb-2">Payment Methods</h3>
              {/* Payment method logos/icons */}
              <div>Visa, Mastercard, PayPal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping and Billing Address Section */}
      <div className="container mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          {/* Shipping address form */}
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">Billing Address</h2>
          {/* Billing address form */}
        </div>
      </div>

      {/* Payment Section */}
      <div className="container mx-auto mt-10 px-6">
        <h2 className="text-xl font-bold mb-4">Payment Information</h2>
        {/* Payment method options and form */}
      </div>

      {/* Review Order Section */}
      <div className="container mx-auto mt-10 px-6">
        <h2 className="text-xl font-bold mb-4">Review Order</h2>
        {/* Order summary */}
      </div>

      {/* Call to Action */}
      <div className="container mx-auto mt-10 px-6 mb-10">
        <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full">Place Order - ${subtotal.toFixed(2)}</button>
      </div>

      {/* Additional Features */}
      <div className="container mx-auto mt-10 px-6">
        {/* Progress Indicator */}
        <div className="flex justify-between mb-4">
          <span>Cart</span>
          <span>Shipping</span>
          <span>Payment</span>
          <span>Review</span>
          <span>Complete</span>
        </div>
        {/* Trust Badges */}
        <div className="flex space-x-4">
          {/* Security icons */}
        </div>
        {/* Customer Support */}
        <div>
          {/* Live chat button/contact link */}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
