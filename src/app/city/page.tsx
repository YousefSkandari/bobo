'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CityView from '@/components/city/CityView';

interface Building {
  id: string;
  type: string;
  level: number;
  positionX: number;
  positionY: number;
  positionZ: number;
}

export default function CityPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await fetch('/api/city');
        if (response.ok) {
          const data = await response.json();
          setBuildings(data.buildings);
        }
      } catch (error) {
        console.error('Error fetching city:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchCity();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your City</h1>
        <p className="mt-2 text-sm text-gray-600">
          Watch your investments grow as your city evolves
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <CityView buildings={buildings} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">City Stats</h3>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Total Buildings
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {buildings.length}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  City Level
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {Math.max(...buildings.map((b) => b.level), 1)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
} 