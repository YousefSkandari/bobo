import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET city information for a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get all city components for the user
    const cityComponents = await prisma.cityComponent.findMany({
      where: { userId },
      include: {
        portfolioItem: {
          select: {
            stockSymbol: true,
            stockName: true,
            quantity: true,
            averagePrice: true,
            currentPrice: true,
          },
        },
      },
    });
    
    // Get user's portfolio performance data
    const portfolioItems = await prisma.portfolioItem.findMany({
      where: { userId },
    });
    
    // Calculate simple portfolio metrics
    const totalValue = portfolioItems.reduce((total: number, item: any) => {
      return total + (item.currentPrice || item.averagePrice) * item.quantity;
    }, 0);
    
    const initialValue = portfolioItems.reduce((total: number, item: any) => {
      return total + item.averagePrice * item.quantity;
    }, 0);
    
    const performancePercentage = initialValue > 0 
      ? ((totalValue - initialValue) / initialValue) * 100 
      : 0;
    
    // Get cosmetic items applied to the city
    const cosmeticItems = await prisma.cosmeticOwned.findMany({
      where: { 
        userId,
        isEquipped: true,
      },
      include: {
        cosmetic: true,
      },
    });
    
    const cityData = {
      user,
      cityComponents,
      portfolioMetrics: {
        totalValue,
        initialValue,
        performancePercentage,
        stockCount: portfolioItems.length,
      },
      cosmeticItems: cosmeticItems.map((item: any) => ({
        id: item.cosmetic.id,
        name: item.cosmetic.name,
        category: item.cosmetic.category,
        imageUrl: item.cosmetic.imageUrl,
        appliedTo: item.appliedTo,
      })),
    };
    
    return NextResponse.json(cityData);
  } catch (error) {
    console.error('Error fetching city data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch city data' },
      { status: 500 }
    );
  }
} 