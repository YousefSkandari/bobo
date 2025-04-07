'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import { useTheme } from '@/context/ThemeContext';
import CityEditor from './CityEditor';
import PremiumFeatureModal from './PremiumFeatureModal';

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
  isPremium?: boolean;
}

interface Building {
  id: string;
  type: string;
  name: string;
  level: number;
  value: number;
  change: number;
  percentage: number;
  style?: string; // Custom style applied to building
}

interface CosmeticItem {
  id: string;
  name: string;
  type: string; // 'building-style', 'theme', 'decoration'
  description: string;
  price: number;
  thumbnailUrl: string;
  isPremium: boolean;
}

export default function ClientCityPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [editMode, setEditMode] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);
  
  // Mock city data
  const [cityData, setCityData] = useState({
    name: "Investopia",
    level: 3,
    totalValue: 5916.0, // Total value of all buildings
    totalBuildings: 5,
    theme: 'default',
    buildings: [
      { id: "b1", type: "commercial", name: "Apple Tower", level: 4, value: 1750.45, change: 3.2, percentage: 29.6 },
      { id: "b2", type: "residential", name: "Microsoft Plaza", level: 3, value: 1250.30, change: -0.8, percentage: 21.1 },
      { id: "b3", type: "industrial", name: "Tesla Factory", level: 5, value: 890.25, change: 5.7, percentage: 15.0 },
      { id: "b4", type: "commercial", name: "Amazon Mall", level: 2, value: 675.90, change: 1.2, percentage: 11.4 },
      { id: "b5", type: "technology", name: "Google Campus", level: 4, value: 1350.10, change: -1.3, percentage: 22.9 },
    ] as Building[]
  });

  // Mock cosmetic items
  const [cosmeticItems, setCosmeticItems] = useState<CosmeticItem[]>([
    {
      id: 'c1',
      name: 'Modern Glass Building',
      type: 'building-style',
      description: 'Sleek glass building style for commercial properties',
      price: 299,
      thumbnailUrl: '/store/modern-glass.png',
      isPremium: false
    },
    {
      id: 'c2',
      name: 'Night Theme',
      type: 'theme',
      description: 'Transform your city into a dazzling nighttime metropolis',
      price: 999,
      thumbnailUrl: '/store/night-theme.png',
      isPremium: true
    },
    {
      id: 'c3',
      name: 'High-Tech Residential',
      type: 'building-style',
      description: 'Futuristic smart homes for residential buildings',
      price: 599,
      thumbnailUrl: '/store/hightech-residential.png',
      isPremium: true
    },
    {
      id: 'c4',
      name: 'City Park',
      type: 'decoration',
      description: 'Add greenery to your city with a beautiful park',
      price: 399,
      thumbnailUrl: '/store/park.png', 
      isPremium: false
    },
    {
      id: 'c5',
      name: 'Golden Financial District',
      type: 'building-style',
      description: 'Luxurious gold-accented buildings for financial prosperity',
      price: 1299,
      thumbnailUrl: '/store/golden-buildings.png',
      isPremium: true
    }
  ]);

  // Mock owned cosmetics
  const [ownedCosmetics, setOwnedCosmetics] = useState<string[]>(['c1', 'c4']);
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('bobUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setHasPremium(!!parsedUser.isPremium);
        } else {
          // Redirect to login if no user data found
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  const handleEnterEditMode = () => {
    setEditMode(true);
  };

  const handleExitEditMode = () => {
    setEditMode(false);
  };

  const handleUpgradeClick = () => {
    setSelectedFeature('City Editor Pro');
    setIsPremiumModalOpen(true);
  };

  const handleApplyCosmetic = (item: CosmeticItem, buildingId?: string) => {
    if (item.isPremium && !hasPremium) {
      setSelectedFeature(item.name);
      setIsPremiumModalOpen(true);
      return;
    }
    
    if (!ownedCosmetics.includes(item.id)) {
      // Would connect to purchase functionality
      alert(`You need to purchase ${item.name} first!`);
      return;
    }

    // Apply cosmetic based on type
    if (item.type === 'theme') {
      setCityData({
        ...cityData,
        theme: item.id
      });
    } else if (item.type === 'building-style' && buildingId) {
      setCityData({
        ...cityData,
        buildings: cityData.buildings.map(building => 
          building.id === buildingId 
            ? { ...building, style: item.id } 
            : building
        )
      });
    }
  };

  const handlePurchasePremium = () => {
    // In a real app, this would connect to payment processing
    setHasPremium(true);
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem('bobUser', JSON.stringify(updatedUser));
    }
    setIsPremiumModalOpen(false);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid" 
               style={{ 
                 borderColor: 'var(--accent-primary)', 
                 borderRightColor: 'transparent' 
               }}>
          </div>
          <p className="mt-4 text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Loading your city...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Authentication Required</h2>
          <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Please log in to view your city.</p>
          <div className="mt-6">
            <Link 
              href="/auth/login"
              className="px-4 py-2 rounded-md"
              style={{ 
                backgroundColor: 'var(--accent-primary)', 
                color: 'var(--text-on-accent)' 
              }}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <MainLayout>
      <div className="pb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {editMode ? 'City Editor' : 'City View'}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {editMode 
                ? 'Customize your city with buildings and decorations' 
                : 'Watch your investments grow as your city evolves'}
            </p>
          </div>
          <div className="flex gap-2">
            {editMode ? (
              <button
                onClick={handleExitEditMode}
                className="px-4 py-2 rounded-md border"
                style={{ 
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent'
                }}
              >
                Exit Editor
              </button>
            ) : (
              <button
                onClick={handleEnterEditMode}
                className="px-4 py-2 rounded-md"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--text-on-accent)'
                }}
              >
                Edit City
              </button>
            )}
            {!hasPremium && (
              <button
                onClick={handleUpgradeClick}
                className="px-4 py-2 rounded-md border-2 flex items-center gap-1"
                style={{ 
                  borderColor: 'gold',
                  color: 'gold',
                  backgroundColor: 'rgba(255, 215, 0, 0.1)'
                }}
              >
                <span className="text-sm">⭐</span>
                Upgrade to Premium
              </button>
            )}
          </div>
        </div>
        
        {editMode ? (
          <CityEditor 
            cityData={cityData} 
            cosmeticItems={cosmeticItems}
            ownedCosmetics={ownedCosmetics}
            hasPremium={hasPremium}
            onApplyCosmetic={handleApplyCosmetic}
            onUpgradeClick={handleUpgradeClick}
          />
        ) : (
          <>
            {/* City Visualization */}
            <div className="shadow-lg rounded-lg overflow-hidden border mb-8" 
              style={{ 
                backgroundColor: 'var(--bg-card)', 
                borderColor: 'var(--border-color)' 
              }}
            >
              <div className="p-6" 
                style={{ 
                  background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' 
                }}
              >
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-on-accent)' }}>City View</h2>
                <p className="mt-1" style={{ color: 'var(--text-on-accent)', opacity: 0.8 }}>Your investments visualized as buildings</p>
              </div>
              
              <div className="p-6 border-b h-[400px] relative overflow-hidden" 
                style={{ borderColor: 'var(--border-color)' }}
              >
                {/* Sky - with animated clouds */}
                <div 
                  className="absolute top-0 left-0 w-full h-3/4" 
                  style={{ 
                    background: `linear-gradient(to bottom, var(--city-sky-from), var(--city-sky-to))`,
                    overflow: 'hidden'
                  }}
                >
                  {/* Animated clouds */}
                  <div className="absolute top-[10%] left-0 w-[200%] h-16 opacity-20 animate-cloud-slow"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="200" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 30 C 20 10, 40 10, 60 30 S 100 50, 120 30 S 160 10, 180 30" stroke="white" fill="white" /%3E%3C/svg%3E")',
                        backgroundRepeat: 'repeat-x'
                      }}
                  ></div>
                  <div className="absolute top-[30%] left-0 w-[200%] h-12 opacity-30 animate-cloud-fast"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 20 C 10 5, 20 5, 30 20 S 50 35, 60 20 S 80 5, 90 20" stroke="white" fill="white" /%3E%3C/svg%3E")',
                        backgroundRepeat: 'repeat-x'
                      }}
                  ></div>
                  
                  {/* Sun/Moon based on theme */}
                  <div className="absolute top-8 right-10 w-16 h-16 rounded-full bg-yellow-200 opacity-80 shadow-lg animate-pulse"
                      style={{
                        boxShadow: '0 0 40px rgba(255, 255, 200, 0.6)'
                      }}
                  ></div>
                </div>
                
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
                
                {/* Ground - with gradient and texture */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-[10%] shadow-inner"
                  style={{ 
                    background: `linear-gradient(to bottom, var(--city-ground), ${adjustColor('var(--city-ground)', -20)})`,
                    backgroundImage: `
                      linear-gradient(to bottom, var(--city-ground), ${adjustColor('var(--city-ground)', -20)}),
                      repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 11px)
                    `
                  }}
                ></div>
                
                {/* Main Portfolio Buildings */}
                <div className="absolute bottom-0 left-0 w-full flex items-end justify-center z-10">
                  <div className="flex items-end justify-center" style={{ width: '70%', gap: '12px' }}>
                    {cityData.buildings.map((building) => {
                      // Use direct percentage for height with a minimum size, exaggerate differences
                      const baseHeight = 40; // Minimum building height
                      const maxHeight = 280; // Maximum building height
                      
                      // More extreme exaggeration for visual clarity
                      const scaleFactor = 1.8; // Higher value = more extreme differences
                      const heightPercentage = building.percentage;
                      
                      // Apply a power function to create more dramatic differences
                      // Buildings with higher percentages will be disproportionately taller
                      const normalizedHeight = Math.pow(heightPercentage / 30, scaleFactor); // Normalize to the largest building
                      
                      // Ensure height is within bounds
                      const buildingHeight = Math.max(baseHeight, Math.min(maxHeight, baseHeight + (normalizedHeight * maxHeight)));
                      
                      // Is the building performance negative?
                      const isRundown = building.change < 0;
                      
                      // Width proportional to percentage for visual balance
                      const buildingWidth = Math.max(40, Math.min(70, 40 + building.percentage));
                      
                      // Determine window lights animation based on building performance
                      const windowAnimation = isRundown ? '' : 'animate-window-flicker';
                      
                      return (
                        <div
                          key={building.id}
                          className={`relative hover:z-40 group cursor-pointer transition-transform duration-300 hover:-translate-y-2 ${building.style ? 'building-styled' : ''}`}
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
                            boxShadow: isRundown 
                              ? 'inset 0 0 3px var(--building-shadow)' 
                              : '0 0 15px rgba(255,255,255,0.3)',
                            border: isRundown ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            transition: 'all 0.3s ease',
                            zIndex: 10 + Math.floor(building.percentage),
                            filter: isRundown ? 'brightness(0.7) saturate(0.7)' : 'none'
                          }}
                          onClick={() => {
                            if (!editMode) {
                              handleEnterEditMode();
                            }
                          }}
                        >
                          {/* Windows - with conditional animation */}
                          <div className={`absolute inset-0 grid grid-cols-2 gap-1 p-1 ${isRundown ? 'opacity-40' : 'opacity-80'} group-hover:opacity-100 transition-opacity`}>
                            {Array.from({ length: Math.floor(buildingHeight / 20) * 2 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={windowAnimation}
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
                          
                          {/* Highlight outline on hover with glow effect */}
                          <div className="absolute inset-0 border-2 opacity-0 group-hover:opacity-60 transition-opacity rounded-t-sm pointer-events-none"
                               style={{ 
                                 borderColor: isRundown ? 'var(--error)' : 'var(--accent-primary)',
                                 boxShadow: isRundown ? '0 0 10px var(--error)' : '0 0 10px var(--accent-primary)' 
                               }}></div>
                          
                          {/* Enhanced building tooltip with more info and styling */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none border backdrop-blur-sm tooltip-container tooltip-top"
                            style={{ 
                              backgroundColor: 'rgba(var(--bg-card-rgb), 0.85)', 
                              borderColor: isRundown ? 'var(--error)' : 'var(--accent-primary)',
                              width: '250px',
                              maxHeight: '300px'
                            }}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{building.name}</p>
                              <span 
                                className="px-2 py-0.5 text-xs font-medium rounded-full"
                                style={{ 
                                  backgroundColor: building.change >= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                  color: building.change >= 0 ? 'var(--success)' : 'var(--error)'
                                }}
                              >
                                {building.change >= 0 ? '+' : ''}{building.change}%
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getBuildingColor(building.type, false) }}></span>
                                  <span className="capitalize">{building.type}</span>
                                </div>
                              </div>
                              <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                                Level: {building.level}
                              </div>
                            </div>
                            
                            <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Value:</p>
                                <p className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                                  ${building.value.toLocaleString()}
                                </p>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Portfolio:</p>
                                <p className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                                  {building.percentage.toFixed(1)}%
                                </p>
                              </div>
                            </div>
                            
                            {isRundown && (
                              <div className="mt-2 text-xs p-2 rounded flex items-center gap-2"
                                style={{ 
                                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                  color: 'var(--error)'
                                }}
                              >
                                <span className="text-xs">⚠️</span>
                                <span>Needs attention! Performance below threshold.</span>
                              </div>
                            )}
                            
                            {building.style && (
                              <div className="mt-2 text-xs p-2 rounded flex items-center gap-2"
                                style={{ 
                                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                  color: 'gold'
                                }}
                              >
                                <span className="text-xs">⭐</span>
                                <span>Custom building style applied</span>
                              </div>
                            )}
                            
                            <div className="mt-3 text-xs text-center font-medium">
                              <span className="px-2 py-1 rounded-full"
                                    style={{ backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)' }}>
                                Click to customize
                              </span>
                            </div>
                            
                            {/* Tooltip arrow */}
                            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45"
                                 style={{ backgroundColor: isRundown ? 'var(--error)' : 'var(--accent-primary)' }}></div>
                          </div>
                          
                          {/* Custom style indicator - enhanced */}
                          {building.style && (
                            <div className="absolute top-0 right-0 w-4 h-4 rounded-full animate-pulse" 
                                 style={{ backgroundColor: 'gold', boxShadow: '0 0 5px gold' }}></div>
                          )}
                          
                          {/* Add "Repair needed" sign for rundown buildings - with animation */}
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
                          
                          {/* Building label with glow effect */}
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold whitespace-nowrap"
                            style={{ 
                              color: 'var(--text-primary)',
                              textShadow: building.change >= 0 ? '0 0 5px var(--accent-primary)' : 'none'
                            }}
                          >
                            {building.percentage.toFixed(0)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Foreground Small Buildings (decorative) */}
                <div className="absolute bottom-0 w-full flex items-end justify-between px-1 z-5">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const height = 15 + Math.random() * 25;
                    const width = 12 + Math.random() * 10;
                    
                    return (
                      <div
                        key={`fg-building-${i}`}
                        className="mx-[1px]"
                        style={{
                          height: `${height}px`,
                          width: `${width}px`,
                          backgroundColor: 'var(--bg-tertiary)',
                          borderTopLeftRadius: '2px',
                          borderTopRightRadius: '2px',
                          opacity: 0.6 + Math.random() * 0.3,
                          zIndex: 5
                        }}
                      >
                        {/* Windows */}
                        <div className="absolute inset-0 grid grid-cols-2 gap-0.5 p-0.5 opacity-70">
                          {Array.from({ length: Math.floor(height / 5) * 2 }).map((_, i) => (
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
                
                {/* City stats overlay */}
                <div className="absolute top-2 left-2 p-2 rounded-lg bg-opacity-30 backdrop-blur-sm border"
                     style={{ 
                       backgroundColor: 'rgba(var(--bg-card-rgb), 0.3)', 
                       borderColor: 'rgba(var(--border-color-rgb), 0.5)' 
                     }}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-on-accent)' }}>
                        City Value:
                      </span>
                      <span className="text-xs font-bold" style={{ color: 'var(--text-on-accent)' }}>
                        ${cityData.totalValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-on-accent)' }}>
                        City Level:
                      </span>
                      <span className="text-xs font-bold" style={{ color: 'var(--text-on-accent)' }}>
                        {cityData.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Buildings List */}
            <div className="shadow-md rounded-lg overflow-hidden border"
              style={{ 
                backgroundColor: 'var(--bg-card)', 
                borderColor: 'var(--border-color)' 
              }}
            >
              <div className="px-6 py-4 border-b"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-on-accent)' }}>Your Buildings</h2>
              </div>
              
              <div className="divide-y" style={{ borderColor: 'var(--divider-color)' }}>
                {cityData.buildings.map((building) => {
                  const isRundown = building.change < 0;
                  
                  return (
                    <div 
                      key={building.id} 
                      className="p-4 hover:bg-opacity-50"
                      style={{ 
                        backgroundColor: isRundown ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-card)' 
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div 
                            className="w-12 h-12 rounded relative"
                            style={{ 
                              backgroundColor: getBuildingColor(building.type, isRundown),
                              backgroundImage: isRundown ? 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 6px)' : 'none',
                              filter: isRundown ? 'brightness(0.7) saturate(0.7)' : 'none',
                              border: isRundown ? `1px solid var(--error)` : 'none'
                            }}
                          >
                            {building.style && (
                              <div className="absolute top-0 right-0 w-4 h-4 rounded-full" style={{ backgroundColor: 'gold' }}></div>
                            )}
                            {isRundown && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full text-xs"
                                style={{ 
                                  backgroundColor: 'var(--error)',
                                  color: 'var(--text-on-accent)'
                                }}
                              >
                                !
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{building.name}</h3>
                              {isRundown && (
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full"
                                  style={{ 
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: 'var(--error)'
                                  }}
                                >
                                  Needs repair
                                </span>
                              )}
                            </div>
                            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                              Type: {building.type} | Level: {building.level} | Portfolio: {building.percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>${building.value.toLocaleString()}</p>
                          <div className="flex items-center justify-end">
                            <div className="w-2 h-2 rounded-full mr-1"
                              style={{ 
                                backgroundColor: building.change >= 0 ? 'var(--success)' : 'var(--error)' 
                              }}
                            ></div>
                            <p className="text-sm font-medium"
                              style={{ 
                                color: building.change >= 0 ? 'var(--success)' : 'var(--error)' 
                              }}
                            >
                              {building.change >= 0 ? '+' : ''}{building.change}%
                            </p>
                          </div>
                        </div>
                      </div>
                      {isRundown && (
                        <div className="mt-2 text-sm p-2 rounded border"
                          style={{ 
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: 'var(--error)',
                            borderColor: 'var(--error)'
                          }}
                        >
                          <p className="font-medium">Performance issues detected.</p>
                          <p>Consider selling this asset or upgrading to improve returns.</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="p-4 border-t"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <button 
                  className="px-4 py-2 rounded-md w-full"
                  style={{ 
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--text-on-accent)'
                  }}
                  onClick={handleEnterEditMode}
                >
                  Customize Your City
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Premium feature upgrade modal */}
      <PremiumFeatureModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        featureName={selectedFeature}
        onPurchase={handlePurchasePremium}
      />
    </MainLayout>
  );
}

// Helper function to get building color based on type and condition
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
  
  // We apply filter in the component for rundown buildings
  return baseColor;
}

// Helper function to adjust CSS variables for generating gradients
function adjustColor(cssVar: string, amount: number): string {
  // We can't manipulate CSS variables directly, so we'll return a slightly modified version 
  // by making it darker or lighter with rgba
  if (amount >= 0) {
    // Lighten by adding white with reduced opacity
    return `color-mix(in srgb, ${cssVar}, white ${amount}%)`;
  } else {
    // Darken by adding black with reduced opacity
    return `color-mix(in srgb, ${cssVar}, black ${Math.abs(amount)}%)`;
  }
} 