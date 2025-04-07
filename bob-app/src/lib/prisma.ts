import { PrismaClient } from '@prisma/client';
import mockPrismaClient from './prisma-mock';

// Use a global variable to prevent multiple instances during development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Try to use real Prisma client, fall back to mock if no database connection
let prisma: any;

try {
  if (process.env.DATABASE_URL) {
    prisma = globalForPrisma.prisma || new PrismaClient();
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma;
    }
  } else {
    console.warn('No DATABASE_URL found, using mock Prisma client');
    prisma = mockPrismaClient;
  }
} catch (error) {
  console.warn('Using mock Prisma client due to database connection issues:', error);
  prisma = mockPrismaClient;
}

export default prisma; 