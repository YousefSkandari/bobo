'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For MVP purposes, we'll simulate a successful login without validation
    // In a real app, this would be an API call
    setTimeout(() => {
      // Store user data in localStorage for simulated authentication
      localStorage.setItem('bobUser', JSON.stringify({
        name: formData.email.split('@')[0],
        email: formData.email,
        isLoggedIn: true
      }));
      
      setLoginMessage('Login successful! Redirecting to dashboard...');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 1000);
  };
  
  const handleQuickLogin = () => {
    setIsLoading(true);
    
    // Set demo user in localStorage
    localStorage.setItem('bobUser', JSON.stringify({
      name: 'Demo User',
      email: 'demo@example.com',
      isLoggedIn: true
    }));
    
    setLoginMessage('Demo login successful! Redirecting to dashboard...');
    
    // Redirect after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href="/" className="block text-center">
            <h1 className="text-4xl font-bold" style={{ color: 'var(--accent-primary)' }}>BOB</h1>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Or{' '}
            <Link
              href="/auth/register"
              className="font-medium hover:opacity-90 transition-opacity"
              style={{ color: 'var(--accent-primary)' }}
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 rounded-xl shadow-2xl p-8 border"
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            borderColor: 'var(--border-color)'
          }}
        >
          {loginMessage && (
            <div className="mb-6 rounded-md p-4 border"
              style={{ 
                backgroundColor: 'var(--accent-muted)', 
                borderColor: 'var(--accent-secondary)',
                color: 'var(--accent-primary)'
              }}
            >
              <p className="text-sm font-medium">{loginMessage}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="block w-full pl-10 pr-3 py-3 rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="block w-full pl-10 pr-3 py-3 rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded focus:ring-offset-2"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--accent-primary)'
                  }}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium hover:opacity-90 transition-opacity"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--text-on-accent)'
                }}
              >
                {isLoading ? (
                  <>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                    </span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5" style={{ color: 'var(--text-on-accent)', opacity: 0.8 }} />
                    </span>
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'var(--border-color)' }} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-sm" 
                  style={{ 
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-tertiary)'
                  }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleQuickLogin}
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--success)',
                  color: 'var(--text-on-accent)'
                }}
              >
                {isLoading ? 'Logging in...' : 'Quick Demo Login'}
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs mt-8" style={{ color: 'var(--text-tertiary)' }}>
          &copy; {new Date().getFullYear()} BOB (Broke or Billionaire). All rights reserved.
        </p>
      </div>
    </div>
  );
} 