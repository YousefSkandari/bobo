#!/bin/bash

# This script replaces all API routes with versions that use mock data

# Fix city/[userId]/route.ts
cat > bob-app/src/app/api/city/\[userId\]/route.ts << 'EOL'
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
EOL

# Fix cosmetics/route.ts
cat > bob-app/src/app/api/cosmetics/route.ts << 'EOL'
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
EOL

# Fix cosmetics/purchase/route.ts
cat > bob-app/src/app/api/cosmetics/purchase/route.ts << 'EOL'
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
EOL

# Fix friends/route.ts
cat > bob-app/src/app/api/friends/route.ts << 'EOL'
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
EOL

# Fix friends/requests/route.ts
cat > bob-app/src/app/api/friends/requests/route.ts << 'EOL'
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
EOL

# Fix portfolio/route.ts
cat > bob-app/src/app/api/portfolio/route.ts << 'EOL'
import { NextRequest, NextResponse } from 'next/server';
import mockDataService from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user-1'; // Default to first user
    
    // Get portfolio items from mock data
    const items = mockDataService.getPortfolioItems(userId);
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}
EOL

echo "All API routes updated to use mock data" 