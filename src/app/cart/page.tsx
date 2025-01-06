'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency } from '../../../lib/utils';

interface CartItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  image_url: string; // Placeholder for image URL
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = async (productId: number, quantity: number) => {
    try {
      const response = await fetch('/api/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId, quantity }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update quantity: ${response.status}`);
      }

      setCartItems(cartItems.map(item =>
        item.product_id === productId ? { ...item, quantity } : item
      ));
    } catch (error: any) {
      console.error('Error updating cart:', error);
      setError('Failed to update cart.');
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/cart');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCartItems(data.data);
      } catch (error: any) {
        console.error('Error fetching cart items:', error);
        setError('Failed to load cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {cartItems.map(item => (
            <div key={item.product_id} className="flex items-center justify-between border p-4 rounded">
              <img src={item.image_url} alt={item.name} className="h-16 w-16 object-cover mr-4" />
              <h3 className="text-lg font-semibold">
                <Link href={`/products/${item.product_id}`}>
                  {item.name}
                </Link>
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor={`quantity-${item.product_id}`}>Quantity:</label>
                  <select
                    id={`quantity-${item.product_id}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <p>Price: {formatCurrency(item.price)}</p>
                <p>Subtotal: {formatCurrency(item.quantity * item.price)}</p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={async () => {
                    const response = await fetch(`/api/cart/remove?productId=${item.product_id}`, {
                      method: 'DELETE',
                    });
                    if (response.ok) {
                      setCartItems(cartItems.filter(cartItem => cartItem.product_id !== item.product_id));
                    } else {
                      console.error('Failed to remove item from cart');
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <form className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="lastName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" id="city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input type="text" id="state" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP</label>
            <input type="text" id="zip" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
              Credit Card
            </label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="paypal" name="paymentMethod" value="paypal" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
              PayPal
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>{formatCurrency(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0))}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Cost</span>
          <span>{formatCurrency(10)}</span> {/* Placeholder shipping cost */}
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>{formatCurrency(0)}</span> {/* Placeholder tax */}
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) + 10)}</span> {/* Placeholder total */}
        </div>
        <button
          className="bg-primary-accent hover:bg-primary-accent-dark text-white font-bold py-2 px-4 rounded mt-4"
          onClick={async () => {
            const orderData = {
              cartItems: cartItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
              })),
              firstName: (document.getElementById('firstName') as HTMLInputElement).value,
              lastName: (document.getElementById('lastName') as HTMLInputElement).value,
              email: (document.getElementById('email') as HTMLInputElement).value,
              phone: (document.getElementById('phone') as HTMLInputElement).value,
              address: (document.getElementById('address') as HTMLInputElement).value,
              city: (document.getElementById('city') as HTMLInputElement).value,
              state: (document.getElementById('state') as HTMLInputElement).value,
              zip: (document.getElementById('zip') as HTMLInputElement).value,
            };

            try {
              const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
              });

              if (response.ok) {
                console.log('Order placed successfully');
                // Optionally redirect or clear cart
              } else {
                console.error('Failed to place order');
              }
            } catch (error) {
              console.error('Error placing order:', error);
            }
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
