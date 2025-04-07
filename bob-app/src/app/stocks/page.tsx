'use client';

import { useState, useEffect, useRef } from 'react';
import MainLayout from '@/components/MainLayout';
import TradeModal, { Stock } from '@/components/TradeModal';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowsUpDownIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  FireIcon, 
  BuildingOffice2Icon,
  XMarkIcon,
  UsersIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

// Mock stock market data
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
  { id: 11, name: 'Salesforce Inc.', symbol: 'CRM', price: 210.60, change: 1.1, marketCap: 205, volume: 9.7, sector: 'Technology' },
  { id: 12, name: 'AMD Inc.', symbol: 'AMD', price: 128.90, change: 3.4, marketCap: 207, volume: 65.4, sector: 'Technology' },
  { id: 13, name: 'Zoom Video', symbol: 'ZM', price: 70.25, change: -0.5, marketCap: 20.8, volume: 5.2, sector: 'Technology' },
  { id: 14, name: 'Twitter Inc.', symbol: 'TWTR', price: 40.15, change: -2.1, marketCap: 30.6, volume: 22.9, sector: 'Communication Services' },
  { id: 15, name: 'Meta Platforms', symbol: 'META', price: 325.80, change: 1.7, marketCap: 830, volume: 28.4, sector: 'Technology', popular: true },
  { id: 16, name: 'Uber Technologies', symbol: 'UBER', price: 45.20, change: 0.5, marketCap: 92.3, volume: 18.7, sector: 'Technology' },
  { id: 17, name: 'Airbnb Inc.', symbol: 'ABNB', price: 135.70, change: -0.7, marketCap: 86.5, volume: 7.6, sector: 'Consumer Cyclical' },
  { id: 18, name: 'Walmart Inc.', symbol: 'WMT', price: 160.30, change: 0.2, marketCap: 430, volume: 9.3, sector: 'Consumer Defensive' },
  { id: 19, name: 'JPMorgan Chase', symbol: 'JPM', price: 182.50, change: 1.3, marketCap: 525, volume: 14.7, sector: 'Financial Services', popular: true },
  { id: 20, name: 'Johnson & Johnson', symbol: 'JNJ', price: 157.80, change: -0.4, marketCap: 380, volume: 8.2, sector: 'Healthcare', popular: true },
];

// Get all unique sectors for filter options
const allSectors = Array.from(new Set(availableStocks.map(stock => stock.sector)));

// Instead, create a function to generate consistent colors for stock symbols
const getStockColor = (symbol: string): string => {
  // Create a simple hash of the symbol to generate a consistent color
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use the hash to generate HSL color with good saturation and lightness
  const h = hash % 360;
  return `hsl(${h}, 70%, 60%)`;
};

