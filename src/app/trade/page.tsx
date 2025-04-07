'use client';

import React, { Suspense } from 'react';

// Imports removed to fix "All imports in import declaration are unused" error

// Mock available stocks - same data source as in stock pages
const availableStocks = [
  { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 175.05, change: 3.2, marketCap: 2850, volume: 68.5, sector: 'Technology', popular: true },
  { id: 2, name: 'Microsoft Corp', symbol: 'MSFT', price: 250.06, change: -0.8, marketCap: 1870, volume: 32.1, sector: 'Technology', popular: true },
  { id: 3, name: 'Tesla Inc.', symbol: 'TSLA', price: 296.75, change: 5.7, marketCap: 942, volume: 120.3, sector: 'Automotive', popular: true },
  { id: 4, name: 'Amazon.com Inc.', symbol: 'AMZN', price: 337.95, change: 1.2, marketCap: 1350, volume: 54.8, sector: 'Consumer Cyclical', popular: true },
  { id: 5, name: 'Google', symbol: 'GOOGL', price: 1350.10, change: -1.3, marketCap: 1720, volume: 22.5, sector: 'Technology', popular: true },
  { id: 6, name: 'Netflix Inc.', symbol: 'NFLX', price: 450.25, change: 1.2, marketCap: 196, volume: 10.2, sector: 'Entertainment' },
  { id: 7, name: 'Adobe Inc.', symbol: 'ADBE', price: 380.75, change: 0.8, marketCap: 171, volume: 8.5, sector: 'Technology' },
  { id: 8, name: 'Nvidia Corp.', symbol: 'NVDA', price: 620.50, change: 2.3, marketCap: 1520, volume: 88.7, sector: 'Technology', popular: true },
  { id: 9, name: 'PayPal Holdings', symbol: 'PYPL', price: 110.30, change: -1.5, marketCap: 115, volume: 17.3, sector: 'Financial Services' },
  { id: 10, name: 'Shopify Inc.', symbol: 'SHOP', price: 85.45, change: 0.3, marketCap: 108, volume: 12.8, sector: 'Technology' },
];

// Prevent static generation
export const dynamic = 'force-dynamic';

// Helper function to get a color for a stock symbol
function getStockColor(symbol: string) {
  const colors = [
    '#4f46e5', '#0284c7', '#0891b2', '#0d9488', 
    '#059669', '#16a34a', '#65a30d', '#ca8a04', 
    '#d97706', '#ea580c', '#dc2626', '#e11d48', 
    '#db2777', '#c026d3', '#9333ea', '#7c3aed'
  ];
  
  // Simple hash to get consistent colors for each stock
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = ((hash << 5) - hash) + symbol.charCodeAt(i);
    hash &= hash;
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// Mock user portfolio
const userPortfolio = {
  cash: 10000.50,
  stocks: [
    { symbol: 'AAPL', shares: 10, averagePrice: 170.25 },
    { symbol: 'MSFT', shares: 5, averagePrice: 240.10 },
    { symbol: 'TSLA', shares: 3, averagePrice: 290.75 },
  ]
};

// Client component with suspense boundary for useSearchParams
function TradePageContent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trade Page</h1>
      <p className="mb-4">Select a stock to trade:</p>
      <div className="space-y-4">
        {availableStocks.map(stock => (
          <div 
            key={stock.id}
            className="p-4 border rounded shadow hover:shadow-md cursor-pointer"
          >
            <h2 className="font-bold">{stock.name} ({stock.symbol})</h2>
            <p className="text-lg">${stock.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TradePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TradePageContent />
    </Suspense>
  );
} 