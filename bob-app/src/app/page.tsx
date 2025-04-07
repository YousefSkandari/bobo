'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import { BuildingOffice2Icon, ChartBarIcon, AcademicCapIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('bobUser');
        if (userData) {
          setIsAuthenticated(true);
          // Redirect authenticated users to dashboard
          router.push('/dashboard');
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

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

  return (
    <div className="min-h-screen overflow-hidden" style={{ 
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      {/* Header */}
      <header className="py-6" style={{ backgroundColor: 'transparent' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="font-bold text-3xl" style={{ color: 'var(--accent-primary)' }}>BOB</Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/features/dashboard" className="hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>
            <Link href="/features/city" className="hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>City</Link>
            <Link href="/features/education" className="hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>Education</Link>
          </nav>
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 hover:opacity-80"
                style={{ color: 'var(--text-secondary)' }}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 hover:opacity-80"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-md hover:opacity-80"
                  style={{ 
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--text-on-accent)'
                  }}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block" style={{ color: 'var(--text-primary)' }}>Visualize Your</span>
            <span className="block" style={{ color: 'var(--accent-primary)' }}>Financial Future</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            BOB transforms abstract investments into a growing city. Watch your portfolio evolve as your financial knowledge grows.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10 hover:opacity-90"
              style={{ 
                backgroundColor: 'var(--accent-primary)', 
                color: 'var(--text-on-accent)' 
              }}
            >
              Get Started
            </Link>
            <Link
              href="/features/dashboard"
              className="px-8 py-3 border text-base font-medium rounded-md md:py-4 md:text-lg md:px-10 hover:opacity-90"
              style={{ 
                backgroundColor: 'transparent', 
                borderColor: 'var(--border-color)', 
                color: 'var(--text-primary)' 
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Cityscape Illustration */}
      <div className="relative h-80 md:h-120 overflow-hidden mx-auto max-w-6xl px-4 my-12">
        {/* Animated sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-800 to-violet-900 opacity-30"></div>
        
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={`star-${i}`}
              className={`absolute w-1 h-1 rounded-full bg-white animate-pulse`} 
              style={{ 
                top: `${Math.random() * 50}%`, 
                left: `${Math.random() * 100}%`,
                opacity: 0.5 + Math.random() * 0.5,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* City skyline with dynamic buildings */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around">
          {/* Background buildings */}
          {Array.from({ length: 20 }).map((_, i) => {
            const height = 40 + Math.random() * 100;
            const width = 10 + Math.random() * 20;
            
            return (
              <div
                key={`bg-building-${i}`}
                className="mx-[1px] relative"
                style={{
                  height: `${height}px`,
                  width: `${width}px`,
                  backgroundColor: `rgba(${20 + Math.random() * 40}, ${30 + Math.random() * 30}, ${50 + Math.random() * 50}, ${0.6 + Math.random() * 0.4})`,
                  borderTopLeftRadius: '2px',
                  borderTopRightRadius: '2px',
                  zIndex: Math.floor(Math.random() * 5)
                }}
              >
                {/* Building windows */}
                <div className="absolute inset-0 grid grid-cols-2 gap-0.5 p-0.5 opacity-80">
                  {Array.from({ length: Math.floor(height / 10) * 2 }).map((_, j) => (
                    <div 
                      key={j} 
                      className={Math.random() > 0.3 ? 'animate-window-flicker' : ''}
                      style={{
                        backgroundColor: 'rgba(255, 255, 220, 0.8)',
                        height: '2px',
                        width: '2px',
                        opacity: Math.random() > 0.4 ? '1' : '0'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Main foreground buildings */}
          <div className="w-24 h-80 rounded-t-md relative z-10 transform transition-transform hover:translate-y-[-10px]" 
               style={{ 
                 backgroundColor: 'var(--building-technology)',
                 boxShadow: '0 0 20px rgba(0, 100, 255, 0.3)'
               }}>
            {/* Windows */}
            <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2 opacity-90">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-sm ${Math.random() > 0.3 ? 'animate-pulse' : ''}`} 
                  style={{
                    backgroundColor: 'rgba(255, 255, 220, 0.9)',
                    opacity: Math.random() > 0.2 ? '1' : '0'
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="w-16 h-60 rounded-t-md relative z-10 transform transition-transform hover:translate-y-[-10px]" 
               style={{ 
                 backgroundColor: 'var(--accent-primary)',
                 boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)' 
               }}>
            {/* Windows */}
            <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1 opacity-90">
              {Array.from({ length: 30 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-sm ${Math.random() > 0.3 ? 'animate-pulse' : ''}`} 
                  style={{
                    backgroundColor: 'rgba(255, 255, 220, 0.9)',
                    opacity: Math.random() > 0.2 ? '1' : '0'
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="w-20 h-100 rounded-t-md relative z-10 transform transition-transform hover:translate-y-[-10px]" 
               style={{ 
                 backgroundColor: 'var(--building-commercial)',
                 boxShadow: '0 0 20px rgba(5, 150, 105, 0.3)'
               }}>
            {/* Windows */}
            <div className="absolute inset-0 grid grid-cols-3 gap-1 p-1 opacity-90">
              {Array.from({ length: 60 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-sm ${Math.random() > 0.3 ? 'animate-pulse' : ''}`} 
                  style={{
                    backgroundColor: 'rgba(255, 255, 220, 0.9)',
                    opacity: Math.random() > 0.2 ? '1' : '0'
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="w-14 h-70 rounded-t-md relative z-10 transform transition-transform hover:translate-y-[-10px]" 
               style={{ 
                 backgroundColor: 'var(--building-residential)',
                 boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)'
               }}>
            {/* Windows */}
            <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1 opacity-90">
              {Array.from({ length: 35 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-sm ${Math.random() > 0.3 ? 'animate-pulse' : ''}`} 
                  style={{
                    backgroundColor: 'rgba(255, 255, 220, 0.9)',
                    opacity: Math.random() > 0.2 ? '1' : '0'
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="w-28 h-90 rounded-t-md relative z-10 transform transition-transform hover:translate-y-[-10px]" 
               style={{ 
                 backgroundColor: 'var(--building-industrial)',
                 boxShadow: '0 0 20px rgba(234, 88, 12, 0.3)'
               }}>
            {/* Windows */}
            <div className="absolute inset-0 grid grid-cols-4 gap-1 p-1 opacity-90">
              {Array.from({ length: 48 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-sm ${Math.random() > 0.3 ? 'animate-pulse' : ''}`} 
                  style={{
                    backgroundColor: 'rgba(255, 255, 220, 0.9)',
                    opacity: Math.random() > 0.2 ? '1' : '0'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-10" 
             style={{ 
               backgroundColor: 'var(--city-ground)',
               boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
             }}>
        </div>
        
        {/* Chart bar visualization in foreground */}
        <div className="absolute bottom-10 w-full flex items-end justify-center gap-1 px-20 z-20">
          {Array.from({ length: 7 }).map((_, i) => {
            const height = 40 + Math.random() * 120;
            const colors = ['#3B82F6', '#10B981', '#6366F1', '#F97316', '#EF4444', '#8B5CF6', '#06B6D4'];
            return (
              <div
                key={`chart-${i}`}
                className="w-16 transition-all duration-500 hover:opacity-80"
                style={{
                  height: `${height}px`,
                  backgroundColor: colors[i],
                  opacity: 0.8,
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  transform: 'translateY(1px)'
                }}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: 'var(--text-primary)' }}>Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className="p-6 rounded-lg shadow-lg border hover:border-indigo-500 transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--bg-card)', 
                  borderColor: 'var(--border-color)' 
                }}
              >
                <div className="flex justify-center mb-4">
                  <feature.icon className="h-12 w-12" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3" style={{ color: 'var(--text-primary)' }}>{feature.name}</h3>
                <p className="text-center" style={{ color: 'var(--text-tertiary)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: 'var(--text-primary)' }}>How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent-muted)' }}>
                <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Create Your Account</h3>
              <p style={{ color: 'var(--text-tertiary)' }}>Sign up and set up your portfolio with stocks you're interested in.</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent-muted)' }}>
                <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Build Your City</h3>
              <p style={{ color: 'var(--text-tertiary)' }}>Watch as your investments transform into buildings that grow with their performance.</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent-muted)' }}>
                <span className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Expand Your Knowledge</h3>
              <p style={{ color: 'var(--text-tertiary)' }}>Learn through interactive lessons and grow your city as your portfolio develops.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-on-accent)' }}>Ready to Build Your Financial Future?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--text-on-accent)', opacity: 0.8 }}>
            Join thousands of users who are visualizing their way to financial literacy and investment success.
          </p>
          <Link
            href="/auth/register"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10 hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: 'var(--text-on-accent)', 
              color: 'var(--accent-primary)' 
            }}
          >
            Start Building Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ 
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base" style={{ color: 'var(--text-tertiary)' }}>
            &copy; {new Date().getFullYear()} BOB (Broke or Billionaire). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    name: 'City Building',
    description: 'Watch your investments visualized as buildings that grow and evolve based on performance.',
    icon: BuildingOffice2Icon,
  },
  {
    name: 'Portfolio Management',
    description: 'Easily track, buy, and sell stocks in a visually engaging way that makes investing fun.',
    icon: ChartBarIcon,
  },
  {
    name: 'Financial Education',
    description: 'Learn about investing through interactive tutorials and guides as you build your city.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Real-Time Updates',
    description: 'See your city evolve in real-time as market conditions change throughout the trading day.',
    icon: CurrencyDollarIcon,
  },
];
