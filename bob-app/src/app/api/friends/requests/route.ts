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
    
    // In a real app, we would fetch friend requests from database
    // For now, return mock data
    const mockRequests = [
      { 
        id: 'request-1', 
        sender: { id: 'user-3', username: 'new_friend', name: 'New Friend', avatar: 'https://ui-avatars.com/api/?name=New+Friend' },
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json(mockRequests);
    
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch friend requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, targetUserId } = await request.json();
    
    if (!userId || !targetUserId) {
      return NextResponse.json(
        { error: 'User ID and target user ID are required' },
        { status: 400 }
      );
    }
    
    // In a real app, we would create a friend request in the database
    // For now, return success message
    return NextResponse.json({
      success: true,
      message: 'Friend request sent successfully',
      requestId: 'mock-request-id-' + Math.random().toString(36).substring(2, 10)
    });
    
  } catch (error) {
    console.error('Error sending friend request:', error);
    return NextResponse.json(
      { error: 'Failed to send friend request' },
      { status: 500 }
    );
  }
}
