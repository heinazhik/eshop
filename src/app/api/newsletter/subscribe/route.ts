import { NextResponse } from 'next/server';
import { db } from 'lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Check if email exists
    const existing = await db.query(
      'SELECT * FROM customers WHERE email = $1',
      [email]
    );
    
    if (existing.rows.length > 0) {
      // Update existing record
      await db.query(
        'UPDATE customers SET newsletter_opt_in = true WHERE email = $1',
        [email]
      );
    } else {
      // Create new record
      await db.query(
        'INSERT INTO customers (email, newsletter_opt_in) VALUES ($1, $2)',
        [email, true]
      );
    }
    
    return NextResponse.json({ 
      message: 'Subscription successful!' 
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}