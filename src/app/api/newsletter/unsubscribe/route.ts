import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
        'UPDATE customers SET newsletter_opt_in = false WHERE email = $1',
        [email]
      );
      return NextResponse.json({ 
        message: 'You have unsubscribed.' 
      }, { status: 200 });
    }
    
    return NextResponse.json(
      { message: 'Email not found in our records.' },
      { status: 404 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to unsubscribe. Please try again.' },
      { status: 500 }
    );
  }
}
