import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET friends for a user
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
    
    // Get all friendships where the user is either user1 or user2
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId },
        ],
      },
      include: {
        user1: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          }
        },
        user2: {
          select: {
            id: true,
            username: true,
            name: true, 
            avatar: true,
          }
        },
      },
    });
    
    // Map the results to get an array of friend users
    const friends = friendships.map((friendship: any) => {
      // Determine which user is the friend (not the current user)
      const friend = friendship.user1Id === userId ? friendship.user2 : friendship.user1;
      return {
        ...friend,
        friendshipId: friendship.id,
        friendSince: friendship.createdAt,
      };
    });
    
    return NextResponse.json(friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch friends' },
      { status: 500 }
    );
  }
}

// POST to send a friend request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.senderId || !body.receiverId) {
      return NextResponse.json(
        { error: 'Sender and receiver IDs are required' },
        { status: 400 }
      );
    }
    
    // Check if users exist
    const sender = await prisma.user.findUnique({
      where: { id: body.senderId },
    });
    
    const receiver = await prisma.user.findUnique({
      where: { id: body.receiverId },
    });
    
    if (!sender || !receiver) {
      return NextResponse.json(
        { error: 'One or both users not found' },
        { status: 404 }
      );
    }
    
    // Check if they're already friends
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { AND: [{ user1Id: body.senderId }, { user2Id: body.receiverId }] },
          { AND: [{ user1Id: body.receiverId }, { user2Id: body.senderId }] },
        ],
      },
    });
    
    if (existingFriendship) {
      return NextResponse.json(
        { error: 'Users are already friends' },
        { status: 400 }
      );
    }
    
    // Check if there's already a pending request
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { AND: [{ senderId: body.senderId }, { receiverId: body.receiverId }] },
          { AND: [{ senderId: body.receiverId }, { receiverId: body.senderId }] },
        ],
        status: 'pending',
      },
    });
    
    if (existingRequest) {
      return NextResponse.json(
        { error: 'A friend request already exists between these users' },
        { status: 400 }
      );
    }
    
    // Create a new friend request
    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: body.senderId,
        receiverId: body.receiverId,
      },
    });
    
    return NextResponse.json(friendRequest, { status: 201 });
  } catch (error) {
    console.error('Error sending friend request:', error);
    return NextResponse.json(
      { error: 'Failed to send friend request' },
      { status: 500 }
    );
  }
} 