'use client';

import { useState, useEffect, FormEvent } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Stock } from './TradeModal';

// Sample stocks for the demo
const availableStocks = [
  { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 175.05, change: 2.3, marketCap: '2.85T', volume: '55.3M', sector: 'Technology' },
  { id: 2, name: 'Microsoft Corp', symbol: 'MSFT', price: 250.06, change: 1.2, marketCap: '1.86T', volume: '23.8M', sector: 'Technology' },
  { id: 3, name: 'Tesla Inc.', symbol: 'TSLA', price: 296.75, change: -2.1, marketCap: '941.09B', volume: '125.1M', sector: 'Automotive' },
  { id: 4, name: 'Amazon.com Inc.', symbol: 'AMZN', price: 337.95, change: 0.8, marketCap: '3.48T', volume: '42.7M', sector: 'Consumer Cyclical' },
  { id: 5, name: 'Meta Platforms Inc.', symbol: 'META', price: 468.22, change: 3.6, marketCap: '1.19T', volume: '18.6M', sector: 'Technology' },
  { id: 6, name: 'Alphabet Inc.', symbol: 'GOOGL', price: 1350.10, change: -0.5, marketCap: '1.7T', volume: '15.2M', sector: 'Technology' },
  { id: 7, name: 'Berkshire Hathaway', symbol: 'BRK.B', price: 327.89, change: 0.3, marketCap: '715.2B', volume: '3.5M', sector: 'Financial Services' },
  { id: 8, name: 'Johnson & Johnson', symbol: 'JNJ', price: 152.31, change: -1.2, marketCap: '368.5B', volume: '7.8M', sector: 'Healthcare' },
  { id: 9, name: 'JPMorgan Chase & Co.', symbol: 'JPM', price: 164.81, change: 1.5, marketCap: '478.2B', volume: '9.2M', sector: 'Financial Services' },
  { id: 10, name: 'Visa Inc.', symbol: 'V', price: 246.17, change: 0.9, marketCap: '509.7B', volume: '6.1M', sector: 'Financial Services' },
  { id: 11, name: 'Walmart Inc.', symbol: 'WMT', price: 67.13, change: 0.7, marketCap: '542.3B', volume: '8.4M', sector: 'Consumer Defensive' },
  { id: 12, name: 'Procter & Gamble', symbol: 'PG', price: 157.99, change: 0.2, marketCap: '372.1B', volume: '5.7M', sector: 'Consumer Defensive' }
];

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (stock: Stock, quantity: number) => void;
  cash: number;
  existingStocks: number[];
}

export default function AddStockModal({ isOpen, onClose, onAddStock, cash, existingStocks }: AddStockModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  
  // Filter out stocks that are already in the portfolio and filter by search term
  const filteredStocks = availableStocks
    .filter(stock => !existingStocks.includes(stock.id))
    .filter(stock => 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.sector?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setError(null);
      setSearchTerm('');
      setSelectedStock(null);
    }
  }, [isOpen]);
  
  // Handle stock selection
  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setError(null);
  };
  
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedStock) {
      setError('Please select a stock');
      return;
    }
    
    // Validate quantity
    if (quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    
    // Check if enough cash for purchase
    const totalCost = selectedStock.price ? quantity * selectedStock.price : 0;
    if (totalCost > cash) {
      setError(`Insufficient funds. You need $${totalCost.toLocaleString()} but only have $${cash.toLocaleString()}`);
      return;
    }
    
    // Add stock to portfolio
    onAddStock(selectedStock, quantity);
    onClose();
  };
  
  // Only render if open
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity" 
          style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.75 }}
          onClick={onClose}
        ></div>
        
        {/* Modal */}
        <div className="relative transform overflow-hidden rounded-lg shadow-xl transition-all w-full max-w-2xl" 
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div className="px-4 pb-4 pt-5 sm:p-6">
            <div className="flex items-center justify-between border-b pb-3 mb-4" 
              style={{ borderColor: 'var(--border-color)' }}
            >
              <h3 className="text-xl font-semibold"  style={{ color: 'var(--text-primary)' }}>
                Add Stock to Portfolio
              </h3>
              <button 
                onClick={onClose}
                className="rounded-md" 
                style={{ color: 'var(--text-tertiary)' }}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            {/* Search Box */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:outline-none"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)', 
                  borderColor: 'var(--border-color)'
                }}
                placeholder="Search stocks by name, symbol, or sector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Stock Selection */}
            {!selectedStock ? (
              <div className="max-h-60 overflow-y-auto mb-6" 
                style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}
              >
                {filteredStocks.length > 0 ? (
                  <div className="divide-y" style={{ borderColor: 'var(--divider-color)' }}>
                    {filteredStocks.map((stock) => (
                      <div 
                        key={stock.id}
                        className="p-3 cursor-pointer hover:opacity-90 transition-opacity flex justify-between items-center"
                        style={{ 
                          backgroundColor: 'var(--bg-secondary)',
                          borderColor: 'var(--border-color)'
                        }}
                        onClick={() => handleSelectStock(stock)}
                      >
                        <div>
                          <h4 className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{stock.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>{stock.symbol}</span>
                            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{stock.sector}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>${stock.price?.toFixed(2)}</p>
                          <p className="text-xs font-medium" 
                            style={{ color: stock.change >= 0 ? 'var(--success)' : 'var(--error)' }}
                          >
                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center" style={{ color: 'var(--text-tertiary)' }}>
                    No stocks found matching "{searchTerm}"
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex justify-between items-center p-4 rounded-md mb-4" 
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div>
                    <h4 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>{selectedStock.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>{selectedStock.symbol}</span>
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{selectedStock.sector}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>${selectedStock.price?.toFixed(2)}</p>
                    <p className="text-xs font-medium" 
                      style={{ color: selectedStock.change >= 0 ? 'var(--success)' : 'var(--error)' }}
                    >
                      {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change}%
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="text-xs font-medium mb-4 flex items-center"
                  style={{ color: 'var(--accent-primary)' }}
                  onClick={() => setSelectedStock(null)}
                >
                  ← Back to stock list
                </button>
                
                <form onSubmit={handleSubmit}>
                  {/* Quantity Input */}
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                      Quantity
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        className="block w-full rounded-md focus:ring-2 focus:outline-none px-3 py-2"
                        style={{ 
                          backgroundColor: 'var(--bg-secondary)', 
                          color: 'var(--text-primary)', 
                          borderColor: 'var(--border-color)' 
                        }}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  
                  {/* Transaction Summary */}
                  <div className="p-4 rounded-md mb-4" 
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Price per share:</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        ${selectedStock.price?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Quantity:</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {quantity} share{quantity !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t" 
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Total cost:</span>
                      <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                        ${selectedStock.price ? (quantity * selectedStock.price).toLocaleString() : '0.00'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md mb-4" 
                    style={{ backgroundColor: 'var(--accent-muted)' }}
                  >
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Available cash:</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        ${cash.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Error Message */}
                  {error && (
                    <div className="mb-4 p-2 text-sm rounded border" 
                      style={{ 
                        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                        color: 'var(--error)',
                        borderColor: 'var(--error)' 
                      }}
                    >
                      {error}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="flex-1 justify-center rounded-md border px-4 py-2 text-sm font-medium"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        color: 'var(--text-primary)', 
                        borderColor: 'var(--border-color)' 
                      }}
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
                      style={{ 
                        backgroundColor: 'var(--accent-primary)', 
                        color: 'var(--text-on-accent)' 
                      }}
                    >
                      Buy {quantity} Share{quantity !== 1 ? 's' : ''}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 