import { NextRequest, NextResponse } from 'next/server';
import mockDataService from '@/lib/mock-data';

export async function POST(request: NextRequest) {
  try {
    const { userId, cosmeticId } = await request.json();
    
    // Validate request
    if (!userId || !cosmeticId) {
      return NextResponse.json(
        { error: 'User ID and cosmetic ID are required' },
        { status: 400 }
      );
    }
    
    // In a real app, we would process the purchase here
    // For now, just return a success message
    return NextResponse.json({
      success: true,
      message: 'Cosmetic item purchased successfully',
      purchaseId: 'mock-purchase-id-' + Math.random().toString(36).substring(2, 10)
    });
    
  } catch (error) {
    console.error('Error purchasing cosmetic item:', error);
    return NextResponse.json(
      { error: 'Failed to purchase cosmetic item' },
      { status: 500 }
    );
  }
}
