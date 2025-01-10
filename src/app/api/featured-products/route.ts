// src/app/api/featured-products/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Product } from 'types';

export async function GET() {
    try {
        // Query to fetch 6 featured products
        const query = `
            SELECT 
                product_id,
                name,
                description,
                price,
                image_url,
                category,
                created_at,
                stock_quantity,
                featured
            FROM 
                products 
            WHERE 
                featured = TRUE 
            LIMIT 6;
        `;

        // Execute the query
        const result = await db.query(query);

        // Check if the query returned any rows
        if (!result || !result.rows || result.rows.length === 0) {
            console.error("No featured products found.");
            return NextResponse.json(
                { error: 'No featured products found.' }, 
                { status: 404 }
            );
        }

        // Convert price to a number for each product
        const products = result.rows.map((product: Product) => ({
            ...product,
            price: parseFloat(product.price), // Ensure price is a number
        }));

        // Return the products as JSON
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch featured products' }, 
            { status: 500 }
        );
    }
}
