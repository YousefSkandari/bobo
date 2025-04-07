'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import { 
  ArrowLeftIcon,
  ArrowsRightLeftIcon,
  BanknotesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

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

// Function to generate a consistent color for a stock symbol
const getStockColor = (symbol: string): string => {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 60%)`;
};

// Mock user portfolio
const userPortfolio = {
  cash: 10000.50,
  stocks: [
    { symbol: 'AAPL', shares: 10, averagePrice: 170.25 },
    { symbol: 'MSFT', shares: 5, averagePrice: 240.10 },
    { symbol: 'TSLA', shares: 3, averagePrice: 290.75 },
  ]
};

export default function TradePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get query parameters
  const symbol = searchParams.get('symbol');
  const action = searchParams.get('action'); // 'buy' or 'sell'
  const priceParam = searchParams.get('price');
  
  const [stock, setStock] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [orderTotal, setOrderTotal] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [userCash, setUserCash] = useState(userPortfolio.cash);
  const [userShares, setUserShares] = useState(0);
  
  // Find the stock by symbol
  useEffect(() => {
    if (symbol) {
      const foundStock = availableStocks.find(s => s.symbol === symbol);
      if (foundStock) {
        setStock(foundStock);
        
        // Calculate order total
        const price = priceParam ? parseFloat(priceParam) : foundStock.price;
        setOrderTotal(price * quantity);
        
        // Check if user owns shares of this stock
        const userPosition = userPortfolio.stocks.find(s => s.symbol === symbol);
        setUserShares(userPosition?.shares || 0);
      }
    }
  }, [symbol, priceParam]);
  
  // Update order total when quantity changes
  useEffect(() => {
    if (stock) {
      const price = priceParam ? parseFloat(priceParam) : stock.price;
      setOrderTotal(price * quantity);
    }
  }, [quantity, stock, priceParam]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      
      // Validate sell quantity
      if (action === 'sell' && value > userShares) {
        setError(`You only have ${userShares} shares to sell`);
      } else if (action === 'buy' && value * stock.price > userCash) {
        setError('Insufficient funds for this purchase');
      } else {
        setError('');
      }
    }
  };
  
  const handlePlaceOrder = () => {
    // Validate order
    if (action === 'buy' && orderTotal > userCash) {
      setError('Insufficient funds for this purchase');
      return;
    }
    
    if (action === 'sell' && quantity > userShares) {
      setError(`You only have ${userShares} shares to sell`);
      return;
    }
    
    // Show confirmation screen
    setShowConfirmation(true);
  };
  
  const handleConfirmOrder = () => {
    // In a real app, this would send the order to the backend
    console.log('Order confirmed:', {
      symbol,
      action,
      quantity,
      price: priceParam ? parseFloat(priceParam) : stock.price,
      total: orderTotal
    });
    
    // Update user's portfolio (mock)
    if (action === 'buy') {
      setUserCash(prev => prev - orderTotal);
      setUserShares(prev => prev + quantity);
    } else {
      setUserCash(prev => prev + orderTotal);
      setUserShares(prev => prev - quantity);
    }
    
    // In a real app, we would redirect to the portfolio page
    // or show a success message and then redirect
    setTimeout(() => {
      router.push(`/stocks/${symbol}`);
    }, 2000);
  };
  
  // If stock not found or invalid action
  if (!stock || (action !== 'buy' && action !== 'sell')) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <button 
              className="flex items-center mr-4 py-2 px-3 rounded-md hover:bg-opacity-80"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" style={{ color: 'var(--text-primary)' }} />
              <span style={{ color: 'var(--text-primary)' }}>Back</span>
            </button>
          </div>
          <div 
            className="p-8 text-center rounded-lg border"
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            Invalid trade request. Please try again.
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Confirmation screen
  if (showConfirmation) {
    return (
      <MainLayout>
        <div className="p-6 max-w-md mx-auto">
          <div className="mb-6 text-center">
            <div 
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: action === 'buy' ? 'var(--success)' : 'var(--accent-primary)' }}
            >
              <CheckCircleIcon className="h-12 w-12 text-white" />
            </div>
            
            <h1 
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              Order Confirmed
            </h1>
          </div>
          
          <div 
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <div className="mb-6 pb-4 text-center border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div className="mb-1" style={{ color: 'var(--text-secondary)' }}>
                {action === 'buy' ? 'You bought' : 'You sold'}
              </div>
              <div 
                className="text-3xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {quantity} {stock.symbol}
              </div>
              <div className="mt-1" style={{ color: 'var(--text-secondary)' }}>
                @ ${(priceParam ? parseFloat(priceParam) : stock.price).toFixed(2)}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)', borderBottomWidth: '1px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total</span>
                <span 
                  className="font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between py-2">
                <span style={{ color: 'var(--text-secondary)' }}>New balance</span>
                <span 
                  className="font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  ${action === 'buy' 
                    ? (userCash - orderTotal).toFixed(2) 
                    : (userCash + orderTotal).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <button
            className="w-full py-3 rounded-md font-bold text-center transition-all"
            style={{ 
              backgroundColor: action === 'buy' ? 'var(--success)' : 'var(--error)',
              color: 'var(--text-on-accent)'
            }}
            onClick={handleConfirmOrder}
          >
            Done
          </button>
          
          <button
            className="w-full mt-3 py-3 rounded-md font-medium text-center transition-all"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
            onClick={() => router.push(`/stocks/${symbol}`)}
          >
            View Stock Details
          </button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="p-6 max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button 
            className="flex items-center mr-4 py-2 px-3 rounded-md hover:bg-opacity-80"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" style={{ color: 'var(--text-primary)' }} />
            <span style={{ color: 'var(--text-primary)' }}>Back</span>
          </button>
        </div>
        
        <div className="mb-6 text-center">
          <h1 
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            {action === 'buy' ? 'Buy' : 'Sell'} {stock.symbol}
          </h1>
          <span 
            className="text-lg font-medium"
            style={{ color: action === 'buy' ? 'var(--success)' : 'var(--error)' }}
          >
            ${(priceParam ? parseFloat(priceParam) : stock.price).toFixed(2)}
          </span>
        </div>
        
        <div 
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div className="flex items-center mb-6">
            <div 
              className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-bold mr-4"
              style={{ 
                backgroundColor: getStockColor(stock.symbol),
                color: '#FFFFFF',
              }}
            >
              {stock.symbol.slice(0, 2)}
            </div>
            
            <div>
              <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>
                {stock.name}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {stock.sector}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Quantity
            </p>
            <div className="flex items-center bg-opacity-50 rounded-md overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <button
                className="h-10 w-10 flex items-center justify-center"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <span className="text-xl">-</span>
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="h-10 flex-1 text-center"
                style={{ 
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  border: 'none'
                }}
              />
              <button
                className="h-10 w-10 flex items-center justify-center"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setQuantity(quantity + 1)}
              >
                <span className="text-xl">+</span>
              </button>
            </div>
            
            {error && (
              <p className="mt-2 text-sm" style={{ color: 'var(--error)' }}>
                {error}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)', borderBottomWidth: '1px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Market Price</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                ${(priceParam ? parseFloat(priceParam) : stock.price).toFixed(2)}
              </span>
            </div>
            
            {action === 'buy' && (
              <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)', borderBottomWidth: '1px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Available Cash</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>${userCash.toFixed(2)}</span>
              </div>
            )}
            
            {action === 'sell' && (
              <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)', borderBottomWidth: '1px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shares Owned</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{userShares}</span>
              </div>
            )}
            
            <div className="flex justify-between py-2">
              <span className="font-bold" style={{ color: 'var(--text-secondary)' }}>
                Estimated {action === 'buy' ? 'Cost' : 'Credit'}
              </span>
              <span 
                className="font-bold" 
                style={{ color: action === 'buy' ? 'var(--error)' : 'var(--success)' }}
              >
                ${orderTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        <button
          className="w-full py-3 rounded-md font-bold transition-all disabled:opacity-50"
          style={{ 
            backgroundColor: action === 'buy' ? 'var(--success)' : 'var(--error)',
            color: 'var(--text-on-accent)'
          }}
          onClick={handlePlaceOrder}
          disabled={!!error}
        >
          Place Order
        </button>
        
        <p className="text-xs text-center mt-4" style={{ color: 'var(--text-tertiary)' }}>
          Orders are processed immediately at the current market price.
        </p>
      </div>
    </MainLayout>
  );
} 