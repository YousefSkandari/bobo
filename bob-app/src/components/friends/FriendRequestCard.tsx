'use client';

import React, { useState } from 'react';

interface User {
  id: string;
  username: string;
  name?: string;
  avatar?: string;
}

interface FriendRequest {
  id: string;
  sender: User;
  receiver: User;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface FriendRequestCardProps {
  request: FriendRequest;
  onAccept: () => void;
  onReject: () => void;
}

const FriendRequestCard: React.FC<FriendRequestCardProps> = ({ 
  request, 
  onAccept, 
  onReject 
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle accept with loading state
  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await onAccept();
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle reject with loading state
  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await onReject();
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="rounded-lg shadow-md overflow-hidden"
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
            {request.sender.username.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-grow">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {request.sender.name || request.sender.username}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>@{request.sender.username}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Requested {formatDate(request.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 rounded-md transition-opacity disabled:opacity-50"
            style={{ 
              backgroundColor: 'var(--accent-primary)', 
              color: 'var(--text-on-accent)'
            }}
          >
            {isProcessing ? 'Processing...' : 'Accept'}
          </button>
          
          <button
            onClick={handleReject}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 border rounded-md transition-colors disabled:opacity-50"
            style={{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'transparent'
            }}
          >
            {isProcessing ? 'Processing...' : 'Decline'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard; 