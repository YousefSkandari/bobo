import { NextResponse } from 'next/server';
import mockDataService from '@/lib/mock-data';

export async function GET() {
  try {
    // Get users from mock data instead of database
    const users = mockDataService.getUsers();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
} 