'use client';

import React from 'react';
import Image from 'next/image';

interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
}

interface StoreItemProps {
  item: CosmeticItem;
  onSelect: () => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ item, onSelect }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      style={{ 
        backgroundColor: 'var(--bg-card)',
        boxShadow: 'var(--shadow-sm)'
      }}>
      <div className="h-48 relative"
        style={{ backgroundColor: 'var(--bg-secondary)' }}>
        {/* Placeholder image for now; in a real app, you'd use actual images */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500"
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-tertiary)'
          }}>
          <span className="text-lg font-medium">{item.name} Image</span>
        </div>
      </div>
      
      <div className="p-4">
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
        
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            ${item.price}
          </span>
          <button
            onClick={onSelect}
            className="px-4 py-2 rounded-md transition-opacity hover:opacity-90"
            style={{ 
              backgroundColor: 'var(--accent-primary)', 
              color: 'var(--text-on-accent)'
            }}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreItem; 