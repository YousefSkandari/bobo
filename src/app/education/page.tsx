'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredLessons =
    selectedLevel === 'all'
      ? lessons
      : lessons.filter((lesson) => lesson.level === selectedLevel);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Financial Education
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Learn about investing and build your financial knowledge
        </p>
      </div>

      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-4 py-2 rounded-md ${
              selectedLevel === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Levels
          </button>
          <button
            onClick={() => setSelectedLevel('Beginner')}
            className={`px-4 py-2 rounded-md ${
              selectedLevel === 'Beginner'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedLevel('Intermediate')}
            className={`px-4 py-2 rounded-md ${
              selectedLevel === 'Intermediate'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setSelectedLevel('Advanced')}
            className={`px-4 py-2 rounded-md ${
              selectedLevel === 'Advanced'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Advanced
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {lesson.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    lesson.level === 'Beginner'
                      ? 'bg-green-100 text-green-800'
                      : lesson.level === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {lesson.level}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {lesson.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Duration: {lesson.duration}
                </span>
                <Link
                  href={`/education/lessons/${lesson.id}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Start Lesson →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 