import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data (optional)
  await prisma.cosmeticOwned.deleteMany({});
  await prisma.portfolioItem.deleteMany({});
  await prisma.friendRequest.deleteMany({});
  await prisma.friendship.deleteMany({});
  await prisma.cityComponent.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.cosmeticItem.deleteMany({});

  // Create demo users
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      username: 'demo_user',
      password: await bcrypt.hash('password123', 10),
      name: 'Demo User',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User'
    }
  });

  const secondUser = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      username: 'investor_pro',
      password: await bcrypt.hash('password123', 10),
      name: 'Investor Pro',
      avatar: 'https://ui-avatars.com/api/?name=Investor+Pro'
    }
  });

  // Create cosmetic items
  const basicBuilding = await prisma.cosmeticItem.create({
    data: {
      name: 'Basic Office Building',
      description: 'A simple office building for your city',
      category: 'building',
      price: 1000,
      imageUrl: '/assets/buildings/office-basic.png'
    }
  });

  const luxuryBuilding = await prisma.cosmeticItem.create({
    data: {
      name: 'Luxury Skyscraper',
      description: 'An impressive skyscraper to showcase your wealth',
      category: 'building',
      price: 10000,
      imageUrl: '/assets/buildings/skyscraper-luxury.png'
    }
  });

  // Give the demo user some portfolio items
  await prisma.portfolioItem.createMany({
    data: [
      {
        userId: demoUser.id,
        stockSymbol: 'AAPL',
        stockName: 'Apple Inc.',
        quantity: 10,
        averagePrice: 150.75,
        currentPrice: 175.05
      },
      {
        userId: demoUser.id,
        stockSymbol: 'MSFT',
        stockName: 'Microsoft Corp',
        quantity: 5,
        averagePrice: 245.30,
        currentPrice: 250.06
      },
      {
        userId: demoUser.id,
        stockSymbol: 'TSLA',
        stockName: 'Tesla Inc.',
        quantity: 3,
        averagePrice: 280.50,
        currentPrice: 296.75
      }
    ]
  });

  // Give the demo user some cosmetic items
  await prisma.cosmeticOwned.create({
    data: {
      userId: demoUser.id,
      cosmeticId: basicBuilding.id,
      isEquipped: true
    }
  });

  console.log('Database has been seeded with demo data.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 