'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TradeModal, { Stock } from '@/components/TradeModal';
import AddStockModal from '@/components/AddStockModal';
import MainLayout from '@/components/MainLayout';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

// Function to get building color based on type and condition
function getBuildingColor(type: string, isRundown: boolean): string {
  // Base colors for different building types
  let baseColor;
  switch (type.toLowerCase()) {
    case 'residential':
      baseColor = 'var(--building-residential)';
      break;
    case 'commercial':
      baseColor = 'var(--building-commercial)';
      break;
    case 'industrial':
      baseColor = 'var(--building-industrial)';
      break;
    case 'technology':
      baseColor = 'var(--building-technology)';
      break;
    default:
      baseColor = 'var(--building-commercial)';
  }
  
  // For rundown buildings, we'll use CSS filters since we're using CSS variables
  if (isRundown) {
    return baseColor; // We'll apply filter effect using CSS filter instead
  }
  
  return baseColor;
}

// Helper function to adjust color brightness
function adjustColor(hex: string, amount: number): string {
  // Remove the # if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Adjust the values
  const newR = Math.max(0, Math.min(255, r + amount));
  const newG = Math.max(0, Math.min(255, g + amount));
  const newB = Math.max(0, Math.min(255, b + amount));
  
  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

export default function Dashboard() {
  const router = useRouter();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [availableCash, setAvailableCash] = useState(10000.00); // Initial cash balance
  
  // Mock portfolio data with new state
  const [portfolioData, setPortfolioData] = useState({
    // Calculate the total by summing individual stock values
    totalValue: 5916.90, // Sum of 1750.45 + 1250.30 + 890.25 + 675.90 + 1350.10 = 5917 (rounded)
    dailyChange: 2.34,
    stocks: [
      { id: 1, name: 'Apple Inc.', symbol: 'AAPL', shares: 10, value: 1750.45, change: 3.2, price: 175.05 },
      { id: 2, name: 'Microsoft Corp', symbol: 'MSFT', shares: 5, value: 1250.30, change: -0.8, price: 250.06 },
      { id: 3, name: 'Tesla Inc.', symbol: 'TSLA', shares: 3, value: 890.25, change: 5.7, price: 296.75 },
      { id: 4, name: 'Amazon.com Inc.', symbol: 'AMZN', shares: 2, value: 675.90, change: 1.2, price: 337.95 },
      { id: 5, name: 'Google', symbol: 'GOOGL', shares: 1, value: 1350.10, change: -1.3, price: 1350.10 },
    ] as Stock[]
  });
  
  // Calculate percentage of portfolio for each stock
  const stocksWithPercentage = portfolioData.stocks.map(stock => {
    const percentage = (stock.value && portfolioData.totalValue) ? 
      (stock.value / portfolioData.totalValue) * 100 : 0;
    return {
      ...stock,
      percentage: percentage,
      type: mapStockToType(stock.symbol) // Map stock to a building type
    };
  });
  
  // Handle trade execution (buy/sell)
  const handleTrade = (stock: Stock, quantity: number, action: 'buy' | 'sell') => {
    // Find the stock in our portfolio
    const stockIndex = portfolioData.stocks.findIndex(s => s.id === stock.id);
    if (stockIndex === -1) return;
    
    const currentStock = portfolioData.stocks[stockIndex];
    // Safe access with fallbacks
    const shares = currentStock.shares || 0;
    const value = currentStock.value || 0;
    
    // Calculate price per share
    const pricePerShare = shares > 0 ? value / shares : (stock.price || 0);
    
    // Clone the stocks array
    const updatedStocks = [...portfolioData.stocks];
    
    // Update the stock based on action
    if (action === 'buy') {
      // Update cash
      const cost = quantity * pricePerShare;
      setAvailableCash(prevCash => prevCash - cost);
      
      // Update stock
      updatedStocks[stockIndex] = {
        ...updatedStocks[stockIndex],
        shares: (updatedStocks[stockIndex]?.shares || 0) + quantity,
        value: (updatedStocks[stockIndex]?.value || 0) + cost
      };
    } else {
      // Calculate proceeds from sale
      const proceeds = quantity * pricePerShare;
      setAvailableCash(prevCash => prevCash + proceeds);
      
      // Update stock
      const newShares = (updatedStocks[stockIndex]?.shares || 0) - quantity;
      
      if (newShares <= 0) {
        // Remove stock from portfolio if all shares are sold
        updatedStocks.splice(stockIndex, 1);
      } else {
        updatedStocks[stockIndex] = {
          ...updatedStocks[stockIndex],
          shares: newShares,
          value: (updatedStocks[stockIndex]?.value || 0) - proceeds
        };
      }
    }
    
    // Recalculate total portfolio value
    const newTotalValue = updatedStocks.reduce((total, s) => total + (s.value || 0), 0);
    
    // Update portfolio data
    setPortfolioData({
      ...portfolioData,
      totalValue: newTotalValue,
      stocks: updatedStocks
    });
  };
  
  // Open trade modal for a stock
  const openTradeModal = (stock: Stock) => {
    setSelectedStock(stock);
    setIsTradeModalOpen(true);
  };
  
  // Handle adding a new stock to portfolio
  const handleAddStock = (stock: any, quantity: number) => {
    const pricePerShare = stock.price || 0;
    const totalValue = pricePerShare * quantity;
    
    // Update cash
    setAvailableCash(prevCash => prevCash - totalValue);
    
    // Create new stock for portfolio
    const newStock = {
      id: stock.id,
      name: stock.name,
      symbol: stock.symbol, 
      shares: quantity,
      value: totalValue,
      change: stock.change || 0
    };
    
    // Add to portfolio
    const updatedStocks = [...portfolioData.stocks, newStock];
    const newTotalValue = updatedStocks.reduce((total, s) => total + (s.value || 0), 0);
    
    // Update portfolio data
    setPortfolioData({
      ...portfolioData,
      totalValue: newTotalValue,
      stocks: updatedStocks
    });
  };
  
  // Get IDs of existing stocks for filtering in add stock modal
  const existingStockIds = portfolioData.stocks.map(stock => stock.id);
  
  // Load portfolio and cash data from localStorage on initial load
  useEffect(() => {
    try {
      const cashData = localStorage.getItem('bobCash');
      if (cashData) {
        setAvailableCash(parseFloat(cashData));
      }
    } catch (error) {
      console.error('Error loading cash data:', error);
    }
  }, []);
  
  // Save cash data when it changes
  useEffect(() => {
    localStorage.setItem('bobCash', availableCash.toString());
  }, [availableCash]);
  
  // Map stock symbol to building type for visualization
  function mapStockToType(symbol: string): string {
    const typeMap: {[key: string]: string} = {
      'AAPL': 'commercial',
      'MSFT': 'residential',
      'TSLA': 'industrial',
      'AMZN': 'commercial',
      'GOOGL': 'technology'
    };
    
    return typeMap[symbol] || 'commercial';
  }
  
  // Mock historical data for sparklines
  const [portfolioTrends] = useState({
    value: [5761, 5803, 5899, 5872, 5910, 5916],
    change: [1.8, 2.2, 1.9, 2.4, 2.1, 2.34]
  });
  
  // Add sorting functionality 
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  
  // Sorting function for the stock table
  const sortedStocks = React.useMemo(() => {
    let sortableItems = [...portfolioData.stocks];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // Handle each property with proper type checking
        if (sortConfig.key === 'name') {
          return (sortConfig.direction === 'ascending') 
            ? (a.name || '').localeCompare(b.name || '') 
            : (b.name || '').localeCompare(a.name || '');
        }
        
        if (sortConfig.key === 'symbol') {
          return (sortConfig.direction === 'ascending') 
            ? (a.symbol || '').localeCompare(b.symbol || '') 
            : (b.symbol || '').localeCompare(a.symbol || '');
        }
        
        if (sortConfig.key === 'shares') {
          const aValue = a.shares || 0;
          const bValue = b.shares || 0;
          return (sortConfig.direction === 'ascending') ? aValue - bValue : bValue - aValue;
        }
        
        if (sortConfig.key === 'value') {
          const aValue = a.value || 0;
          const bValue = b.value || 0;
          return (sortConfig.direction === 'ascending') ? aValue - bValue : bValue - aValue;
        }
        
        if (sortConfig.key === 'change') {
          const aValue = a.change || 0;
          const bValue = b.change || 0;
          return (sortConfig.direction === 'ascending') ? aValue - bValue : bValue - aValue;
        }
        
        return 0;
      });
    }
    return sortableItems;
  }, [portfolioData.stocks, sortConfig]);
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // First add search state after the other state declarations
  const [searchQuery, setSearchQuery] = useState('');

  // Add filtered stocks function that filters based on search
  const filteredStocks = React.useMemo(() => {
    if (!searchQuery.trim()) return sortedStocks;
    
    const query = searchQuery.toLowerCase().trim();
    return sortedStocks.filter(stock => 
      stock.name.toLowerCase().includes(query) || 
      stock.symbol.toLowerCase().includes(query)
    );
  }, [sortedStocks, searchQuery]);
  
  return (
    <MainLayout>
      <div className="pb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
          
          {/* Loading indicator (simulated) */}
          <div className="flex items-center space-x-1">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Auto-refresh in 30s</span>
            <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" 
              style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }}></div>
          </div>
        </div>
        
        {/* Portfolio Overview - More compact and consistent layout */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Portfolio Value */}
          <div className="rounded-lg overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="px-4 py-2 border-b flex justify-between items-center" style={{ 
              borderColor: 'var(--border-color)',
              backgroundColor: 'rgba(79, 70, 229, 0.08)'
            }}>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Total Portfolio Value</p>
              <div className="flex items-center h-4">
                {/* Simple sparkline visualization */}
                {portfolioTrends.value.map((value, index) => (
                  <div key={index} className="w-1 mx-0.5" style={{
                    height: `${(value / Math.max(...portfolioTrends.value)) * 100}%`,
                    backgroundColor: 'var(--accent-primary)',
                    minHeight: '4px',
                    borderRadius: '1px',
                    opacity: index === portfolioTrends.value.length - 1 ? 1 : 0.7
                  }}></div>
                ))}
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-2xl font-bold flex items-center" style={{ color: 'var(--text-primary)' }}>
                ${portfolioData.totalValue.toLocaleString()}
                <span className="ml-2 text-xs py-0.5 px-1.5 rounded" style={{ 
                  backgroundColor: portfolioData.totalValue > portfolioTrends.value[0] ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: portfolioData.totalValue > portfolioTrends.value[0] ? 'var(--success)' : 'var(--error)'
                }}>
                  {portfolioData.totalValue > portfolioTrends.value[0] ? '↑' : '↓'} 
                  {Math.abs(((portfolioData.totalValue - portfolioTrends.value[0]) / portfolioTrends.value[0]) * 100).toFixed(1)}% 
                  <span className="ml-1" style={{ opacity: 0.8 }}>30d</span>
                </span>
              </p>
            </div>
          </div>
          
          {/* Daily Change */}
          <div className="rounded-lg overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="px-4 py-2 border-b flex justify-between items-center" style={{ 
              borderColor: 'var(--border-color)',
              backgroundColor: portfolioData.dailyChange >= 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)'
            }}>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Daily Change</p>
              <div className="flex items-center h-4">
                {/* Simple sparkline visualization */}
                {portfolioTrends.change.map((value, index) => (
                  <div key={index} className="w-1 mx-0.5" style={{
                    height: `${(value / Math.max(...portfolioTrends.change)) * 100}%`,
                    backgroundColor: value >= 0 ? 'var(--success)' : 'var(--error)',
                    minHeight: '4px',
                    borderRadius: '1px',
                    opacity: index === portfolioTrends.change.length - 1 ? 1 : 0.7
                  }}></div>
                ))}
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-2xl font-bold flex items-center" style={{ 
                color: portfolioData.dailyChange >= 0 ? 'var(--success)' : 'var(--error)'
              }}>
                {portfolioData.dailyChange >= 0 ? '+' : ''}{portfolioData.dailyChange}%
                <span className="text-sm ml-2 opacity-70">Today</span>
              </p>
            </div>
          </div>
          
          {/* Available Cash */}
          <div className="rounded-lg overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="px-4 py-2 border-b flex justify-between items-center" style={{ 
              borderColor: 'var(--border-color)',
              backgroundColor: 'rgba(79, 70, 229, 0.08)'
            }}>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Available Cash</p>
              <span className="text-xs px-2 py-0.5 rounded" style={{ 
                backgroundColor: 'rgba(79, 70, 229, 0.1)', 
                color: 'var(--accent-primary)' 
              }}>
                {((availableCash / (availableCash + portfolioData.totalValue)) * 100).toFixed(1)}% of assets
              </span>
            </div>
            <div className="px-4 py-3 flex justify-between items-center">
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>${availableCash.toLocaleString()}</p>
              <div className="flex space-x-2">
                <button
                  className="px-2 py-1.5 rounded-md text-xs font-medium transition-all hover:opacity-90 flex items-center"
                  style={{ 
                    backgroundColor: 'rgba(79, 70, 229, 0.1)', 
                    color: 'var(--accent-primary)' 
                  }}
                  onClick={() => setIsAddStockModalOpen(true)}
                >
                  Invest
                </button>
                <button
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition-all hover:opacity-90"
                  style={{ 
                    backgroundColor: 'var(--accent-primary)', 
                    color: 'var(--text-on-accent)' 
                  }}
                  onClick={() => setAvailableCash(prevCash => prevCash + 5000)}
                >
                  +$5,000
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Insights Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Portfolio Allocation */}
          <div className="p-4 rounded-lg" style={{ 
            backgroundColor: 'var(--bg-card)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" style={{ color: 'var(--accent-primary)' }} viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Diversification</p>
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              {portfolioData.stocks.length} Companies
            </p>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Across {new Set(portfolioData.stocks.map(s => mapStockToType(s.symbol))).size} Sectors
            </p>
          </div>
          
          {/* Best Performer */}
          <div className="p-4 rounded-lg" style={{ 
            backgroundColor: 'var(--bg-card)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" style={{ color: 'var(--success)' }} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Best Performer</p>
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              {portfolioData.stocks.sort((a, b) => (b.change || 0) - (a.change || 0))[0]?.symbol} 
              <span className="ml-1 text-xs" style={{ color: 'var(--success)' }}>
                +{portfolioData.stocks.sort((a, b) => (b.change || 0) - (a.change || 0))[0]?.change}%
              </span>
            </p>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {portfolioData.stocks.sort((a, b) => (b.change || 0) - (a.change || 0))[0]?.name}
            </p>
          </div>
          
          {/* Worst Performer */}
          <div className="p-4 rounded-lg" style={{ 
            backgroundColor: 'var(--bg-card)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" style={{ color: 'var(--error)' }} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
              </svg>
              <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Needs Attention</p>
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              {portfolioData.stocks.sort((a, b) => (a.change || 0) - (b.change || 0))[0]?.symbol}
              <span className="ml-1 text-xs" style={{ color: 'var(--error)' }}>
                {portfolioData.stocks.sort((a, b) => (a.change || 0) - (b.change || 0))[0]?.change < 0 ? '' : '+'}
                {portfolioData.stocks.sort((a, b) => (a.change || 0) - (b.change || 0))[0]?.change}%
              </span>
            </p>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              {portfolioData.stocks.sort((a, b) => (a.change || 0) - (b.change || 0))[0]?.name}
            </p>
          </div>
          
          {/* Recommended Action */}
          <div className="p-4 rounded-lg" style={{ 
            backgroundColor: 'var(--bg-card)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" style={{ color: 'var(--accent-primary)' }} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Recommendation</p>
            </div>
            
            {/* Conditionally render recommendation based on portfolio performance */}
            {portfolioData.stocks.some(s => (s.change || 0) < 0) ? (
              <>
                <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Rebalance Portfolio</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  Consider adjusting your underperforming stocks
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Looking Great!</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  Your portfolio is performing well
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* City Visualization - Keep as is */}
        <div className="mb-6 rounded-lg overflow-hidden" style={{ 
          backgroundColor: 'var(--bg-card)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div className="flex justify-between items-center px-6 py-3" style={{ 
            background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))'
          }}>
            <div>
              <h3 className="text-lg font-medium" style={{ color: 'var(--text-on-accent)' }}>Your City: Investopia</h3>
              <p className="text-xs" style={{ color: 'var(--text-on-accent)', opacity: 0.8 }}>Your investments visualized as buildings</p>
            </div>
            <Link 
              href="/city" 
              className="px-3 py-1 rounded-md text-sm font-medium"
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                color: 'var(--accent-primary)' 
              }}
            >
              View Full City
            </Link>
          </div>
          <div className="p-0 h-[300px] relative">
            {/* Sky */}
            <div 
              className="absolute top-0 left-0 w-full h-3/4" 
              style={{ 
                background: `linear-gradient(to bottom, var(--city-sky-from), var(--city-sky-to))` 
              }}
            ></div>
            
            {/* Background Small Buildings (decorative) */}
            <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-12 z-1">
              {Array.from({ length: 16 }).map((_, i) => {
                const height = 15 + Math.random() * 25;
                const width = 10 + Math.random() * 10;
                
                return (
                  <div
                    key={`bg-building-${i}`}
                    className="mx-[1px]"
                    style={{
                      height: `${height}px`,
                      width: `${width}px`,
                      backgroundColor: `var(--bg-tertiary)`,
                      borderTopLeftRadius: '2px',
                      borderTopRightRadius: '2px',
                      opacity: 0.5 + Math.random() * 0.3,
                      zIndex: 1
                    }}
                  >
                    {/* Windows */}
                    <div className="absolute inset-0 grid grid-cols-2 gap-0.5 p-0.5 opacity-60">
                      {Array.from({ length: Math.floor(height / 6) * 2 }).map((_, i) => (
                        <div 
                          key={i} 
                          style={{
                            backgroundColor: 'var(--building-window-light)',
                            height: '1px',
                            width: '1px',
                            opacity: Math.random() > 0.3 ? '1' : '0'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Ground */}
            <div 
              className="absolute bottom-0 left-0 w-full h-[10%] shadow-inner"
              style={{ backgroundColor: 'var(--city-ground)' }}
            ></div>
            
            {/* Main Portfolio Buildings - Keep as is */}
            <div className="absolute bottom-0 left-0 w-full flex items-end justify-center z-10">
              <div className="flex items-end justify-center" style={{ width: '60%', gap: '12px' }}>
                {stocksWithPercentage.map((stock) => {
                  // Use direct percentage for height with a minimum size, exaggerate differences
                  const baseHeight = 30; // Minimum building height
                  const maxHeight = 230; // Maximum building height
                  
                  // More extreme exaggeration for visual clarity
                  const scaleFactor = 1.8; // Higher value = more extreme differences
                  const heightPercentage = stock.percentage;
                  
                  // Apply a power function to create more dramatic differences
                  // Stocks with higher percentages will be disproportionately taller
                  const normalizedHeight = Math.pow(heightPercentage / 30, scaleFactor); // Normalize to the largest stock
                  
                  // Ensure height is within bounds
                  const buildingHeight = Math.max(baseHeight, Math.min(maxHeight, baseHeight + (normalizedHeight * maxHeight)));
                  
                  // Is the stock performance negative?
                  const isRundown = stock.change < 0;
                  
                  // Width proportional to percentage for visual balance
                  const buildingWidth = Math.max(40, Math.min(70, 40 + stock.percentage));
                  
                  // Unique ID for hover state connection
                  const buildingId = `building-${stock.id}`;
                  
                  // Calculate a z-index based on height to ensure proper layering
                  const zIndex = 20 + Math.floor(stock.percentage);
                  
                  return (
                    <div
                      key={stock.id}
                      id={buildingId}
                      data-stock-id={stock.id}
                      data-percentage={stock.percentage.toFixed(1)}
                      className={`relative hover:z-40 group cursor-pointer`}
                      style={{
                        height: `${buildingHeight}px`,
                        width: `${buildingWidth}px`,
                        backgroundColor: getBuildingColor(mapStockToType(stock.symbol), isRundown),
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                        // Add cracks and deterioration for poorly performing stocks
                        backgroundImage: isRundown 
                          ? 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 6px)' 
                          : 'none',
                        boxShadow: isRundown 
                          ? 'inset 0 0 3px var(--building-shadow)' 
                          : '0 0 15px rgba(255,255,255,0.3)',
                        border: isRundown ? 'none' : '1px solid rgba(255,255,255,0.2)',
                        transition: 'box-shadow 0.2s ease',
                        zIndex: zIndex,
                        filter: isRundown ? 'brightness(0.7) saturate(0.7)' : 'none'
                      }}
                      onMouseEnter={() => {
                        // Highlight corresponding table row
                        const row = document.getElementById(`stock-row-${stock.id}`);
                        if (row) row.classList.add('bg-indigo-50', 'font-medium', 'transition-colors', 'duration-200');
                      }}
                      onMouseLeave={() => {
                        // Remove highlight from table row
                        const row = document.getElementById(`stock-row-${stock.id}`);
                        if (row) row.classList.remove('bg-indigo-50', 'font-medium', 'transition-colors', 'duration-200');
                      }}
                    >
                      {/* Windows */}
                      <div className={`absolute inset-0 grid grid-cols-2 gap-1 p-1 ${isRundown ? 'opacity-40' : 'opacity-80'} group-hover:opacity-100 transition-opacity`}>
                        {Array.from({ length: Math.floor(buildingHeight / 15) * 2 }).map((_, i) => (
                          <div 
                            key={i} 
                            style={{
                              backgroundColor: isRundown ? 'var(--text-tertiary)' : 'var(--building-window-light)',
                              height: '10px',
                              width: '10px',
                              opacity: isRundown && Math.random() > 0.7 ? '0' : '',
                              transition: 'all 500ms',
                              boxShadow: isRundown ? 'none' : 'inset 0 0 2px rgba(255,255,100,0.8)'
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Highlight outline on hover */}
                      <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-40 transition-opacity rounded-t-sm pointer-events-none"></div>
                      
                      {/* Company name on hover */}
                      <div 
                        className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap py-1 px-2 rounded shadow-md z-50" 
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <span className="text-xs font-medium">{stock.name}</span>
                      </div>
                      
                      {/* Building symbol and percentage label */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span 
                          className="px-1.5 py-0.5 rounded shadow-sm text-xs font-bold" 
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          {stock.symbol} · {stock.percentage.toFixed(1)}%
                        </span>
                      </div>
                      
                      {/* Warning sign for negative performers */}
                      {isRundown && (
                        <div 
                          className="absolute -top-6 left-1/2 transform -translate-x-1/2 p-1.5 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md"
                          style={{
                            backgroundColor: 'var(--error)',
                            color: 'var(--text-on-accent)'
                          }}
                        >
                          !
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stock Table - Improved Header and Alternating Rows */}
        <div className="rounded-lg overflow-hidden" style={{ 
          backgroundColor: 'var(--bg-card)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div className="flex justify-between items-center px-6 py-4 border-b" style={{ 
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--bg-card)'
          }}>
            <h3 className="text-lg font-semibold flex items-center" style={{ color: 'var(--text-primary)' }}>
              Your Stocks
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full" style={{ 
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-on-accent)'
              }}>
                {portfolioData.stocks.length}
              </span>
            </h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1.5 pr-8 text-sm rounded-md focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-color)',
                    width: '180px'
                  }}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery('')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                {!searchQuery && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setIsAddStockModalOpen(true)}
                className="px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all hover:shadow-md"
                style={{ 
                  backgroundColor: 'var(--accent-primary)', 
                  color: 'var(--text-on-accent)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Stock
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y" style={{ borderColor: 'var(--divider-color)' }}>
              <thead style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-on-accent)' }}>
                <tr>
                  <th 
                    className="px-3 py-3 text-left text-sm font-semibold cursor-pointer"
                    onClick={() => requestSort('name')}
                  >
                    <div className="flex items-center">
                      Company
                      {sortConfig?.key === 'name' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? 
                            <ArrowUpIcon className="h-3 w-3" /> : 
                            <ArrowDownIcon className="h-3 w-3" />
                          }
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-3 py-3 text-left text-sm font-semibold cursor-pointer"
                    onClick={() => requestSort('symbol')}
                  >
                    <div className="flex items-center">
                      Symbol
                      {sortConfig?.key === 'symbol' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? 
                            <ArrowUpIcon className="h-3 w-3" /> : 
                            <ArrowDownIcon className="h-3 w-3" />
                          }
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-3 py-3 text-right text-sm font-semibold cursor-pointer"
                    onClick={() => requestSort('shares')}
                  >
                    <div className="flex items-center justify-end">
                      Shares
                      {sortConfig?.key === 'shares' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? 
                            <ArrowUpIcon className="h-3 w-3" /> : 
                            <ArrowDownIcon className="h-3 w-3" />
                          }
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-3 py-3 text-right text-sm font-semibold cursor-pointer"
                    onClick={() => requestSort('value')}
                  >
                    <div className="flex items-center justify-end">
                      Value
                      {sortConfig?.key === 'value' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? 
                            <ArrowUpIcon className="h-3 w-3" /> : 
                            <ArrowDownIcon className="h-3 w-3" />
                          }
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-3 py-3 text-right text-sm font-semibold cursor-pointer"
                    onClick={() => requestSort('change')}
                  >
                    <div className="flex items-center justify-end">
                      Change
                      {sortConfig?.key === 'change' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'ascending' ? 
                            <ArrowUpIcon className="h-3 w-3" /> : 
                            <ArrowDownIcon className="h-3 w-3" />
                          }
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-3 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--divider-color)' }}>
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((stock, index) => (
                    <tr 
                      key={stock.id} 
                      id={`stock-row-${stock.id}`}
                      className="transition-colors duration-200 hover:bg-indigo-50 cursor-pointer"
                      style={{
                        backgroundColor: stock.change < 0 
                          ? 'rgba(239, 68, 68, 0.05)' 
                          : index % 2 === 0 ? 'var(--bg-card)' : 'rgba(243, 244, 246, 0.2)'
                      }}
                      onMouseEnter={() => {
                        // Highlight corresponding building
                        const building = document.getElementById(`building-${stock.id}`);
                        if (building) {
                          building.classList.add('shadow-lg', 'shadow-indigo-500/30');
                          building.style.zIndex = '40';
                        }
                      }}
                      onMouseLeave={() => {
                        // Remove highlight from building
                        const building = document.getElementById(`building-${stock.id}`);
                        if (building) {
                          building.classList.remove('shadow-lg', 'shadow-indigo-500/30');
                          building.style.zIndex = '20';
                        }
                      }}
                    >
                      <td className="whitespace-nowrap px-3 py-3 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{stock.name}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{stock.symbol}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-right" style={{ color: 'var(--text-secondary)' }}>{stock.shares}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-right font-medium" style={{ color: 'var(--text-primary)' }}>
                        ${(stock.value || 0).toLocaleString()}
                        <span className="ml-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          ({(((stock.value || 0) / portfolioData.totalValue) * 100).toFixed(1)}%)
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-right font-medium" style={{ 
                        color: stock.change >= 0 ? 'var(--success)' : 'var(--error)'
                      }}>
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openTradeModal(stock);
                          }}
                          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all hover:shadow-sm"
                          style={{ 
                            backgroundColor: 'var(--accent-primary)', 
                            color: 'var(--text-on-accent)' 
                          }}
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center" style={{ color: 'var(--text-tertiary)' }}>
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">No stocks matching "{searchQuery}"</p>
                        <button 
                          onClick={() => setSearchQuery('')} 
                          className="mt-2 text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: 'var(--bg-tertiary)' }}
                        >
                          Clear search
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Trade Modal */}
        {selectedStock && (
          <TradeModal
            stock={selectedStock}
            isOpen={isTradeModalOpen}
            onClose={() => setIsTradeModalOpen(false)}
          />
        )}
        
        {/* Add Stock Modal */}
        <AddStockModal
          isOpen={isAddStockModalOpen}
          onClose={() => setIsAddStockModalOpen(false)}
          onAddStock={handleAddStock}
          cash={availableCash}
          existingStocks={existingStockIds}
        />
      </div>
    </MainLayout>
  );
} 