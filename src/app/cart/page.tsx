'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { useSession } from 'next-auth/react';

interface CartItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  image_url: string;
}

const CartPage: React.FC = () => {
  // Initialize cartItems with an empty array
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/cart', {
      headers: session?.user ? {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.id}`
      } : {
        'Content-Type': 'application/json'
      }
    });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCartItems(data?.data || []);
      } catch (error: unknown) {
        console.error('Error fetching cart items:', error);
        setError('Failed to load cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [session]);

  // Handle quantity change
  const handleQuantityChange = async (productId: number, quantity: number) => {
    try {
      const response = await fetch('/api/cart/update', {
        method: 'POST',
        headers: session?.user ? {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.id}`
        } : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId, quantity }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update quantity: ${response.status}`);
      }

      // Update the local state
      setCartItems(cartItems.map(item =>
        item.product_id === productId ? { ...item, quantity } : item
      ));
    } catch (error: unknown) {
      console.error('Error updating cart:', error);
      setError('Failed to update cart.');
    }
  };

  // Handle item removal
  const handleRemoveItem = async (productId: number) => {
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'DELETE',
          headers: session?.user ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.id}`
          } : {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.status}`);
      }

      // Update the local state
      setCartItems(cartItems.filter(item => item.product_id !== productId));
    } catch (error: unknown) {
      console.error('Error removing item:', error);
      setError('Failed to remove item.');
    }
  };

  // Handle placing an order
  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    try {
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
        paymentMethod: (document.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement)?.value,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: session?.user ? {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.id}`
        } : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.status}`);
      }

      // Clear the cart and redirect to the order confirmation page
      setCartItems([]);
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems?.length === 0 ? (
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
                  onClick={() => handleRemoveItem(item.product_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Shipping Address, Payment Method, and Order Summary sections remain unchanged */}
      <button
        className="bg-primary-accent hover:bg-primary-accent-dark text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handlePlaceOrder}
        disabled={placingOrder || cartItems.length === 0}
      >
        {placingOrder ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default CartPage;
