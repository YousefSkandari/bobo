'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon,
  BuildingOffice2Icon,
  BookOpenIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

interface SidebarProps {
  userName: string;
  onLogout: () => void;
}

export default function Sidebar({ userName, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'City View', href: '/city', icon: BuildingOffice2Icon },
    { name: 'Discover Stocks', href: '/stocks', icon: ChartBarIcon },
    { name: 'Education', href: '/education', icon: BookOpenIcon },
    { name: 'Transactions', href: '/transactions', icon: CurrencyDollarIcon },
    { name: 'Store', href: '/store', icon: CurrencyDollarIcon },
    { name: 'Friends', href: '/friends', icon: HomeIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogout();
  };
  
  const navigateTo = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  const sidebarStyle = {
    backgroundColor: 'var(--bg-sidebar)',
    color: 'var(--text-primary)',
    borderRight: '1px solid var(--border-color)'
  };
  
  const activeItemStyle = {
    backgroundColor: 'var(--accent-primary)',
    color: 'var(--text-on-accent)'
  };
  
  const inactiveItemStyle = {
    color: 'var(--text-secondary)'
  };
  
  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md shadow-md"
        style={{ backgroundColor: 'var(--bg-card)' }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle sidebar menu"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon style={{ color: 'var(--text-secondary)' }} className="h-6 w-6" />
        ) : (
          <Bars3Icon style={{ color: 'var(--text-secondary)' }} className="h-6 w-6" />
        )}
      </button>
      
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0" style={sidebarStyle}>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 cursor-pointer" onClick={() => router.push('/dashboard')}>
              <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>BOB</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent-muted hover:text-text-primary transition-colors duration-200`}
                    style={active ? activeItemStyle : inactiveItemStyle}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6"
                      style={{ color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)' }}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium"
                     style={{ backgroundColor: 'var(--accent-primary)' }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{userName}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center px-3 py-1 rounded-md hover:bg-accent-muted hover:text-text-primary transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${
          isMobileMenuOpen ? 'fixed inset-0 z-40 flex' : 'hidden'
        } md:hidden`}
      >
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-opacity-75"
          style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.75 }}
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Sidebar content */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full" style={sidebarStyle}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset"
              style={{ color: 'var(--text-on-accent)' }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close sidebar"
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4 cursor-pointer" onClick={() => navigateTo('/dashboard')}>
              <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>BOB</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <div
                    key={item.name}
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer hover:bg-accent-muted hover:text-text-primary transition-colors duration-200"
                    style={active ? activeItemStyle : inactiveItemStyle}
                    onClick={() => navigateTo(item.href)}
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      style={{ color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)' }}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                );
              })}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex p-4" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium"
                     style={{ backgroundColor: 'var(--accent-primary)' }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="text-base font-medium truncate" style={{ color: 'var(--text-primary)' }}>{userName}</div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center px-3 py-1 rounded-md hover:bg-accent-muted hover:text-text-primary transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-14">{/* Dummy element to force sidebar to shrink to fit close icon */}</div>
      </div>
    </>
  );
} 