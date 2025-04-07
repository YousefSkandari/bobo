'use client';

import React, { useState, useEffect } from 'react';

interface Building {
  id: string;
  type: string;
  name: string;
  level: number;
  value: number;
  change: number;
  percentage: number;
  style?: string;
}

interface CityData {
  name: string;
  level: number;
  totalValue: number;
  totalBuildings: number;
  theme: string;
  buildings: Building[];
}

interface CosmeticItem {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  isPremium: boolean;
}

interface CityEditorProps {
  cityData: CityData;
  cosmeticItems: CosmeticItem[];
  ownedCosmetics: string[];
  hasPremium: boolean;
  onApplyCosmetic: (item: CosmeticItem, buildingId?: string) => void;
  onUpgradeClick: () => void;
}

const CityEditor: React.FC<CityEditorProps> = ({
  cityData,
  cosmeticItems,
  ownedCosmetics,
  hasPremium,
  onApplyCosmetic,
  onUpgradeClick
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'buildings' | 'decorations'>('themes');
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  
  // Function to handle theme selection for preview
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    setPreviewTheme(selectedTheme);
    
    // Find if this is a premium theme
    const isPremiumTheme = cosmeticItems.some(item => 
      item.id === selectedTheme && item.isPremium && !ownedCosmetics.includes(item.id)
    );
    
    // If premium theme and user doesn't have premium, we'll just preview
    if (isPremiumTheme && !hasPremium) {
      // This is just a preview, no save
    } else {
      // For regular themes or if user has premium, apply the theme
      const themeItem = cosmeticItems.find(item => item.id === selectedTheme);
      if (themeItem) {
        onApplyCosmetic(themeItem);
      }
    }
  };
  
  // Filter cosmetic items based on active tab
  const filteredItems = cosmeticItems.filter(item => {
    switch (activeTab) {
      case 'themes':
        return item.type === 'theme';
      case 'buildings':
        return item.type === 'building-style';
      case 'decorations':
        return item.type === 'decoration';
      default:
        return true;
    }
  });
  
  // Function to determine if an item is owned
  const isItemOwned = (itemId: string) => {
    return ownedCosmetics.includes(itemId);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left panel - City preview */}
      <div className="md:col-span-2">
        <div 
          className="shadow-lg rounded-lg overflow-hidden border h-[500px] relative"
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            borderColor: 'var(--border-color)' 
          }}
        >
          <div className="p-4 border-b flex justify-between items-center"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>City Preview</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Theme:</span>
              <select 
                className="px-2 py-1 rounded text-sm border"
                style={{
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }}
                value={previewTheme || cityData.theme}
                onChange={handleThemeChange}
              >
                <option value="default">Default</option>
                <option value="night">Night (Premium)</option>
                <option value="sunset">Sunset</option>
                <option value="winter">Winter (Premium)</option>
              </select>
            </div>
          </div>
          
          <div className="relative h-full">
            {/* Premium theme preview indicator */}
            {previewTheme && !hasPremium && cosmeticItems.some(item => item.id === previewTheme && item.isPremium) && (
              <div className="absolute top-2 right-2 z-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg backdrop-blur-sm"
                   style={{ 
                     backgroundColor: 'rgba(255, 215, 0, 0.2)', 
                     border: '1px solid gold',
                     color: 'gold'
                   }}>
                <span className="text-xs">⭐</span>
                <span>Premium Preview Mode</span>
              </div>
            )}
            
            {/* City preview background */}
            <div className="absolute inset-0 p-4" 
                 style={{ 
                   filter: previewTheme === 'night' && !hasPremium ? 'brightness(0.7) contrast(1.2) saturate(0.8)' : 'none',
                   transition: 'filter 0.5s ease'
                 }}>
              {/* Sky */}
              <div 
                className="absolute top-0 left-0 w-full h-3/4" 
                style={{ 
                  background: getThemeBackground(previewTheme || cityData.theme)
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
                style={{ 
                  backgroundColor: getGroundColor(previewTheme || cityData.theme)
                }}
              ></div>
              
              {/* Main Building Visualization */}
              <div className="absolute bottom-0 left-0 w-full flex items-end justify-center z-10">
                <div className="flex items-end justify-center gap-4" style={{ width: '70%' }}>
                  {cityData.buildings.map((building) => {
                    // More dramatic height scaling based on percentage
                    const baseHeight = 40; // Minimum building height
                    const maxHeight = 280; // Maximum building height
                    const normalizedHeight = Math.pow(building.percentage / 30, 1.8);
                    const buildingHeight = Math.max(baseHeight, Math.min(maxHeight, 
                      baseHeight + (normalizedHeight * maxHeight)));
                    
                    // Is the building performance negative?
                    const isRundown = building.change < 0;
                    
                    // Width proportional to percentage
                    const buildingWidth = Math.max(40, Math.min(70, 40 + building.percentage));
                    
                    return (
                      <div
                        key={building.id}
                        className={`relative cursor-pointer ${
                          selectedBuilding === building.id ? 'ring-2 ring-offset-2 transform -translate-y-2' : ''
                        } transition-all duration-300`}
                        style={{
                          height: `${buildingHeight}px`,
                          width: `${buildingWidth}px`,
                          backgroundColor: getBuildingColor(building.type, isRundown),
                          borderTopLeftRadius: '4px',
                          borderTopRightRadius: '4px',
                          // Add cracks and deterioration for poorly performing buildings
                          backgroundImage: isRundown 
                            ? 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 6px)' 
                            : 'none',
                          boxShadow: selectedBuilding === building.id 
                            ? '0 0 15px rgba(var(--accent-primary-rgb), 0.5)' 
                            : 'none',
                          zIndex: 10 + Math.floor(building.percentage),
                          filter: isRundown ? 'brightness(0.7) saturate(0.7)' : 'none'
                        }}
                        onClick={() => setSelectedBuilding(building.id)}
                      >
                        {/* Windows */}
                        <div className={`absolute inset-0 grid grid-cols-2 gap-1 p-1 ${isRundown ? 'opacity-40' : 'opacity-80'}`}>
                          {Array.from({ length: Math.floor(buildingHeight / 20) * 2 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={!isRundown && (previewTheme === 'night' || cityData.theme === 'night') ? 'animate-window-flicker' : ''}
                              style={{
                                backgroundColor: isRundown ? 'var(--text-tertiary)' : 'var(--building-window-light)',
                                height: '10px',
                                width: '10px',
                                opacity: isRundown && Math.random() > 0.7 ? '0' : '1',
                                boxShadow: !isRundown && (previewTheme === 'night' || cityData.theme === 'night') ? '0 0 3px var(--building-window-light)' : 'none'
                              }}
                            ></div>
                          ))}
                        </div>
                        
                        {/* Custom style indicator */}
                        {building.style && (
                          <div className="absolute top-0 right-0 w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: 'gold', boxShadow: '0 0 5px gold' }}></div>
                        )}
                        
                        {/* Building name indicator */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold whitespace-nowrap"
                             style={{ color: 'var(--text-primary)' }}>
                          {building.name.split(' ')[0]}
                        </div>

                        {/* Rundown indicator */}
                        {isRundown && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md animate-pulse"
                            style={{ 
                              backgroundColor: 'var(--error)',
                              color: 'var(--text-on-accent)',
                              zIndex: 20
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
            
            {/* Editor controls overlay */}
            <div className="absolute bottom-2 left-0 right-0 p-4 flex justify-center">
              <div className="p-2 rounded-full shadow-lg flex items-center gap-1 bg-opacity-80"
                style={{ 
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <button 
                  className="p-2 rounded-full"
                  style={{ 
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--text-on-accent)'
                  }}
                  onClick={() => setPreviewTheme(null)} // Reset preview
                >
                  <span className="text-xs">🔄</span>
                </button>
                <button 
                  className="p-2 rounded-full"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <span className="text-xs">🔍</span>
                </button>
                <button 
                  className="p-2 rounded-full"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <span className="text-xs">⚙️</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selected building info */}
        {selectedBuilding && (
          <div 
            className="mt-4 p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-color)' 
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {cityData.buildings.find(b => b.id === selectedBuilding)?.name}
              </h3>
              <span className="text-sm px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)' }}>
                {cityData.buildings.find(b => b.id === selectedBuilding)?.type}
              </span>
            </div>
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              Select a building style below to customize this building
            </p>
            <div className="flex overflow-x-auto gap-2 py-2">
              {filteredItems
                .filter(item => item.type === 'building-style')
                .map(item => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-20 cursor-pointer"
                    onClick={() => onApplyCosmetic(item, selectedBuilding)}
                  >
                    <div 
                      className="w-20 h-20 rounded mb-1 flex items-center justify-center text-center"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)',
                        border: isItemOwned(item.id) ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)'
                      }}
                    >
                      {/* Placeholder for building style image */}
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xs font-medium"
                        style={{ color: isItemOwned(item.id) ? 'var(--success)' : 'var(--text-secondary)' }}
                      >
                        {isItemOwned(item.id) ? 'Owned' : `$${item.price}`}
                      </span>
                      {item.isPremium && (
                        <span className="text-xs" style={{ color: 'gold' }}>⭐</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Right panel - Cosmetic items */}
      <div>
        <div 
          className="shadow-lg rounded-lg overflow-hidden border"
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            borderColor: 'var(--border-color)' 
          }}
        >
          <div className="p-4 border-b"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>Customization Options</h2>
          </div>
          
          {/* Tab selector */}
          <div 
            className="flex border-b" 
            style={{ borderColor: 'var(--border-color)' }}
          >
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === 'themes' ? 'border-b-2' : ''}`}
              style={{ 
                borderColor: activeTab === 'themes' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'themes' ? 'var(--accent-primary)' : 'var(--text-secondary)'
              }}
              onClick={() => setActiveTab('themes')}
            >
              Themes
            </button>
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === 'buildings' ? 'border-b-2' : ''}`}
              style={{ 
                borderColor: activeTab === 'buildings' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'buildings' ? 'var(--accent-primary)' : 'var(--text-secondary)'
              }}
              onClick={() => setActiveTab('buildings')}
            >
              Buildings
            </button>
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === 'decorations' ? 'border-b-2' : ''}`}
              style={{ 
                borderColor: activeTab === 'decorations' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'decorations' ? 'var(--accent-primary)' : 'var(--text-secondary)'
              }}
              onClick={() => setActiveTab('decorations')}
            >
              Decorations
            </button>
          </div>
          
          {/* Cosmetic items list */}
          <div className="p-4 overflow-y-auto" style={{ maxHeight: '550px' }}>
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <p style={{ color: 'var(--text-secondary)' }}>No items found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-lg flex flex-col"
                    style={{ 
                      backgroundColor: isItemOwned(item.id) ? 'rgba(var(--accent-primary-rgb), 0.05)' : 'var(--bg-card)',
                      borderColor: isItemOwned(item.id) ? 'var(--accent-primary)' : 'var(--border-color)'
                    }}
                  >
                    <div className="flex gap-3 mb-2">
                      {/* Placeholder for item image */}
                      <div 
                        className="w-16 h-16 flex-shrink-0 rounded flex items-center justify-center"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                      >
                        <span style={{ color: 'var(--text-tertiary)' }}>{item.name[0]}</span>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {item.name}
                          </h3>
                          {item.isPremium && (
                            <span 
                              className="text-xs px-2 py-0.5 rounded"
                              style={{ 
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                color: 'gold',
                                border: '1px solid gold'
                              }}
                            >
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>${item.price}</span>
                      
                      <div className="flex gap-2">
                        {!isItemOwned(item.id) && (
                          <button
                            className="px-3 py-1 text-sm rounded"
                            style={{ 
                              backgroundColor: 'var(--accent-primary)',
                              color: 'var(--text-on-accent)'
                            }}
                          >
                            Purchase
                          </button>
                        )}
                        
                        <button
                          className={`px-3 py-1 text-sm rounded ${
                            (!isItemOwned(item.id) || (item.isPremium && !hasPremium)) ? 'opacity-70' : ''
                          }`}
                          style={{ 
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)'
                          }}
                          onClick={() => {
                            if (item.isPremium && !hasPremium) {
                              onUpgradeClick();
                            } else if (isItemOwned(item.id)) {
                              onApplyCosmetic(item, selectedBuilding || undefined);
                            }
                          }}
                        >
                          {item.isPremium && !hasPremium ? '⭐ Unlock' : 'Apply'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {!hasPremium && (
            <div 
              className="p-4 border-t"
              style={{ 
                backgroundColor: 'rgba(255, 215, 0, 0.05)',
                borderColor: 'var(--border-color)' 
              }}
            >
              <button
                onClick={onUpgradeClick}
                className="w-full py-2 rounded-lg flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  border: '1px solid gold',
                  color: 'gold'
                }}
              >
                <span>⭐</span>
                <span>Unlock Premium Features</span>
              </button>
              <p className="mt-2 text-sm text-center" style={{ color: 'var(--text-tertiary)' }}>
                Get access to exclusive premium themes and buildings
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get building color
function getBuildingColor(type: string, isRundown: boolean): string {
  // Base colors
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
      baseColor = 'var(--building-residential)';
  }
  
  return baseColor;
}

// Helper function to get themed background
function getThemeBackground(theme: string): string {
  switch (theme) {
    case 'night':
      return 'linear-gradient(to bottom, #0a1128, #1a237e)';
    case 'sunset':
      return 'linear-gradient(to bottom, #ff7e5f, #feb47b)';
    case 'winter':
      return 'linear-gradient(to bottom, #83a4d4, #b6fbff)';
    default:
      return 'linear-gradient(to bottom, var(--city-sky-from), var(--city-sky-to))';
  }
}

// Helper function to get ground color based on theme
function getGroundColor(theme: string): string {
  switch (theme) {
    case 'night':
      return '#0d1b2a';
    case 'sunset':
      return '#3a3335';
    case 'winter':
      return '#fff5f5';
    default:
      return 'var(--city-ground)';
  }
}

export default CityEditor; 