import { NextResponse } from 'next/server';
import mockDataService from '@/lib/mock-data';

export async function GET() {
  try {
    // Get cosmetic items from mock data
    const cosmeticItems = mockDataService.getCosmeticItems();
    
    return NextResponse.json(cosmeticItems);
  } catch (error) {
    console.error('Error fetching cosmetic items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cosmetic items' },
      { status: 500 }
    );
  }
}
