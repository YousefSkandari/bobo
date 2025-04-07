import { NextRequest, NextResponse } from 'next/server';
import mockDataService from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    
    // Use mock data instead of database
    const components = mockDataService.getCityComponents(userId);
    
    return NextResponse.json({ components });
  } catch (error) {
    console.error('Error fetching city components:', error);
    return NextResponse.json(
      { error: 'Failed to fetch city components' },
      { status: 500 }
    );
  }
}
