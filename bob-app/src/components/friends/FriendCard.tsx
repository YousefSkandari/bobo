'use client';

import React from 'react';
import Link from 'next/link';

interface Friend {
  id: string;
  username: string;
  name?: string;
  avatar?: string;
  friendshipId: string;
  friendSince: string;
}

interface FriendCardProps {
  friend: Friend;
  onViewCity: () => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, onViewCity }) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      style={{ 
        backgroundColor: 'var(--bg-card)',
        boxShadow: 'var(--shadow-sm)'
      }}>
      <div className="p-6">
        <div className="flex items-start mb-4">
          {/* Avatar placeholder */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl mr-4"
            style={{ 
              backgroundColor: 'var(--accent-muted)',
              color: 'var(--accent-primary)'
            }}>
            {friend.username.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-grow">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {friend.name || friend.username}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>@{friend.username}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Friends since {formatDate(friend.friendSince)}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <button
            onClick={onViewCity}
            className="w-full px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: 'var(--accent-primary)', 
              color: 'var(--text-on-accent)'
            }}
          >
            View City
          </button>
          
          <Link 
            href={`/city/${friend.id}`} 
            className="w-full px-4 py-2 border rounded-md hover:bg-opacity-10 transition-colors text-center"
            style={{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'transparent'
            }}
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendCard; 