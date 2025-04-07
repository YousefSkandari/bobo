// This is a mock implementation of Prisma client for when no database is available
// It returns empty arrays for queries and empty objects for single items

const mockPrismaClient = {
  user: {
    findUnique: () => Promise.resolve({}),
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve(data.data),
    update: (data: any) => Promise.resolve(data.data),
    delete: () => Promise.resolve({}),
  },
  portfolioItem: {
    findUnique: () => Promise.resolve({}),
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve(data.data),
    update: (data: any) => Promise.resolve(data.data),
    delete: () => Promise.resolve({}),
  },
  cosmeticItem: {
    findUnique: () => Promise.resolve({}),
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve(data.data),
    update: (data: any) => Promise.resolve(data.data),
    delete: () => Promise.resolve({}),
  },
  cosmeticOwned: {
    findUnique: () => Promise.resolve({}),
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve(data.data),
    update: (data: any) => Promise.resolve(data.data),
    delete: () => Promise.resolve({}),
  },
  friendRequest: {
    findUnique: () => Promise.resolve({}),
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve(data.data),
    update: (data: any) => Promise.resolve(data.data),
    delete: () => Promise.resolve({}),
  },
  friendship: {
    findUnique: () => Promise.resolve({}),
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve(data.data),
    update: (data: any) => Promise.resolve(data.data),
    delete: () => Promise.resolve({}),
  },
  cityComponent: {
    findUnique: () => Promise.resolve({}),
    findMany: () => Promise.resolve([]),
    create: (data: any) => Promise.resolve(data.data),
    update: (data: any) => Promise.resolve(data.data),
    delete: () => Promise.resolve({}),
  },
};

export default mockPrismaClient; 