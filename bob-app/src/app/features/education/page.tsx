'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  ChartBarIcon, 
  NewspaperIcon, 
  PuzzlePieceIcon 
} from '@heroicons/react/24/outline';

type TabContent = {
  courses: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  practice: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  community: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
}

type TabKey = keyof TabContent;

export default function EducationInfoPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('courses');
  
  const educationFeatures = [
    {
      name: "Interactive Courses",
      description: "Step-by-step learning paths to build your financial knowledge from beginner to advanced levels.",
      icon: AcademicCapIcon,
      color: "bg-purple-600",
    },
    {
      name: "Market Guides",
      description: "Comprehensive guides to understand different market sectors, investment types, and trading strategies.",
      icon: BookOpenIcon,
      color: "bg-blue-600",
    },
    {
      name: "Investment Simulators",
      description: "Practice investing in a risk-free environment with virtual portfolios before committing real money.",
      icon: ChartBarIcon,
      color: "bg-green-600",
    },
    {
      name: "Financial News",
      description: "Curated news and analysis to help you understand market trends and make informed decisions.",
      icon: NewspaperIcon,
      color: "bg-red-600",
    },
    {
      name: "Interactive Challenges",
      description: "Fun quizzes and challenges to test your knowledge and reinforce your learning.",
      icon: PuzzlePieceIcon,
      color: "bg-yellow-600",
    },
  ];

  const tabContent: TabContent = {
    courses: {
      title: "Learn at Your Pace",
      description: "BOB offers structured courses designed for all experience levels. From investment basics to advanced portfolio strategies, our educational content helps you build financial knowledge step by step.",
      bulletPoints: [
        "Beginner-friendly introduction to stock markets and investing",
        "Interactive lessons with real-world examples",
        "Progress tracking and achievement badges",
        "Personalized learning paths based on your goals",
        "Advanced topics for experienced investors"
      ]
    },
    practice: {
      title: "Practice Without Risk",
      description: "Put your knowledge to the test with our simulation tools. Create virtual portfolios, experiment with different investment strategies, and gain confidence before investing real money.",
      bulletPoints: [
        "Virtual trading with real-time market data",
        "Portfolio performance analysis",
        "Scenario testing for different market conditions",
        "Strategy comparison tools",
        "Risk assessment simulations"
      ]
    },
    community: {
      title: "Learn From Others",
      description: "Join a community of like-minded investors at all levels. Share insights, discuss strategies, and grow together through collaborative learning experiences.",
      bulletPoints: [
        "Discussion forums for various investment topics",
        "Community challenges and competitions",
        "Strategy sharing and peer reviews",
        "Expert Q&A sessions",
        "Learning clubs and study groups"
      ]
    },
  };
  
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
      <section className="pt-20 pb-16 bg-gradient-to-b from-indigo-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-white">Financial Education</span>
            <span className="block text-indigo-400">Made Engaging</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">
            Learn investing concepts through interactive lessons, practice with simulations, and watch your knowledge grow alongside your virtual city.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Educational Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationFeatures.map((feature) => (
              <div 
                key={feature.name} 
                className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300"
              >
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-white">{feature.name}</h3>
                <p className="text-gray-300 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Educational Approach */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Educational Approach</h2>
          
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
                  activeTab === 'courses' ? 'bg-gray-700 text-white border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('courses')}
              >
                Courses & Content
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
                  activeTab === 'practice' ? 'bg-gray-700 text-white border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('practice')}
              >
                Practice & Simulation
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
                  activeTab === 'community' ? 'bg-gray-700 text-white border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('community')}
              >
                Community Learning
              </button>
            </div>
            
            {/* Content */}
            <div className="p-8">
              {(Object.keys(tabContent) as TabKey[]).map((tab) => (
                <div key={tab} className={activeTab === tab ? 'block' : 'hidden'}>
                  <h3 className="text-2xl font-bold text-white mb-4">{tabContent[tab].title}</h3>
                  <p className="text-gray-300 text-lg mb-6">{tabContent[tab].description}</p>
                  
                  <ul className="space-y-3">
                    {tabContent[tab].bulletPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </span>
                        <span className="text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Preview Area */}
                  <div className="mt-10 p-6 bg-gray-900 rounded-lg shadow-inner">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                        {activeTab === 'courses' && <AcademicCapIcon className="h-8 w-8 text-white" />}
                        {activeTab === 'practice' && <ChartBarIcon className="h-8 w-8 text-white" />}
                        {activeTab === 'community' && <PuzzlePieceIcon className="h-8 w-8 text-white" />}
                      </div>
                      <h4 className="text-lg font-medium text-white mb-2">
                        {activeTab === 'courses' && "Investment Fundamentals"}
                        {activeTab === 'practice' && "Portfolio Simulator"}
                        {activeTab === 'community' && "Investor Forums"}
                      </h4>
                      <p className="text-gray-400 mb-4">
                        {activeTab === 'courses' && "Module 1: Understanding the Stock Market"}
                        {activeTab === 'practice' && "Build and test your investment strategy"}
                        {activeTab === 'community' && "Join discussions with fellow investors"}
                      </p>
                      <div className="bg-gray-800 p-4 rounded-md mx-auto max-w-md text-left">
                        {activeTab === 'courses' && (
                          <div className="space-y-3">
                            <p className="text-sm text-gray-300">👉 Lesson 1: What is a stock?</p>
                            <p className="text-sm text-gray-300">👉 Lesson 2: How stock markets work</p>
                            <p className="text-sm text-gray-300">👉 Lesson 3: Understanding market indexes</p>
                            <p className="text-sm text-gray-300">👉 Lesson 4: Basic analysis techniques</p>
                            <div className="mt-4 h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-green-500 rounded-full w-1/4"></div>
                            </div>
                            <p className="text-xs text-gray-400 text-right">25% Complete</p>
                          </div>
                        )}
                        {activeTab === 'practice' && (
                          <div>
                            <div className="flex justify-between text-sm text-gray-300 mb-2">
                              <span>Starting Amount:</span>
                              <span>$10,000</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-300 mb-2">
                              <span>Current Value:</span>
                              <span className="text-green-400">$10,840</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-300 mb-2">
                              <span>Return:</span>
                              <span className="text-green-400">+8.4%</span>
                            </div>
                            <div className="h-20 mt-4 flex items-end space-x-1">
                              {[...Array(20)].map((_, i) => {
                                const height = 40 + Math.sin(i / 2) * 30 + Math.random() * 10;
                                return (
                                  <div 
                                    key={i} 
                                    className={`w-1/20 ${height > 50 ? 'bg-green-500' : 'bg-red-500'} rounded-t`}
                                    style={{ height: `${height}%` }}
                                  ></div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {activeTab === 'community' && (
                          <div className="space-y-3">
                            <div className="p-2 border-l-2 border-blue-500">
                              <p className="text-xs text-gray-500">InvestorJane:</p>
                              <p className="text-sm text-gray-300">Has anyone analyzed the recent tech earnings? I'm considering adjusting my portfolio.</p>
                            </div>
                            <div className="p-2 border-l-2 border-green-500">
                              <p className="text-xs text-gray-500">StockGuru42:</p>
                              <p className="text-sm text-gray-300">Tech earnings have been strong this quarter. I'm particularly bullish on cloud services providers.</p>
                            </div>
                            <div className="p-2 border-l-2 border-yellow-500">
                              <p className="text-xs text-gray-500">NewInvestor:</p>
                              <p className="text-sm text-gray-300">Could someone recommend learning resources for understanding P/E ratios?</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Success Stories */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Learning Outcomes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Financial Literacy", 
                description: "Develop a solid understanding of financial concepts and investment principles that you can apply to real-world situations.",
                percentage: 94,
                stat: "94% of users report improved financial confidence"
              },
              { 
                title: "Practical Skills", 
                description: "Learn practical investment skills through our simulation tools before applying them with real money in the markets.",
                percentage: 87,
                stat: "87% increase in successful trading decisions"
              },
              { 
                title: "Continuous Growth", 
                description: "Stay updated with the latest market trends and continuously expand your investment knowledge and capabilities.",
                percentage: 76,
                stat: "76% of users maintain regular learning habits"
              }
            ].map((outcome, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-3">{outcome.title}</h3>
                <p className="text-gray-300 mb-6">{outcome.description}</p>
                <div className="h-2 bg-gray-700 rounded-full mb-2">
                  <div 
                    className="h-2 bg-indigo-500 rounded-full"
                    style={{ width: `${outcome.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-indigo-300 font-medium">{outcome.stat}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="text-center bg-indigo-900 rounded-xl p-8 md:p-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            Begin Your Financial Education Journey
          </h2>
          <p className="text-indigo-200 mb-8">
            Start building your financial knowledge today, and watch as both your understanding and portfolio grow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-3 border border-transparent rounded-md text-indigo-900 bg-white hover:bg-gray-100 text-base font-medium"
            >
              Create Your Account
            </Link>
            <Link
              href="/features/city"
              className="px-8 py-3 border border-white rounded-md text-white hover:bg-indigo-800 text-base font-medium"
            >
              Learn About City View
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 