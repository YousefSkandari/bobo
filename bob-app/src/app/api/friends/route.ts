import { NextRequest, NextResponse } from 'next/server';
import mockDataService from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // In a real app, we would fetch the user's friends from the database
    // For now, return mock data
    const mockFriends = [
      { id: 'friend-1', username: 'friend_user1', name: 'Friend User', avatar: 'https://ui-avatars.com/api/?name=Friend+User' },
      { id: 'friend-2', username: 'cool_investor', name: 'Cool Investor', avatar: 'https://ui-avatars.com/api/?name=Cool+Investor' }
    ];
    
    return NextResponse.json(mockFriends);
    
  } catch (error) {
    console.error('Error fetching friends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch friends' },
      { status: 500 }
    );
  }
}
