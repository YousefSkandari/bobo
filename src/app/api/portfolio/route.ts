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
        portfolio: {
          include: {
            stocks: true,
          },
        },
      },
    });

    if (!user?.portfolio) {
      return NextResponse.json({
        totalValue: 0,
        dailyChange: 0,
        stocks: [],
      });
    }

    // In a real application, you would fetch real-time stock prices from an API
    // For the MVP, we'll use mock data
    const mockStockData = {
      AAPL: { price: 150.0, change: 2.5 },
      GOOGL: { price: 2800.0, change: -1.2 },
      MSFT: { price: 280.0, change: 0.8 },
    };

    const stocks = user.portfolio.stocks.map((stock) => {
      const mockData = mockStockData[stock.symbol as keyof typeof mockStockData] || {
        price: 100.0,
        change: 0.0,
      };

      return {
        symbol: stock.symbol,
        shares: stock.shares,
        currentPrice: mockData.price,
        dailyChange: mockData.change,
      };
    });

    const totalValue = stocks.reduce(
      (sum, stock) => sum + stock.currentPrice * stock.shares,
      0
    );

    const dailyChange =
      stocks.reduce(
        (sum, stock) =>
          sum + (stock.currentPrice * stock.shares * stock.dailyChange) / 100,
        0
      ) / totalValue;

    return NextResponse.json({
      totalValue,
      dailyChange,
      stocks,
    });
  } catch (error) {
    console.log('[PORTFOLIO_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 