import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import type { Customer, Order } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'registration_date';
    const order = searchParams.get('order') || 'DESC';

    // Base query with search filters
    let query = `
      SELECT 
        c.customer_id,
        c.name,
        c.email,
        c.phone,
        c.registration_date,
        c.newsletter_opt_in,
        c.subscription_status,
        json_agg(
          json_build_object(
            'id', o.order_id,
            'total_amount', o.total_amount,
            'status', o.status,
            'created_at', o.created_at
          )
        ) AS orders
      FROM customers c
      LEFT JOIN orders o ON c.customer_id = o.customer_id
    `;

    // Add search conditions if search term exists
    if (search) {
      query += `
        WHERE 
          c.name ILIKE $1 OR
          c.email ILIKE $1 OR
          c.phone ILIKE $1
      `;
    }

    // Add grouping and ordering
    query += `
      GROUP BY c.customer_id
      ORDER BY ${sort} ${order}
      LIMIT $${search ? 2 : 1}
      OFFSET $${search ? 3 : 2}
    `;

    // Count query for pagination
    const countQuery = `
      SELECT COUNT(*) 
      FROM customers
      ${search ? 'WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1' : ''}
    `;

    const offset = (page - 1) * limit;
    const params = search ? [`%${search}%`, limit, offset] : [limit, offset];

    const [customersResult, totalResult] = await Promise.all([
      db.query(query, params),
      db.query(countQuery, search ? [`%${search}%`] : [])
    ]);

    const customers = customersResult.rows.map((row: {
      customer_id: number;
      name: string;
      email: string;
      phone: string | null;
      registration_date: Date;
      newsletter_opt_in: boolean;
      subscription_status: string;
      orders: Order[];
    }) => ({
      ...row,
      orders: row.orders.filter((o: Order | null) => o?.id !== null) // Remove null orders from aggregation
    }));

    return NextResponse.json({
      data: customers,
      pagination: {
        page,
        limit,
        total: parseInt(totalResult.rows[0].count),
        totalPages: Math.ceil(parseInt(totalResult.rows[0].count) / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const customerData = await request.json();
    
    const customer = await db.customer.create({
      data: customerData
    });

    return NextResponse.json(customer);
  } catch (error: any) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
