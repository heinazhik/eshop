import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db.ts';

export async function GET(request: NextRequest, { params }: { params?: { id: string } }) {
  try {
    // Handle single order request
    if (params?.id) {
      const order = await db.order.findUnique({
        where: { id: params.id },
        include: {
          order_items: {
            include: {
              product: true
            }
          }
        }
      });

      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(order);
    }

    // Handle list of orders request
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';

    const where = {
      OR: [
        { id: { contains: search } },
        { customer_name: { contains: search } },
        { customer_email: { contains: search } }
      ],
      status: status ? { equals: status } : undefined
    };

    const [orders, total] = await Promise.all([
      db.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy: { [sort]: order },
        include: {
          order_items: {
            include: {
              product: true
            }
          }
        }
      }),
      db.order.count({ where })
    ]);

    return NextResponse.json({
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json();
    
    const order = await db.order.update({
      where: { id: params.id },
      data: { status }
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

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
