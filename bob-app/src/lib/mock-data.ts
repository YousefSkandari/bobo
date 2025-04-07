// This file contains static mock data to replace database functionality

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatar?: string;
}

export interface PortfolioItem {
  id: string;
  userId: string;
  stockSymbol: string;
  stockName: string;
  quantity: number;
  averagePrice: number;
  currentPrice?: number;
}

export interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
}

export interface CosmeticOwned {
  id: string;
  userId: string;
  cosmeticId: string;
  isEquipped: boolean;
  appliedTo?: string;
}

export interface CityComponent {
  id: string;
  userId: string;
  portfolioItemId: string;
  type: string;
  size: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  appearance?: any;
  performance: number;
  level: number;
}

// Mock users
export const users: User[] = [
  {
    id: "user-1",
    email: "demo@example.com",
    username: "demo_user",
    name: "Demo User",
    avatar: "https://ui-avatars.com/api/?name=Demo+User"
  },
  {
    id: "user-2",
    email: "user2@example.com",
    username: "investor_pro",
    name: "Investor Pro",
    avatar: "https://ui-avatars.com/api/?name=Investor+Pro"
  }
];

// Mock portfolio items
export const portfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-1",
    userId: "user-1",
    stockSymbol: "AAPL",
    stockName: "Apple Inc.",
    quantity: 10,
    averagePrice: 150.75,
    currentPrice: 175.05
  },
  {
    id: "portfolio-2",
    userId: "user-1",
    stockSymbol: "MSFT",
    stockName: "Microsoft Corp",
    quantity: 5,
    averagePrice: 245.30,
    currentPrice: 250.06
  },
  {
    id: "portfolio-3",
    userId: "user-1",
    stockSymbol: "TSLA",
    stockName: "Tesla Inc.",
    quantity: 3,
    averagePrice: 280.50,
    currentPrice: 296.75
  }
];

// Mock cosmetic items
export const cosmeticItems: CosmeticItem[] = [
  {
    id: "cosmetic-1",
    name: "Basic Office Building",
    description: "A simple office building for your city",
    category: "building",
    price: 1000,
    imageUrl: "/assets/buildings/office-basic.png"
  },
  {
    id: "cosmetic-2",
    name: "Luxury Skyscraper",
    description: "An impressive skyscraper to showcase your wealth",
    category: "building",
    price: 10000,
    imageUrl: "/assets/buildings/skyscraper-luxury.png"
  }
];

// Mock owned cosmetics
export const cosmeticsOwned: CosmeticOwned[] = [
  {
    id: "owned-1",
    userId: "user-1",
    cosmeticId: "cosmetic-1",
    isEquipped: true
  }
];

// Mock city components
export const cityComponents: CityComponent[] = [
  {
    id: "city-1",
    userId: "user-1",
    portfolioItemId: "portfolio-1",
    type: "building",
    size: "medium",
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    performance: 1.2,
    level: 1
  }
];

// Mock data service (with functions that mimic database operations)
const mockDataService = {
  // User operations
  getUsers: () => users,
  getUserById: (id: string) => users.find(user => user.id === id),
  getUserByEmail: (email: string) => users.find(user => user.email === email),
  
  // Portfolio operations
  getPortfolioItems: (userId: string) => portfolioItems.filter(item => item.userId === userId),
  getPortfolioItemById: (id: string) => portfolioItems.find(item => item.id === id),
  
  // Cosmetic operations
  getCosmeticItems: () => cosmeticItems,
  getCosmeticById: (id: string) => cosmeticItems.find(item => item.id === id),
  
  // Owned cosmetics operations
  getOwnedCosmetics: (userId: string) => cosmeticsOwned.filter(item => item.userId === userId),
  
  // City component operations
  getCityComponents: (userId: string) => cityComponents.filter(component => component.userId === userId)
};

export default mockDataService; 