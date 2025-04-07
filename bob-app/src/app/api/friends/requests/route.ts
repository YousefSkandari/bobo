import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET friend requests for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'received'; // 'received' or 'sent'
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Determine which requests to fetch based on type
    const whereClause = type === 'sent' 
      ? { senderId: userId } 
      : { receiverId: userId };
    
    // Fetch friend requests
    const requests = await prisma.friendRequest.findMany({
      where: {
        ...whereClause,
        status: 'pending', // Only fetch pending requests
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            name: true, 
            avatar: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch friend requests' },
      { status: 500 }
    );
  }
}

// PATCH to respond to a friend request
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.requestId || !body.action) {
      return NextResponse.json(
        { error: 'Request ID and action are required' },
        { status: 400 }
      );
    }
    
    // Validate action
    if (!['accept', 'reject'].includes(body.action)) {
      return NextResponse.json(
        { error: 'Action must be either "accept" or "reject"' },
        { status: 400 }
      );
    }
    
    // Get the friend request
    const friendRequest = await prisma.friendRequest.findUnique({
      where: { id: body.requestId },
    });
    
    if (!friendRequest) {
      return NextResponse.json(
        { error: 'Friend request not found' },
        { status: 404 }
      );
    }
    
    if (friendRequest.status !== 'pending') {
      return NextResponse.json(
        { error: 'This request has already been processed' },
        { status: 400 }
      );
    }
    
    // Update the friend request status
    const updatedRequest = await prisma.friendRequest.update({
      where: { id: body.requestId },
      data: {
        status: body.action === 'accept' ? 'accepted' : 'rejected',
      },
    });
    
    // If accepted, create a friendship
    if (body.action === 'accept') {
      await prisma.friendship.create({
        data: {
          user1Id: friendRequest.senderId,
          user2Id: friendRequest.receiverId,
        },
      });
    }
    
    return NextResponse.json({
      message: `Friend request ${body.action}ed`,
      request: updatedRequest,
    });
  } catch (error) {
    console.error('Error responding to friend request:', error);
    return NextResponse.json(
      { error: 'Failed to respond to friend request' },
      { status: 500 }
    );
  }
} 