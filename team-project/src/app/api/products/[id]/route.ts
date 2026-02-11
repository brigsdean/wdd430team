import { NextRequest, NextResponse } from 'next/server';

// Mock data - replace with real DB calls
const mockProducts = [
  {
    id: 1,
    title: 'Handmade Ceramic Bowl',
    price: 45.99,
    seller: 'Clay Master Studio',
    category: 'Pottery',
    description: 'Beautiful handcrafted ceramic bowl perfect for serving or decoration.',
    materials: 'Ceramic, food-safe glaze',
    dimensions: '8 inches diameter, 4 inches height',
    weight: '2 lbs',
    images: ['/images/bowl1.jpg', '/images/bowl2.jpg'],
    rating: 4.5,
    reviews: [
      {
        id: 1,
        user: 'John D.',
        rating: 5,
        comment: 'Amazing quality! Perfect gift.',
        date: '2024-01-15'
      },
      {
        id: 2,
        user: 'Sarah M.',
        rating: 4,
        comment: 'Beautiful piece, exactly as described.',
        date: '2024-01-10'
      }
    ]
  },
  {
    id: 2,
    title: 'Hand-woven Textile Blanket',
    price: 89.99,
    seller: 'Textile Arts Co.',
    category: 'Textiles',
    description: 'Cozy hand-woven blanket made with natural fibers.',
    materials: '100% organic cotton, natural dyes',
    dimensions: '60 x 80 inches',
    weight: '3.5 lbs',
    images: ['/images/blanket1.jpg'],
    rating: 4.8,
    reviews: []
  }
];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const productId = parseInt(id);

    // Mock: fetch product from "database"
    const product = mockProducts.find(p => p.id === productId);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error fetching product' },
      { status: 500 }
    );
  }
}
