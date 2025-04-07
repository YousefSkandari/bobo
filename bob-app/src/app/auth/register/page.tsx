'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LockClosedIcon, UserIcon, EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

export default function RegisterPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [registerMessage, setRegisterMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For MVP purposes, we'll simulate a successful registration without validation
    // In a real app, this would be an API call
    setTimeout(() => {
      // Store user data in localStorage for simulated authentication
      localStorage.setItem('bobUser', JSON.stringify({
        name: formData.name,
        email: formData.email,
        isLoggedIn: true
      }));
      
      setRegisterMessage('Registration successful! Redirecting to dashboard...');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Or{' '}
            <Link
              href="/auth/login"
              className="font-medium hover:opacity-90 transition-opacity"
              style={{ color: 'var(--accent-primary)' }}
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <div className="mt-8 rounded-xl shadow-2xl p-8 border"
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            borderColor: 'var(--border-color)'
          }}
        >
          {registerMessage && (
            <div className="mb-6 rounded-md p-4 border"
              style={{ 
                backgroundColor: 'var(--accent-muted)', 
                borderColor: 'var(--accent-secondary)',
                color: 'var(--accent-primary)'
              }}
            >
              <p className="text-sm font-medium">{registerMessage}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
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
                htmlFor="email"
                className="block text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} />
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
                  <KeyIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5" style={{ color: 'var(--text-tertiary)' }} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
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
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 transition-colors duration-200"
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5" style={{ color: 'var(--text-on-accent)', opacity: 0.8 }} />
                    </span>
                    Create Account
                  </>
                )}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                By creating an account, you agree to our{' '}
                <a href="#" className="hover:opacity-90 transition-opacity"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="hover:opacity-90 transition-opacity"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>

        <p className="text-center text-xs mt-8" style={{ color: 'var(--text-tertiary)' }}>
          &copy; {new Date().getFullYear()} BOB (Broke or Billionaire). All rights reserved.
        </p>
      </div>
    </div>
  );
} 