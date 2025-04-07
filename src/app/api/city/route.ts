import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        city: {
          include: {
            buildings: true,
          },
        },
      },
    });

    if (!user?.city) {
      // Create a new city for the user if they don't have one
      const newCity = await prisma.city.create({
        data: {
          name: `${session.user.name}'s City`,
          userId: user.id,
        },
        include: {
          buildings: true,
        },
      });

      return NextResponse.json({
        buildings: newCity.buildings,
      });
    }

    return NextResponse.json({
      buildings: user.city.buildings,
    });
  } catch (error) {
    console.log('[CITY_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 