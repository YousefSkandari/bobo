import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST to purchase a cosmetic item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, we would authenticate the user here
    // For now, we'll simulate by requiring a userId in the request
    if (!body.userId || !body.cosmeticId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: body.userId },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if cosmetic item exists and get its price
    const cosmeticItem = await prisma.cosmeticItem.findUnique({
      where: { id: body.cosmeticId },
    });
    
    if (!cosmeticItem) {
      return NextResponse.json(
        { error: 'Cosmetic item not found' },
        { status: 404 }
      );
    }
    
    // Check if user already owns this item
    const existingOwnership = await prisma.cosmeticOwned.findUnique({
      where: {
        userId_cosmeticId: {
          userId: body.userId,
          cosmeticId: body.cosmeticId,
        },
      },
    });
    
    if (existingOwnership) {
      return NextResponse.json(
        { error: 'User already owns this item' },
        { status: 400 }
      );
    }
    
    // In a real app, we would process payment here
    // For now, we'll just create the ownership record
    
    // Create ownership record
    const purchase = await prisma.cosmeticOwned.create({
      data: {
        userId: body.userId,
        cosmeticId: body.cosmeticId,
        isEquipped: body.autoEquip || false,
      },
      include: {
        cosmetic: true,
      },
    });
    
    return NextResponse.json({
      message: 'Purchase successful',
      purchase,
    }, { status: 201 });
  } catch (error) {
    console.error('Error purchasing cosmetic item:', error);
    return NextResponse.json(
      { error: 'Failed to purchase item' },
      { status: 500 }
    );
  }
} 