'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon, ChartBarIcon, PresentationChartLineIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function DashboardInfoPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Track Your Portfolio at a Glance",
      description: "The Dashboard provides a comprehensive overview of your investments, showing performance metrics, asset allocation, and daily changes in an easy-to-understand format.",
      icon: ChartBarIcon,
      features: [
        "Real-time portfolio valuation",
        "Performance charts and trends",
        "Asset allocation visualization",
        "Daily, weekly, and monthly returns"
      ]
    },
    {
      title: "Monitor Market Trends",
      description: "Stay informed about market movements with live updates, news feeds, and trend indicators that help you make timely investment decisions.",
      icon: PresentationChartLineIcon,
      features: [
        "Market indices trackers",
        "Stock watchlists",
        "Personalized news feed",
        "Correlation indicators"
      ]
    },
    {
      title: "Manage Your Investments",
      description: "Easily buy, sell, and manage your investment portfolio with intuitive trading tools and transaction history tracking.",
      icon: CurrencyDollarIcon,
      features: [
        "One-click trading interface",
        "Transaction history log",
        "Dividend tracking",
        "Portfolio rebalancing suggestions"
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      {/* Header */}
      <header className="bg-gray-900 py-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-indigo-500 font-bold text-3xl">BOB</Link>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Back to Home
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            The Dashboard Experience
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Your command center for financial insights and portfolio management
          </p>
        </div>

        {/* Feature Showcase */}
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl mb-16">
          <div className="p-8 md:p-12">
            <div className="flex justify-center mb-6">
              {React.createElement(slides[currentSlide].icon, { className: "h-16 w-16 text-indigo-500" })}
            </div>
            <h2 className="text-2xl font-bold text-center text-white mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8">
              {slides[currentSlide].description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {slides[currentSlide].features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dashboard Screenshot Mockup */}
          <div className="relative h-96 bg-gray-700 flex items-center justify-center">
            <div className="text-center px-8">
              <p className="text-gray-400 mb-4">Preview of the dashboard interface</p>
              <div className="bg-gray-900 rounded-lg p-4 shadow-lg mx-auto max-w-4xl">
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                  <div className="flex space-x-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-sm">Dashboard Preview</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Portfolio Value</div>
                    <div className="text-xl font-bold text-white">$45,892.63</div>
                    <div className="text-sm text-green-500">+2.34% today</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Available Cash</div>
                    <div className="text-xl font-bold text-white">$10,000.00</div>
                    <div className="text-sm text-gray-400">Ready to invest</div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm text-gray-400">Market Overview</div>
                    <div className="text-xs text-gray-500">Last updated: Just now</div>
                  </div>
                  <div className="h-20 flex items-end space-x-1">
                    {[...Array(20)].map((_, i) => {
                      const height = 40 + Math.sin(i / 3) * 30;
                      return (
                        <div 
                          key={i} 
                          className={`w-1/20 ${i % 2 === 0 ? 'bg-green-500' : 'bg-green-600'} rounded-t`}
                          style={{ height: `${height}%` }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-white">
                  <div>Stocks: 5</div>
                  <div>|</div>
                  <div>Total Return: +15.4%</div>
                  <div>|</div>
                  <div>Risk Level: Moderate</div>
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-indigo-600"
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-indigo-600"
              onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
            >
              <ArrowRightIcon className="h-6 w-6" />
            </button>
            
            {/* Slide Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    currentSlide === index ? 'bg-indigo-500' : 'bg-gray-500'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to take control of your investments?
          </h2>
          <p className="text-gray-400 mb-8">
            Sign up today and unlock the full potential of the BOB dashboard experience. Monitor your investments, track your performance, and make informed decisions in real-time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-3 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 text-base font-medium"
            >
              Create Your Account
            </Link>
            <Link
              href="/features/city"
              className="px-8 py-3 border border-gray-300 rounded-md text-gray-300 hover:bg-gray-800 text-base font-medium"
            >
              Learn About City View
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 