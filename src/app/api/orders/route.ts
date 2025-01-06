import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { cartItems, ...customerInfo } = await request.json();

    // Calculate total amount
    const totalAmount = cartItems.reduce((acc: number, item: { quantity: number, price: number }) => acc + item.quantity * item.price, 0);

    // Create order in the database
    const order = await db.order.create({
      data: {
        total_amount: totalAmount,
        customer_name: customerInfo.firstName + ' ' + customerInfo.lastName,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        shipping_address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        zip_code: customerInfo.zip,
        order_date: new Date(),
        order_items: {
          create: cartItems.map((item: { product_id: number, quantity: number, price: number }) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            item_price: item.price,
          })),
        },
      },
      include: {
        order_items: true,
      },
    });

    console.log('Order created:', order);

    return NextResponse.json({ message: 'Order placed successfully', orderId: order.id });
  } catch (error: any) {
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
