'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BuildingOffice2Icon, 
  BuildingStorefrontIcon, 
  BuildingLibraryIcon, 
  ChevronUpIcon, 
  ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function CityInfoPage() {
  const [activeSection, setActiveSection] = useState('visualization');
  
  // Building types and their significance
  const buildingTypes = [
    {
      name: "Commercial Buildings",
      description: "Represent tech and retail stocks. Taller buildings indicate higher market value and stronger performance.",
      icon: BuildingOffice2Icon,
      color: "bg-blue-500",
      examples: ["Apple (AAPL)", "Amazon (AMZN)", "Google (GOOGL)"]
    },
    {
      name: "Industrial Structures",
      description: "Represent manufacturing, energy, and industrial stocks. Smoke stacks and factory elements visualize manufacturing output.",
      icon: BuildingStorefrontIcon,
      color: "bg-red-500",
      examples: ["Tesla (TSLA)", "General Electric (GE)", "Boeing (BA)"]
    },
    {
      name: "Financial Institutions",
      description: "Represent banks, insurance, and financial service companies. Classical architecture elements show stability and trust.",
      icon: BuildingLibraryIcon,
      color: "bg-green-500",
      examples: ["JPMorgan Chase (JPM)", "Bank of America (BAC)", "Visa (V)"]
    }
  ];

  // City visualizations explanation sections
  const sections = [
    {
      id: 'visualization',
      title: 'Portfolio Visualization',
      content: 'Your investments come alive as a dynamic cityscape where each building represents a stock in your portfolio. The height and size of buildings correspond to the value and performance of your investments. As stocks perform well, buildings grow taller and more impressive - creating a visual representation of your financial success.'
    },
    {
      id: 'performance',
      title: 'Performance Indicators',
      content: 'Visual cues throughout your city indicate the health of your investments. Thriving stocks feature pristine buildings with glowing windows and decorative elements, while underperforming stocks may appear as buildings in need of repair. Market trends are reflected in real-time weather and lighting conditions across your cityscape.'
    },
    {
      id: 'districts',
      title: 'Investment Districts',
      content: 'Your city is organized into districts that represent different market sectors. Tech stocks might form a futuristic downtown area, while financial stocks create a banking district. This organization helps you visualize your asset allocation and sector diversification at a glance.'
    },
    {
      id: 'interaction',
      title: 'Interactive Elements',
      content: 'Click on any building to get detailed information about the corresponding stock, including performance metrics, recent news, and trading options. Zoom out to see your entire portfolio at once, or zoom in to focus on specific sectors or investments.'
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

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Simulated city skyline background */}
          <div className="absolute bottom-0 w-full h-64 flex items-end">
            {[...Array(20)].map((_, index) => {
              const height = 60 + Math.random() * 140;
              const width = 40 + Math.random() * 30;
              const hue = 210 + Math.random() * 60;
              return (
                <div 
                  key={index} 
                  className="relative"
                  style={{ 
                    height: `${height}px`, 
                    width: `${width}px`,
                    backgroundColor: `hsl(${hue}, 70%, 40%)`,
                    marginRight: '2px'
                  }}
                >
                  {/* Windows */}
                  <div className="absolute inset-0 grid grid-cols-3 gap-1 p-1">
                    {[...Array(Math.floor(height / 10) * 3)].map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-yellow-200 opacity-70" 
                        style={{ height: '3px', width: '3px' }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 w-full h-10 bg-green-900"></div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-transparent"></div>
        </div>
        
        <div className="relative z-10 pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-white">Your City, Your</span>
            <span className="block text-indigo-500">Financial Empire</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed">
            Watch your portfolio transform into a living, breathing cityscape where each building represents one of your investments.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* How City View Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">How Your City Works</h2>
          
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            {/* Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-gray-700">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`py-4 px-6 text-center font-medium text-sm transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'bg-gray-700 text-white border-b-2 border-indigo-500'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </button>
              ))}
            </div>
            
            {/* Content */}
            <div className="p-8 md:p-12">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`${activeSection === section.id ? 'block' : 'hidden'}`}
                >
                  <p className="text-gray-300 text-lg leading-relaxed">{section.content}</p>
                </div>
              ))}
              
              {/* City Visualization */}
              <div className="mt-12 bg-gray-900 rounded-lg p-6 overflow-hidden shadow-inner relative">
                <div className="h-80 relative">
                  {/* Skyline visualization */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-center space-x-4">
                    {/* Large buildings (stocks) */}
                    <div className="w-24 h-64 bg-blue-600 rounded-t-md flex flex-col justify-end relative overflow-hidden group">
                      <div className="absolute inset-0 grid grid-cols-4 gap-1 p-2">
                        {[...Array(24)].map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-yellow-100 opacity-70 rounded-sm transition-opacity group-hover:opacity-90" 
                            style={{ height: '4px', width: '4px' }}
                          />
                        ))}
                      </div>
                      <div className="p-2 bg-black bg-opacity-70 text-white text-xs transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="font-bold">Apple (AAPL)</p>
                        <p className="text-green-400">+3.2%</p>
                      </div>
                    </div>
                    
                    <div className="w-18 h-40 bg-gray-700 rounded-t-md flex flex-col justify-end relative overflow-hidden group">
                      <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-yellow-100 opacity-70 rounded-sm transition-opacity group-hover:opacity-90" 
                            style={{ height: '4px', width: '4px' }}
                          />
                        ))}
                      </div>
                      <div className="p-2 bg-black bg-opacity-70 text-white text-xs transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="font-bold">Microsoft (MSFT)</p>
                        <p className="text-red-400">-0.8%</p>
                      </div>
                    </div>
                    
                    <div className="w-20 h-52 bg-red-700 rounded-t-md flex flex-col justify-end relative overflow-hidden group">
                      <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2">
                        {[...Array(18)].map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-yellow-100 opacity-70 rounded-sm transition-opacity group-hover:opacity-90" 
                            style={{ height: '4px', width: '4px' }}
                          />
                        ))}
                      </div>
                      <div className="p-2 bg-black bg-opacity-70 text-white text-xs transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="font-bold">Tesla (TSLA)</p>
                        <p className="text-green-400">+5.7%</p>
                      </div>
                    </div>
                    
                    <div className="w-16 h-32 bg-green-700 rounded-t-md flex flex-col justify-end relative overflow-hidden group">
                      <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2">
                        {[...Array(9)].map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-yellow-100 opacity-70 rounded-sm transition-opacity group-hover:opacity-90" 
                            style={{ height: '4px', width: '4px' }}
                          />
                        ))}
                      </div>
                      <div className="p-2 bg-black bg-opacity-70 text-white text-xs transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="font-bold">JPMorgan (JPM)</p>
                        <p className="text-green-400">+1.3%</p>
                      </div>
                    </div>
                    
                    <div className="w-22 h-48 bg-purple-700 rounded-t-md flex flex-col justify-end relative overflow-hidden group">
                      <div className="absolute inset-0 grid grid-cols-4 gap-1 p-2">
                        {[...Array(16)].map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-yellow-100 opacity-70 rounded-sm transition-opacity group-hover:opacity-90" 
                            style={{ height: '4px', width: '4px' }}
                          />
                        ))}
                      </div>
                      <div className="p-2 bg-black bg-opacity-70 text-white text-xs transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="font-bold">Amazon (AMZN)</p>
                        <p className="text-green-400">+1.2%</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ground */}
                  <div className="absolute bottom-0 w-full h-6 bg-green-900"></div>
                  
                  {/* Instruction overlay */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded text-sm">
                    <p>Hover over buildings to see stock details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Building Types */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Building Types</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buildingTypes.map((type) => (
              <div key={type.name} className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
                <div className={`${type.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto`}>
                  <type.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center text-white mb-3">{type.name}</h3>
                <p className="text-gray-300 mb-4 text-center">{type.description}</p>
                <div className="bg-gray-900 rounded p-3">
                  <p className="text-sm text-gray-400 mb-2">Example stocks:</p>
                  <ul className="space-y-1">
                    {type.examples.map((example) => (
                      <li key={example} className="text-sm text-white">{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                question: "How are building heights determined?",
                answer: "Building heights are calculated based on a combination of stock market capitalization, share price, and your investment amount. The more valuable your position in a stock, the taller the building that represents it."
              },
              {
                question: "What do the different colors mean?",
                answer: "Colors represent different market sectors. For example, blue buildings represent technology companies, green represents financial institutions, and red represents energy or industrial stocks."
              },
              {
                question: "How often does the city update?",
                answer: "Your city updates in real-time during market hours, reflecting the latest changes in your portfolio's performance. Watch buildings grow taller as stocks increase in value!"
              },
              {
                question: "Can I customize my city?",
                answer: "Yes! You can reorganize buildings, change color themes, and even add decorative elements to personalize your financial cityscape."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => {
                    const details = document.getElementById(`faq-${index}`);
                    if (details) {
                      details.open = !details.open;
                    }
                  }}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </button>
                <details id={`faq-${index}`} className="text-gray-300 px-6 pb-4">
                  <summary className="hidden">{faq.question}</summary>
                  <p className="pt-2">{faq.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="text-center bg-indigo-900 rounded-xl p-8 md:p-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            Start Building Your Financial City Today
          </h2>
          <p className="text-indigo-200 mb-8">
            Sign up now to create your personalized investment cityscape and watch your financial decisions come to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-3 border border-transparent rounded-md text-indigo-900 bg-white hover:bg-gray-100 text-base font-medium"
            >
              Create Your Account
            </Link>
            <Link
              href="/features/education"
              className="px-8 py-3 border border-white rounded-md text-white hover:bg-indigo-800 text-base font-medium"
            >
              Learn About Education
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 