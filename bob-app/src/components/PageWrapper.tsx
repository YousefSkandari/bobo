'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('bobUser');
    setIsAuthenticated(!!userData);
  }, [pathname]); // Re-check whenever pathname changes
  
  // Check if current path is an authenticated route
  const isAuthenticatedRoute = 
    pathname === '/dashboard' || 
    pathname === '/city' || 
    pathname === '/stocks' || 
    pathname === '/education' || 
    pathname === '/transactions' || 
    pathname === '/settings' ||
    pathname.startsWith('/dashboard/') || 
    pathname.startsWith('/city/') || 
    pathname.startsWith('/stocks/') || 
    pathname.startsWith('/education/') || 
    pathname.startsWith('/transactions/') || 
    pathname.startsWith('/settings/');
  
  // Only show the header on non-authenticated routes
  const showHeader = !isAuthenticatedRoute;
  
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-indigo-600 font-bold text-2xl">
                  BOB
                </Link>
              </div>
              <nav className="flex space-x-4">
                <Link 
                  href="/dashboard" 
                  className="px-3 py-2 text-gray-700 hover:text-indigo-600"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/city" 
                  className="px-3 py-2 text-gray-700 hover:text-indigo-600"
                >
                  City
                </Link>
                <Link 
                  href="/education" 
                  className="px-3 py-2 text-gray-700 hover:text-indigo-600"
                >
                  Education
                </Link>
              </nav>
              <div className="flex items-center space-x-2">
                {isAuthenticated ? (
                  <Link 
                    href="/dashboard" 
                    className="px-4 py-2 text-gray-700 hover:text-indigo-600"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/auth/login" 
                      className="px-4 py-2 text-gray-700 hover:text-indigo-600"
                    >
                      Sign in
                    </Link>
                    <Link 
                      href="/auth/register" 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
      )}
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} BOB (Broke or Billionaire). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 