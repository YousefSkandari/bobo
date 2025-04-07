'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { useTheme } from '@/context/ThemeContext';

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('bobUser');
        if (userData) {
          setUser(JSON.parse(userData));
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

  const handleLogout = () => {
    localStorage.removeItem('bobUser');
    router.push('/');
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
          <p className="mt-4 text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Authentication Required</h2>
          <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Please log in to access this page.</p>
          <div className="mt-6">
            <button
              onClick={() => router.push('/auth/login')}
              className="px-4 py-2 rounded-md" 
              style={{ 
                backgroundColor: 'var(--accent-primary)', 
                color: 'var(--text-on-accent)'
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <Sidebar userName={user.name} onLogout={handleLogout} />
      
      {/* Main content area */}
      <div className="flex flex-col w-full md:pl-64 flex-1">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {/* Page content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 