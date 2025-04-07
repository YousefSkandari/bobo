'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { useTheme, ThemeType } from '@/context/ThemeContext';
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  SwatchIcon,
  LockClosedIcon,
  UserIcon,
  BellAlertIcon,
  SparklesIcon,
  SunIcon as SunIconSolid,
  CloudIcon,
  FireIcon,
  CalendarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState('Demo User');
  const [email, setEmail] = useState('demo@example.com');
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    mobileApp: false,
    weeklyReport: true,
    marketAlerts: true,
    portfolioUpdates: true
  });
  const [riskProfile, setRiskProfile] = useState('moderate');
  
  // Load user data from localStorage on mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem('bobUser');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.name) setName(user.name);
        if (user.email) setEmail(user.email);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Update the user data in localStorage
      const userData = localStorage.getItem('bobUser');
      if (userData) {
        const user = JSON.parse(userData);
        user.name = name;
        user.email = email;
        localStorage.setItem('bobUser', JSON.stringify(user));
      }
      
      // Show success message
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };
  
  const handlePasswordReset = () => {
    // In a real app, this would trigger a password reset flow
    alert('Password reset email sent!');
  };
  
  const themes = [
    { id: 'light', name: 'Light', icon: SunIcon, description: 'Bright, clean interface with blue accents' },
    { id: 'dark', name: 'Dark', icon: MoonIcon, description: 'Dark mode for reduced eye strain' },
    { id: 'blue', name: 'Blue', icon: SwatchIcon, description: 'Sleek, modern deep blue interface' },
    { id: 'purple', name: 'Purple', icon: SwatchIcon, description: 'Rich purple with vibrant accents' },
    { id: 'green', name: 'Green', icon: SwatchIcon, description: 'Calming green for a natural feel' },
    { id: 'high-contrast', name: 'High Contrast', icon: EyeIcon, description: 'Improved visibility and accessibility' },
  ] as const;
  
  const seasonalThemes = [
    { id: 'winter', name: 'Winter', icon: CloudIcon, description: 'Cool blue tones with a snowy feel' },
    { id: 'spring', name: 'Spring', icon: SunIconSolid, description: 'Fresh greens for the spring season' },
    { id: 'summer', name: 'Summer', icon: FireIcon, description: 'Warm orange summer vibes' },
    { id: 'autumn', name: 'Autumn', icon: CalendarIcon, description: 'Rich autumn colors and golden tones' },
  ] as const;
  
  return (
    <MainLayout>
      <div className="pb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
          Manage your account preferences and settings
        </p>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="shadow rounded-lg overflow-hidden border" style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-color)' 
            }}>
              <div className="p-6" style={{ 
                background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' 
              }}>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-on-accent)' }}>Profile Information</h2>
                <p className="mt-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Update your account details</p>
              </div>
              
              <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      className="block w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:outline-none"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        color: 'var(--text-primary)', 
                        borderColor: 'var(--border-color)' 
                      }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="block w-full pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:outline-none"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        color: 'var(--text-primary)', 
                        borderColor: 'var(--border-color)' 
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="riskProfile" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Risk Profile
                  </label>
                  <select
                    id="riskProfile"
                    className="mt-1 block w-full rounded-md py-2 px-3 focus:ring-2 focus:outline-none"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      color: 'var(--text-primary)', 
                      borderColor: 'var(--border-color)' 
                    }}
                    value={riskProfile}
                    onChange={(e) => setRiskProfile(e.target.value)}
                  >
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors duration-200"
                    style={{ 
                      backgroundColor: 'var(--accent-primary)', 
                      color: 'var(--text-on-accent)',
                      borderColor: 'transparent'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
                
                <div className="pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Security</h3>
                  <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    Manage your security settings
                  </p>
                  
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handlePasswordReset}
                      className="flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors duration-200"
                      style={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        color: 'var(--text-primary)', 
                        borderColor: 'var(--border-color)' 
                      }}
                    >
                      <LockClosedIcon className="h-5 w-5 mr-2" style={{ color: 'var(--text-tertiary)' }} />
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Preferences and Notifications */}
          <div className="space-y-6">
            {/* Appearance */}
            <div className="shadow rounded-lg overflow-hidden border" style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-color)' 
            }}>
              <div className="p-6" style={{ 
                background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' 
              }}>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-on-accent)' }}>Appearance</h2>
                <p className="mt-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Customize your interface</p>
              </div>
              
              <div className="p-6 rounded-lg border" style={{ 
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)'
              }}>
                <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Standard Themes</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption.id}
                      className={`p-3 rounded-md text-sm font-medium transition-colors duration-200 flex flex-col items-center`}
                      style={{ 
                        backgroundColor: theme === themeOption.id ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                        color: theme === themeOption.id ? 'var(--text-on-accent)' : 'var(--text-primary)',
                        border: `1px solid ${theme === themeOption.id ? 'var(--accent-secondary)' : 'var(--border-color)'}`
                      }}
                      onClick={() => setTheme(themeOption.id as ThemeType)}
                    >
                      <themeOption.icon className="h-6 w-6 mb-2" />
                      {themeOption.name}
                    </button>
                  ))}
                </div>
                
                <h3 className="text-lg font-medium my-4" style={{ color: 'var(--text-primary)' }}>Seasonal Themes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {seasonalThemes.map((themeOption) => (
                    <button
                      key={themeOption.id}
                      className={`p-3 rounded-md text-sm font-medium transition-colors duration-200 flex flex-col items-center`}
                      style={{ 
                        backgroundColor: theme === themeOption.id ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                        color: theme === themeOption.id ? 'var(--text-on-accent)' : 'var(--text-primary)',
                        border: `1px solid ${theme === themeOption.id ? 'var(--accent-secondary)' : 'var(--border-color)'}`
                      }}
                      onClick={() => setTheme(themeOption.id as ThemeType)}
                    >
                      <themeOption.icon className="h-6 w-6 mb-2" />
                      {themeOption.name}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4">
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Theme selected: <span className="font-medium" style={{ color: 'var(--accent-primary)' }}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                    {
                      themes.find(t => t.id === theme)?.description || 
                      seasonalThemes.find(t => t.id === theme)?.description
                    }
                  </p>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Theme Preview</h3>
                  <div className="h-24 rounded-md overflow-hidden border mt-2" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="h-1/2 px-3 py-2 text-xs font-medium" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-on-accent)' }}>
                      Header (Primary)
                    </div>
                    <div className="h-1/2 px-3 py-2 flex justify-between items-center text-xs" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                      <span>Content (Secondary)</span>
                      <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--accent-muted)', color: 'var(--accent-primary)' }}>Button</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="shadow rounded-lg overflow-hidden border" style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-color)' 
            }}>
              <div className="p-6" style={{ 
                background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' 
              }}>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-on-accent)' }}>Notifications</h2>
                <p className="mt-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Manage how we contact you</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Notification Channels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="email-notifications"
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        style={{ 
                          borderColor: 'var(--border-color)',
                          backgroundColor: notifications.email ? 'var(--accent-primary)' : 'var(--bg-secondary)'
                        }}
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                      />
                      <label htmlFor="email-notifications" className="ml-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="browser-notifications"
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        style={{ 
                          borderColor: 'var(--border-color)',
                          backgroundColor: notifications.browser ? 'var(--accent-primary)' : 'var(--bg-secondary)'
                        }}
                        checked={notifications.browser}
                        onChange={() => handleNotificationChange('browser')}
                      />
                      <label htmlFor="browser-notifications" className="ml-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                        Browser notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="mobile-notifications"
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        style={{ 
                          borderColor: 'var(--border-color)',
                          backgroundColor: notifications.mobileApp ? 'var(--accent-primary)' : 'var(--bg-secondary)'
                        }}
                        checked={notifications.mobileApp}
                        onChange={() => handleNotificationChange('mobileApp')}
                      />
                      <label htmlFor="mobile-notifications" className="ml-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                        Mobile app notifications
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Notification Types</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="weekly-report"
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        style={{ 
                          borderColor: 'var(--border-color)',
                          backgroundColor: notifications.weeklyReport ? 'var(--accent-primary)' : 'var(--bg-secondary)'
                        }}
                        checked={notifications.weeklyReport}
                        onChange={() => handleNotificationChange('weeklyReport')}
                      />
                      <label htmlFor="weekly-report" className="ml-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                        Weekly report
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="market-alerts"
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        style={{ 
                          borderColor: 'var(--border-color)',
                          backgroundColor: notifications.marketAlerts ? 'var(--accent-primary)' : 'var(--bg-secondary)'
                        }}
                        checked={notifications.marketAlerts}
                        onChange={() => handleNotificationChange('marketAlerts')}
                      />
                      <label htmlFor="market-alerts" className="ml-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                        Market alerts
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="portfolio-updates"
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        style={{ 
                          borderColor: 'var(--border-color)',
                          backgroundColor: notifications.portfolioUpdates ? 'var(--accent-primary)' : 'var(--bg-secondary)'
                        }}
                        checked={notifications.portfolioUpdates}
                        onChange={() => handleNotificationChange('portfolioUpdates')}
                      />
                      <label htmlFor="portfolio-updates" className="ml-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                        Portfolio updates
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 