export default function StocksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'marketCap'>('marketCap');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [availableCash, setAvailableCash] = useState(10000.00);
  const [portfolio, setPortfolio] = useState<Stock[]>([]);
  const [activeView, setActiveView] = useState<'all' | 'search'>('all');
  const router = useRouter();
  
  // Load portfolio from localStorage when component mounts
  useEffect(() => {
    try {
      const portfolioData = localStorage.getItem('bobPortfolio');
      if (portfolioData) {
        setPortfolio(JSON.parse(portfolioData));
      }
      
      const cashData = localStorage.getItem('bobCash');
      if (cashData) {
        setAvailableCash(parseFloat(cashData));
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
  }, []);
  
  // Save portfolio to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('bobPortfolio', JSON.stringify(portfolio));
    localStorage.setItem('bobCash', availableCash.toString());
  }, [portfolio, availableCash]);
  
  // Filter and sort stocks
  const filteredStocks = availableStocks
    .filter(stock => {
      // Apply search filter
      const matchesSearch = 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply sector filter
      const matchesSector = !selectedSector || stock.sector === selectedSector;
      
      return matchesSearch && matchesSector;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
      
      if (sortBy === 'price') {
        return sortDirection === 'asc' 
          ? a.price - b.price 
          : b.price - a.price;
      }
      
      if (sortBy === 'change') {
        return sortDirection === 'asc' 
          ? a.change - b.change 
          : b.change - a.change;
      }
      
      // Default: sort by market cap
      return sortDirection === 'asc' 
        ? a.marketCap - b.marketCap 
        : b.marketCap - a.marketCap;
    });
    
  // Get top gainers
  const topGainers = [...availableStocks]
    .sort((a, b) => b.change - a.change)
    .filter(stock => stock.change > 0)
    .slice(0, 5);
    
  // Get top losers
  const topLosers = [...availableStocks]
    .sort((a, b) => a.change - b.change)
    .filter(stock => stock.change < 0)
    .slice(0, 5);
    
  // Get most popular stocks
  const mostPopular = availableStocks.filter(stock => stock.popular).slice(0, 5);
  
  // Get stocks by sector for the sectioned view
  const stocksBySector = allSectors.reduce((acc, sector) => {
    acc[sector] = availableStocks.filter(stock => stock.sector === sector).slice(0, 5);
    return acc;
  }, {} as Record<string, typeof availableStocks>);
  
  // Handle search and filtering
  useEffect(() => {
    if (searchTerm !== '' || selectedSector !== '') {
      setActiveView('search');
    } else {
      setActiveView('all');
    }
  }, [searchTerm, selectedSector]);
  
  // Open trade modal for a stock
  const handleTradeClick = (stock: Stock) => {
    // Check if the stock is already in portfolio
    const portfolioStock = portfolio.find(s => s.id === stock.id);
    
    // If in portfolio, use that data
    if (portfolioStock) {
      setSelectedStock(portfolioStock);
    } else {
      // Otherwise use the stock data from available stocks
      setSelectedStock({
        ...stock,
        shares: 0,
        value: 0
      });
    }
    
    setIsTradeModalOpen(true);
  };
  
  // Handle trade execution
  const handleTrade = (stock: Stock, quantity: number, action: 'buy' | 'sell') => {
    // Find the stock in our portfolio
    const existingStockIndex = portfolio.findIndex(s => s.id === stock.id);
    
    // Create an updated portfolio
    const updatedPortfolio = [...portfolio];
    
    // Ensure stock price exists
    const stockPrice = stock.price || stock.currentPrice || 0;
    
    if (action === 'buy') {
      // Calculate the cost
      const cost = quantity * stockPrice;
      
      // Update cash
      setAvailableCash(prevCash => prevCash - cost);
      
      if (existingStockIndex >= 0) {
        // Update existing position
        updatedPortfolio[existingStockIndex] = {
          ...updatedPortfolio[existingStockIndex],
          shares: (updatedPortfolio[existingStockIndex].shares || 0) + quantity,
          value: (updatedPortfolio[existingStockIndex].value || 0) + cost
        };
      } else {
        // Add new position
        updatedPortfolio.push({
          ...stock,
          shares: quantity,
          value: cost
        });
      }
    } else if (action === 'sell' && existingStockIndex >= 0) {
      // Calculate proceeds
      const proceeds = quantity * stockPrice;
      
      // Update cash
      setAvailableCash(prevCash => prevCash + proceeds);
      
      const currentShares = updatedPortfolio[existingStockIndex].shares || 0;
      
      if (currentShares <= quantity) {
        // Remove stock if selling all shares
        updatedPortfolio.splice(existingStockIndex, 1);
      } else {
        // Update position if selling some shares
        updatedPortfolio[existingStockIndex] = {
          ...updatedPortfolio[existingStockIndex],
          shares: currentShares - quantity,
          value: (updatedPortfolio[existingStockIndex].value || 0) - proceeds
        };
      }
    }
    
    // Update portfolio
    setPortfolio(updatedPortfolio);
  };
  
  // Stock card component - updated to navigate to stock detail page
  const StockCard = ({ stock }: { stock: typeof availableStocks[0] }) => {
    // Check if stock is in portfolio
    const inPortfolio = portfolio.some(s => s.id === stock.id);
    const bgColor = getStockColor(stock.symbol);
    
    return (
      <div 
        className="rounded-lg overflow-hidden shadow-sm border transition-all hover:shadow-md flex flex-col h-64 cursor-pointer"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'var(--border-color)' 
        }}
        onClick={() => router.push(`/stocks/${stock.symbol}`)}
      >
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              {/* Stock logo avatar */}
              <div 
                className="w-10 h-10 mr-3 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-sm font-bold"
                style={{ 
                  backgroundColor: bgColor,
                  color: '#FFFFFF',
                }}
              >
                {stock.symbol.slice(0, 2)}
              </div>
              <div>
                <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>{stock.name}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stock.symbol}</p>
              </div>
            </div>
            <span 
              className="text-sm font-medium px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: stock.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: stock.change >= 0 ? 'var(--success)' : 'var(--error)'
              }}
            >
              {stock.change >= 0 ? '+' : ''}{stock.change}%
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-auto">
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Price</p>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>${stock.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Market Cap</p>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>${stock.marketCap}B</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Volume</p>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{stock.volume}M</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sector</p>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{stock.sector}</p>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation to stock detail page
              handleTradeClick(stock);
            }}
            className="w-full py-2 rounded text-sm font-medium transition-opacity hover:opacity-90 mt-3"
            style={{ 
              backgroundColor: inPortfolio ? 'var(--success)' : 'var(--accent-primary)',
              color: 'var(--text-on-accent)'
            }}
          >
            {inPortfolio ? 'Manage Position' : 'Trade'}
          </button>
        </div>
      </div>
    );
  };
  
  // Add the missing StockSection component
  const StockSection = ({ title, stocks, icon }: { title: string, stocks: typeof availableStocks, icon?: React.ReactNode }) => {
    if (stocks.length === 0) return null;
    
    return (
      <div className="mb-10">
        <div className="flex items-center mb-4">
          {icon && <span className="mr-2">{icon}</span>}
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stocks.map(stock => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <MainLayout>
      <div className="pb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Discover Stocks</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
          Find and trade stocks to build your portfolio
        </p>
        
        {/* Filters and Search */}
        <div className="mb-6 rounded-lg shadow-sm border p-4" style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderColor: 'var(--border-color)' 
        }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)', 
                  color: 'var(--text-primary)' 
                }}
                placeholder="Search by name or symbol"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Sector Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FunnelIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} aria-hidden="true" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)', 
                  color: 'var(--text-primary)' 
                }}
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
              >
                <option value="">All Sectors</option>
                {allSectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            
            {/* Available Cash */}
            <div className="flex items-center justify-between rounded-md px-4 py-2 border"
              style={{ 
                backgroundColor: 'var(--accent-muted)', 
                borderColor: 'var(--accent-secondary)' 
              }}
            >
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>Available Cash</p>
                <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>${availableCash.toLocaleString()}</p>
              </div>
              <button
                className="px-3 py-1 text-sm font-medium rounded"
                style={{ 
                  backgroundColor: 'var(--accent-primary)', 
                  color: 'var(--text-on-accent)' 
                }}
                onClick={() => setAvailableCash(prev => prev + 5000)}
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        {activeView === 'all' ? (
          <>
            {/* Top gainers section */}
            <StockSection 
              title="Top Gainers" 
              stocks={topGainers} 
              icon={<ArrowTrendingUpIcon className="h-6 w-6" style={{ color: 'var(--success)' }} />} 
            />
            
            {/* Top losers section */}
            <StockSection 
              title="Top Losers" 
              stocks={topLosers} 
              icon={<ArrowTrendingDownIcon className="h-6 w-6" style={{ color: 'var(--error)' }} />} 
            />
            
            {/* Most popular section */}
            <StockSection 
              title="Most Popular" 
              stocks={mostPopular} 
              icon={<FireIcon className="h-6 w-6" style={{ color: 'var(--warning)' }} />} 
            />
            
            {/* Stocks by sector */}
            {Object.entries(stocksBySector).map(([sector, stocks]) => (
              <StockSection 
                key={sector} 
                title={sector} 
                stocks={stocks} 
                icon={<BuildingOffice2Icon className="h-6 w-6" style={{ color: 'var(--accent-primary)' }} />}
              />
            ))}
          </>
        ) : (
          /* Search results */
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Search Results {selectedSector && `(${selectedSector})`}
            </h2>
            {filteredStocks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredStocks.map(stock => (
                  <StockCard key={stock.id} stock={stock} />
                ))}
              </div>
            ) : (
              <div 
                className="p-8 text-center rounded-lg border"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)'
                }}
              >
                No stocks found matching your search criteria.
              </div>
            )}
          </div>
        )}
        
        {/* Trade Modal */}
        {selectedStock && (
          <TradeModal
            stock={{
              ...selectedStock,
              // Make sure the stock has all required fields, using defaults if needed
              shares: selectedStock.shares || 0,
              value: selectedStock.value || 0,
            }}
            isOpen={isTradeModalOpen}
            onClose={() => setIsTradeModalOpen(false)}
            onTrade={handleTrade}
            cash={availableCash}
          />
        )}
      </div>
    </MainLayout>
  );
} 