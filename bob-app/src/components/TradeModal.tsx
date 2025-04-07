'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface Stock {
  id: number;
  name: string;
  symbol: string;
  shares?: number;
  value?: number;
  change: number;
  price?: number;
  marketCap?: number | string;
  volume?: number | string;
  sector?: string;
  currentPrice?: number;
}

interface TradeModalProps {
  stock: Stock;
  isOpen: boolean;
  onClose: () => void;
}

const TradeModal = ({ stock, isOpen, onClose }: TradeModalProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [total, setTotal] = useState(0);
  const [availableCash] = useState(10000); // Mock cash amount
  const [sharesOwned] = useState(stock.shares || 0); // Mock shares owned
  const [error, setError] = useState('');
  
  // Safe price value with fallback
  const stockPrice = stock.price || stock.currentPrice || 0;

  // Update total when quantity or price changes
  useEffect(() => {
    setTotal(stockPrice * quantity);
  }, [stockPrice, quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      
      // Validate quantity
      if (action === 'sell' && value > sharesOwned) {
        setError(`You only have ${sharesOwned} shares to sell`);
      } else if (action === 'buy' && value * stockPrice > availableCash) {
        setError('Insufficient funds for this purchase');
      } else {
        setError('');
      }
    }
  };

  const handleActionChange = (newAction: 'buy' | 'sell') => {
    setAction(newAction);
    
    // Revalidate with new action
    if (newAction === 'sell' && quantity > sharesOwned) {
      setError(`You only have ${sharesOwned} shares to sell`);
    } else if (newAction === 'buy' && quantity * stockPrice > availableCash) {
      setError('Insufficient funds for this purchase');
    } else {
      setError('');
    }
  };

  const handlePlaceOrder = () => {
    // Log the order details
    console.log(`Placing ${action} order for ${quantity} ${stock.symbol} at $${stockPrice}`);
    
    // In a real app, this would send the order to the backend
    // For now, we'll just redirect to the stock page
    onClose();
    router.push(`/stocks/${stock.symbol}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent background */}
      <div 
        className="absolute inset-0 backdrop-blur-sm transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        onClick={onClose}
      ></div>
      
      <div 
        className="relative bg-card rounded-lg w-full max-w-sm shadow-xl"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {stock.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>
        
        {/* Info section */}
        <div className="px-4 py-2">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: 'var(--text-secondary)' }}>Your position:</span>
            <span style={{ color: 'var(--text-primary)' }}>
              {sharesOwned} shares (${(sharesOwned * stockPrice).toFixed(2)})
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--text-secondary)' }}>Available cash:</span>
            <span style={{ color: 'var(--text-primary)' }}>${availableCash.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-0 my-4 mx-4 rounded-md overflow-hidden">
          <button
            className={`py-3 font-medium ${action === 'buy' ? 'text-white' : 'text-white text-opacity-60'}`}
            style={{ 
              backgroundColor: action === 'buy' ? 'var(--success)' : 'var(--success-dark, #0b8f63)',
              borderTopLeftRadius: '0.375rem',
              borderBottomLeftRadius: '0.375rem'
            }}
            onClick={() => handleActionChange('buy')}
          >
            Buy
          </button>
          <button
            className={`py-3 font-medium ${action === 'sell' ? 'text-white' : 'text-white text-opacity-60'}`}
            style={{ 
              backgroundColor: action === 'sell' ? 'var(--error)' : 'var(--error-dark, #bf3636)',
              borderTopRightRadius: '0.375rem',
              borderBottomRightRadius: '0.375rem'
            }}
            onClick={() => handleActionChange('sell')}
          >
            Sell
          </button>
        </div>
        
        {/* Quantity */}
        <div className="px-4 py-2">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full p-3 rounded-md mb-1"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: 'none'
            }}
          />
          
          {error && (
            <p className="text-sm mb-3" style={{ color: 'var(--error)' }}>
              {error}
            </p>
          )}
        </div>
        
        {/* Order details */}
        <div className="px-4 py-3">
          <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)', borderBottomWidth: '1px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Price per share:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              ${stockPrice.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)', borderBottomWidth: '1px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Quantity:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {quantity} shares
            </span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="font-bold" style={{ color: 'var(--text-secondary)' }}>
              Total {action === 'buy' ? 'cost' : 'credit'}:
            </span>
            <span 
              className="font-bold"
              style={{ color: action === 'buy' ? 'var(--error)' : 'var(--success)' }}
            >
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="px-4 py-4 space-y-3">
          <button
            className="w-full py-3 rounded-md font-medium text-white disabled:opacity-50"
            style={{ 
              backgroundColor: action === 'buy' ? 'var(--success)' : 'var(--error)'
            }}
            onClick={handlePlaceOrder}
            disabled={!!error || (action === 'sell' && sharesOwned === 0)}
          >
            {action === 'buy' ? 'Buy' : 'Sell'} {quantity} {quantity === 1 ? 'Share' : 'Shares'}
          </button>
          
          <button
            className="w-full py-3 rounded-md font-medium"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeModal; 