import { PrismaClient } from '@prisma/client';
import mockPrismaClient from './prisma-mock';

// Use a global variable to prevent multiple instances during development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Try to use real Prisma client, fall back to mock if there's an error
let prisma: any;

try {
  prisma = globalForPrisma.prisma || new PrismaClient();
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }
} catch (error) {
  console.warn('Using mock Prisma client due to database connection issues');
  prisma = mockPrismaClient;
}

export default prisma; 