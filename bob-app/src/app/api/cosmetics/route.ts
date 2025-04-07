import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all cosmetic items
export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Create filter options
    const where = category ? { category } : {};
    
    // Fetch cosmetic items
    const items = await prisma.cosmeticItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching cosmetic items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cosmetic items' },
      { status: 500 }
    );
  }
}

// POST to create a new cosmetic item (admin only in real implementation)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new cosmetic item
    const newItem = await prisma.cosmeticItem.create({
      data: {
        name: body.name,
        description: body.description || '',
        category: body.category,
        price: parseFloat(body.price),
        imageUrl: body.imageUrl || '',
      },
    });
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating cosmetic item:', error);
    return NextResponse.json(
      { error: 'Failed to create cosmetic item' },
      { status: 500 }
    );
  }
} 