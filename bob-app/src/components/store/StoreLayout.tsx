'use client';

import React, { useState, useEffect } from 'react';
import StoreItem from './StoreItem';
import PurchaseModal from './PurchaseModal';

// Type definitions
interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
}

const StoreLayout: React.FC = () => {
  const [items, setItems] = useState<CosmeticItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CosmeticItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // For purchase modal
  const [selectedItem, setSelectedItem] = useState<CosmeticItem | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false);
  
  // Mock user ID (would come from auth in a real app)
  const mockUserId = "user-123";
  
  // Fetch cosmetic items
  const fetchItems = async () => {
    try {
      setLoading(true);
      // In a real application, this would be an API call
      // For now, we'll use mock data
      const mockItems: CosmeticItem[] = [
        {
          id: '1',
          name: 'Modern Skyscraper',
          description: 'A sleek, modern skyscraper design for your high-performing stocks.',
          category: 'building',
          price: 499,
          imageUrl: '/store/skyscraper.png',
        },
        {
          id: '2',
          name: 'Tech Campus',
          description: 'A sprawling tech campus design inspired by Silicon Valley.',
          category: 'building',
          price: 799,
          imageUrl: '/store/tech-campus.png',
        },
        {
          id: '3',
          name: 'Fountain Plaza',
          description: 'A beautiful fountain plaza to decorate your city center.',
          category: 'decoration',
          price: 299,
          imageUrl: '/store/fountain.png',
        },
        {
          id: '4',
          name: 'Night Theme',
          description: 'Transform your city into a dazzling nighttime metropolis.',
          category: 'theme',
          price: 999,
          imageUrl: '/store/night-theme.png',
        },
        {
          id: '5',
          name: 'Park Garden',
          description: 'Add greenery to your city with this beautiful park.',
          category: 'decoration',
          price: 399,
          imageUrl: '/store/park.png',
        },
      ];
      
      setItems(mockItems);
      setFilteredItems(mockItems);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(mockItems.map(item => item.category)));
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load store items. Please try again later.');
      setLoading(false);
      console.error('Error fetching cosmetic items:', err);
    }
  };
  
  useEffect(() => {
    fetchItems();
  }, []);
  
  // Filter items by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, items]);
  
  // Handle item selection for purchase
  const handleItemSelect = (item: CosmeticItem) => {
    setSelectedItem(item);
    setIsPurchaseModalOpen(true);
  };
  
  // Handle purchase confirmation
  const handleConfirmPurchase = async () => {
    if (!selectedItem) return;
    
    try {
      // In a real app, this would be an API call to purchase endpoint
      console.log(`Purchasing item: ${selectedItem.name} for user: ${mockUserId}`);
      
      // Simulate successful purchase
      setTimeout(() => {
        setIsPurchaseModalOpen(false);
        setSelectedItem(null);
        alert(`Successfully purchased ${selectedItem.name}!`);
      }, 1000);
      
    } catch (err) {
      console.error('Error purchasing item:', err);
      alert('Failed to purchase item. Please try again.');
    }
  };
  
  return (
    <div className="pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Customize Your City</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Enhance your city with premium buildings, decorations, and themes.</p>
      </div>
      
      {/* Category filters */}
      <div className="mb-6 flex gap-2">
        <button
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'all' ? 'text-white' : ''
          }`}
          style={{ 
            backgroundColor: selectedCategory === 'all' 
              ? 'var(--accent-primary)' 
              : 'var(--bg-secondary)',
            color: selectedCategory === 'all'
              ? 'var(--text-on-accent)'
              : 'var(--text-secondary)'
          }}
          onClick={() => setSelectedCategory('all')}
        >
          All Items
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedCategory === category ? 'text-white' : ''
            }`}
            style={{ 
              backgroundColor: selectedCategory === category 
                ? 'var(--accent-primary)' 
                : 'var(--bg-secondary)',
              color: selectedCategory === category
                ? 'var(--text-on-accent)'
                : 'var(--text-secondary)'
            }}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: 'var(--accent-primary)' }}></div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="p-4 rounded-md mb-6"
          style={{ 
            backgroundColor: 'var(--error-bg)', 
            color: 'var(--error)' 
          }}>
          {error}
        </div>
      )}
      
      {/* Store items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <StoreItem 
            key={item.id} 
            item={item} 
            onSelect={() => handleItemSelect(item)} 
          />
        ))}
      </div>
      
      {/* Empty state */}
      {!loading && filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
            No items found in this category.
          </p>
          <button 
            className="px-4 py-2 rounded-md"
            style={{ 
              backgroundColor: 'var(--accent-primary)', 
              color: 'var(--text-on-accent)'
            }}
            onClick={() => setSelectedCategory('all')}
          >
            View All Items
          </button>
        </div>
      )}
      
      {/* Purchase modal */}
      {selectedItem && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          item={selectedItem}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
};

export default StoreLayout; 