'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Stock Market',
    description:
      'Learn the basics of the stock market, including what stocks are, how they work, and why people invest in them.',
    duration: '15 minutes',
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Understanding Stock Prices',
    description:
      'Discover how stock prices are determined, what affects them, and how to read basic stock charts.',
    duration: '20 minutes',
    level: 'Beginner',
  },
  {
    id: '3',
    title: 'Building a Portfolio',
    description:
      'Learn about diversification, risk management, and how to build a balanced investment portfolio.',
    duration: '25 minutes',
    level: 'Intermediate',
  },
  {
    id: '4',
    title: 'Technical Analysis Basics',
    description:
      'Introduction to technical analysis, including common indicators and chart patterns.',
    duration: '30 minutes',
    level: 'Intermediate',
  },
  {
    id: '5',
    title: 'Advanced Trading Strategies',
    description:
      'Explore advanced trading strategies and techniques for experienced investors.',
    duration: '45 minutes',
    level: 'Advanced',
  },
];

export default function EducationPage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredLessons =
    selectedLevel === 'all'
      ? lessons
      : lessons.filter((lesson) => lesson.level === selectedLevel);

  return (
    <MainLayout>
      <div className="pb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Education Center</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
          Level up your financial knowledge with these resources
        </p>
        
        <div className="mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-4 py-2 rounded-md`}
              style={{ 
                backgroundColor: selectedLevel === 'all' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: selectedLevel === 'all' ? 'var(--text-on-accent)' : 'var(--text-primary)'
              }}
            >
              All Levels
            </button>
            <button
              onClick={() => setSelectedLevel('Beginner')}
              className={`px-4 py-2 rounded-md`}
              style={{ 
                backgroundColor: selectedLevel === 'Beginner' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: selectedLevel === 'Beginner' ? 'var(--text-on-accent)' : 'var(--text-primary)'
              }}
            >
              Beginner
            </button>
            <button
              onClick={() => setSelectedLevel('Intermediate')}
              className={`px-4 py-2 rounded-md`}
              style={{ 
                backgroundColor: selectedLevel === 'Intermediate' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: selectedLevel === 'Intermediate' ? 'var(--text-on-accent)' : 'var(--text-primary)'
              }}
            >
              Intermediate
            </button>
            <button
              onClick={() => setSelectedLevel('Advanced')}
              className={`px-4 py-2 rounded-md`}
              style={{ 
                backgroundColor: selectedLevel === 'Advanced' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: selectedLevel === 'Advanced' ? 'var(--text-on-accent)' : 'var(--text-primary)'
              }}
            >
              Advanced
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="overflow-hidden shadow rounded-lg"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                    {lesson.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full`}
                    style={{ 
                      backgroundColor: lesson.level === 'Beginner' 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : lesson.level === 'Intermediate'
                        ? 'rgba(245, 158, 11, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                      color: lesson.level === 'Beginner'
                        ? 'var(--success)'
                        : lesson.level === 'Intermediate'
                        ? 'var(--warning)'
                        : 'var(--error)'
                    }}
                  >
                    {lesson.level}
                  </span>
                </div>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {lesson.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Duration: {lesson.duration}
                  </span>
                  <Link
                    href={`/education/lessons/${lesson.id}`}
                    className="text-sm font-medium hover:opacity-80"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Start Lesson →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 