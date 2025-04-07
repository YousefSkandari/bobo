'use client';

import React, { useState } from 'react';

interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CosmeticItem;
  onConfirm: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, item, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!isOpen) return null;
  
  const handleConfirm = async () => {
    setIsProcessing(true);
    await onConfirm();
    setIsProcessing(false);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg p-6 max-w-md w-full"
        style={{ backgroundColor: 'var(--bg-card)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Confirm Purchase
        </h2>
        
        <div className="mb-6">
          <div className="p-4 rounded-md mb-4"
            style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>
              <span className="inline-block px-2 py-1 text-xs font-medium rounded capitalize"
                style={{ 
                  backgroundColor: 'var(--accent-muted)',
                  color: 'var(--accent-primary)'
                }}>
                {item.category}
              </span>
            </div>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              {item.description}
            </p>
            <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              ${item.price}
            </p>
          </div>
          
          <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>
            Are you sure you want to purchase this item?
          </p>
          
          <p className="text-sm italic" style={{ color: 'var(--text-tertiary)' }}>
            Note: In a real application, this would deduct from your in-app currency or connect to a payment processor.
          </p>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded-md transition-colors disabled:opacity-50"
            style={{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'transparent'
            }}
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          
          <button
            className="px-4 py-2 rounded-md transition-opacity disabled:opacity-50 flex items-center justify-center min-w-[100px]"
            style={{ 
              backgroundColor: 'var(--accent-primary)', 
              color: 'var(--text-on-accent)'
            }}
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full"
                style={{ borderColor: 'var(--text-on-accent)' }}></div>
            ) : (
              'Purchase'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal; 