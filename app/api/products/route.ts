import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mainAsin, mainImage, variants } = body;

    if (!name || !mainAsin || !mainImage) {
      return NextResponse.json({ error: 'Missing required fields (name, mainAsin, mainImage)' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if product already exists
    const existingProduct = await Product.findOne({ mainAsin });
    if (existingProduct) {
      return NextResponse.json({ error: `Product with ASIN ${mainAsin} already exists` }, { status: 409 });
    }

    // Save to MongoDB
    const newProduct = await Product.create({
      name,
      mainAsin,
      mainImage,
      variants
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
